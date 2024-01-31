import mongoose from "mongoose";

const connectToDatabase = async (): Promise<void> => {
  const DB_URI = process.env.DATABASE_CONNECTION_URI || "";

  mongoose
    .connect(DB_URI)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.log("Database error: ", error);
    });
};

const disconnectFromDatabase = async (): Promise<void> => {
  await mongoose.disconnect();
  console.log("Disconnected from MongoDB");
};

export { connectToDatabase, disconnectFromDatabase };
