const mongoose = require("mongoose");
const { chat } = require("./services/ai/agent");
const dotenv = require("dotenv");
dotenv.config();

async function runTests() {
  console.log("Connecting to DB...");
  await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/tuitionmaster");
  
  console.log("\n=== Testing Basic Search ===");
  const res1 = await chat({ message: "Find a Math tutor in Kathmandu" });
  console.log("Response:", res1.message);
  console.log("Results count:", res1.results.length);
  
  console.log("\n=== Testing Follow Up (Pronouns) ===");
  const history = [
    { role: "user", content: "Find a Math tutor in Kathmandu" },
    { role: "assistant", content: res1.message } 
  ];
  const res2 = await chat({ message: "What is their hourly rate?", history });
  console.log("Response:", res2.message);
  
  console.log("\n=== Testing No Results ===");
  const res3 = await chat({ message: "Find a Quantum Physics tutor in Kathmandu for Rs. 5/hour" });
  console.log("Response:", res3.message);
  
  mongoose.disconnect();
}

runTests().catch(console.error);
