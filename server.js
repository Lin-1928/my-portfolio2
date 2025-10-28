import config from './config/config.js' 
import app from './server/express.js'
import mongoose from 'mongoose' 

mongoose.Promise = global.Promise

console.log("🔄 Attempting to connect to MongoDB...");
console.log("📡 Using MongoDB URI:", config.mongoUri.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@')); // 隐藏密码

const connectWithRetry = () => {
  mongoose.connect(config.mongoUri)
   .then(() => {
       console.log(" ====== Connected to MongoDB successfully! =====");
       console.log(" Database: Portfolio");
       console.log(" Connection established at:", new Date().toLocaleString());
   })
   .catch((error) => {
       console.log(" MongoDB connection failed:", error.message);
       console.log(" Retrying connection in 5 seconds...");
       setTimeout(connectWithRetry, 5000);
   });
};

connectWithRetry();
    
mongoose.connection.on('error', (error) => {
    console.log(" MongoDB connection error:", error.message);
});

mongoose.connection.on('disconnected', () => {
    console.log(" MongoDB disconnected");
});

app.get("/", (req, res) => {
    res.json({ message: "Welcome to My Portfolio application." });
});

app.listen(config.port, (err) => { 
    if (err) {
        console.log(err);
        return;
    }
    console.log(' Server started on port %s.', config.port);
    console.log(' Visit: http://localhost:%s', config.port);
});



/*import config from './config/config.js' 
import app from './server/express.js'
import mongoose from 'mongoose' 

mongoose.Promise = global.Promise

console.log("Attempting to connect to MongoDB...");
console.log("Using MongoDB URI:", config.mongoUri);

mongoose.connect(config.mongoUri)
 .then(() => {
     console.log(" Connected to the database successfully!");
 })
 .catch((error) => {
     console.log(" Database connection error:", error.message);
     console.log("But server will continue running for testing...");
 });
    
mongoose.connection.on('error', (error) => {
    console.log("MongoDB connection error:", error.message);
});

app.get("/", (req, res) => {
    res.json({ message: "Welcome to My Portfolio application." });
});

app.listen(config.port, (err) => { 
    if (err) {
        console.log(err);
        return;
    }
    console.log(' Server started on port %s.', config.port);
    console.log(' Visit: http://localhost:%s', config.port);
});*/

















/**import config from "./config/config.js";
import app from "./server/express.js";
import mongoose from "mongoose";
mongoose.Promise = global.Promise;
mongoose
  .connect(config.mongoUri, {
    //useNewUrlParser: true,
    //useCreateIndex: true,
    //useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  });
mongoose.connection.on("error", () => {
  throw new Error(`unable to connect to database: ${config.mongoUri}`);
});
app.get("/", (req, res) => {
  res.json({ message: "Welcome to User application." });
});
app.listen(config.port, (err) => {
  if (err) {
    console.log(err);
  }
  console.info("Server started on port %s.", config.port);
});**/
