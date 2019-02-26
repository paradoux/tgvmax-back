global.__DEV__ = process.env.NODE_ENV === "development"
global.__DIR__ = __dirname

// Load environment variables
require("dotenv").load()

// Run server
require("./src")
