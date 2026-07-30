import "dotenv/config";

import connectDB from "./db/connection.js";
import app from "./src/app.js";

// entry point for starting the back-end server

if (process.env.NODE_ENV === "production" && !process.env.JWT_SECRET) {
  throw new Error(
    "JWT_SECRET must be set in production",
  );
}

const PORT = process.env.PORT || 5050;

connectDB();

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
