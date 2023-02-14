import mongoose from "mongoose";

const MONGO_URI =
  "mongodb+srv://rutthawitc:Dewey000@cluster0.va6dlsa.mongodb.net/?retryWrites=true&w=majority";

const connectMongo = async () => {
  try {
    const { connection } = await mongoose.connect(MONGO_URI);
    mongoose.set("strictQuery", false);
    //console.log(process.env.MONGO_URI);
    if (connection.readyState == 1) {
      console.log("Database is conected");
    }
  } catch (errors) {
    return Promise.reject(errors);
  }
};
export default connectMongo;
