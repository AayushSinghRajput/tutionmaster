const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/tutionmaster';

async function sanitizeAvailability() {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');

    const db = mongoose.connection.db;
    const teachersCollection = db.collection('teachers');

    const teachers = await teachersCollection.find({}).toArray();
    console.log(`Found ${teachers.length} teachers in DB`);

    let updatedCount = 0;
    const validDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    for (const t of teachers) {
      let rawAvailability = t.availability;
      let cleanAvailability = [];

      if (typeof rawAvailability === 'string') {
        try {
          rawAvailability = JSON.parse(rawAvailability);
        } catch (e) {
          rawAvailability = rawAvailability.split(',').map(s => s.trim());
        }
      }

      if (Array.isArray(rawAvailability)) {
        cleanAvailability = rawAvailability
          .map(item => {
            if (typeof item === 'object' && item !== null && item.day) return item.day;
            if (typeof item === 'string') {
              if (item.trim().startsWith('{') || item.trim().startsWith('[')) {
                try {
                  const p = JSON.parse(item);
                  if (Array.isArray(p)) return p.map(x => x.day || x);
                  if (p && p.day) return p.day;
                } catch (e) {}
              }
              return item.trim();
            }
            return String(item);
          })
          .flat()
          .filter(d => validDays.includes(d));
      }

      if (cleanAvailability.length === 0) {
        cleanAvailability = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
      }

      await teachersCollection.updateOne(
        { _id: t._id },
        { $set: { availability: cleanAvailability } }
      );
      updatedCount++;
      console.log(`Tutor ${t.name || t._id}: availability updated to`, cleanAvailability);
    }

    console.log(`Successfully sanitized availability for ${updatedCount} teachers.`);
    process.exit(0);
  } catch (err) {
    console.error('Error sanitizing availability:', err);
    process.exit(1);
  }
}

sanitizeAvailability();
