// import express, { Request, Response, NextFunction } from "express";
// import cors from "cors";
// import router from "../routes";
// import { errorType } from "../utils/auth";

// const app = express();
// app.use(express.json());
// app.use(cors()); // Enable CORS
// app.use(router);

// // Custom error handling middleware
// app.use((err: any, req: Request, res: Response, next: NextFunction) => {
//   // Handle the error here
//   console.error(err as errorType);
//   res.status(err.status).json({ message: err.message });
// });

// export default app;
