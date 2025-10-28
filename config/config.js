const config = {
  env: process.env.NODE_ENV || 'development', 
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key", 
  mongoUri: process.env.MONGODB_URI || "mongodb+srv://zlt2009gtym_db_user:Ey2cj0rH6cXw2syg@cluster0.pzqo5ii.mongodb.net/Portfolio?retryWrites=true&w=majority"
}

export default config