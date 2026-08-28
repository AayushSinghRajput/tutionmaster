const mongoose = require("mongoose");
const { chat } = require("./services/ai/agent");
const dotenv = require("dotenv");
dotenv.config();

async function runTests() {
  await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/tuitionmaster");
  
  console.log("\n=== Testing AI Match Scores & Recommendations ===");
  const res1 = await chat({ message: "Find a Math tutor in Kathmandu" });
  console.log("Response:", res1.message);
  
  console.log("\n=== Testing Similarity ===");
  if (res1.results && res1.results.length > 0) {
    const history = [
      { role: "user", content: "Find a Math tutor in Kathmandu" },
      { role: "assistant", content: res1.message, results: res1.results } 
    ];
    const tutorId = res1.results[0]._id;
    const res2 = await chat({ message: `Show me tutors similar to this first one`, history });
    console.log("Response:", res2.message);
  }

  mongoose.disconnect();
}

runTests().catch(console.error);
