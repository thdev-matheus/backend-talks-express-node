import express, { Request, Response } from "express";
import "express-async-errors";
import { handleErrorMiddleware } from "./middlewares/error/handlingError.middleware";
import { appRoutes } from "./routes";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message:
      "Welcome! This application was developed as a back end for the fullstack project of the Talks page. The entire front end and back end was designed and performed by Matheus Vieira (https://github.com/thdev-matheus). Enjoy the other routes!",
  });
});

appRoutes(app);

app.use(handleErrorMiddleware);

export default app;
