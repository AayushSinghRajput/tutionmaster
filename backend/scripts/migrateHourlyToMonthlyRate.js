const mongoose = require("mongoose");
require("dotenv").config({ path: "./.env" });

const migrate = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/tuitionmaster";
    console.log("Connecting to MongoDB at:", mongoUri);
    await mongoose.connect(mongoUri);

    const collection = mongoose.connection.db.collection("teachers");
    const teachers = await collection.find({}).toArray();

    console.log(`Found ${teachers.length} teacher records to check for migration.`);

    let updatedCount = 0;

    for (const teacher of teachers) {
      let monthlyRate = teacher.monthlyRate;

      if (!monthlyRate) {
        if (teacher.hourlyRate) {
          // Convert hourlyRate to monthlyRate (hourlyRate * 20 for standard 20-day tuition month)
          monthlyRate = Number(teacher.hourlyRate) * 20;
        } else {
          monthlyRate = 8000;
        }

        await collection.updateOne(
          { _id: teacher._id },
          {
            $set: {
              monthlyRate: monthlyRate,
              hourlyRate: teacher.hourlyRate || Math.round(monthlyRate / 20),
            },
          }
        );

        console.log(`Updated [${teacher.name}]: hourlyRate=${teacher.hourlyRate} -> monthlyRate=₨${monthlyRate}`);
        updatedCount++;
      }
    }

    console.log(`Migration completed successfully. Updated ${updatedCount} teachers.`);
    process.exit(0);
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
};

migrate();
