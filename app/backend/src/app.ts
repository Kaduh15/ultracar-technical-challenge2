import express from "express";
import errorMiddleware from "./middlewares/error.middleware";
import cors from "cors";
import {
  carRouter,
  clientRouter,
  contributorRouter,
  serviceRouter,
  partRouter,
} from "./routes/index";

import "express-async-errors";

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();
    this.routes();

    // Não remover essa rota
    this.app.get("/", (req, res) => res.json({ ok: true }));
  }

  private config(): void {
    this.app.use((req, _, next) => {
      console.log("acesse", req.originalUrl);

      next();
    });

    this.app.use(cors());
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Methods",
        "GET,POST,DELETE,OPTIONS,PUT,PATCH"
      );
      res.header("Access-Control-Allow-Headers", "*");
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  private routes(): void {
    this.app.use("/client", clientRouter);
    this.app.use("/contributor", contributorRouter);
    this.app.use("/car", carRouter);
    this.app.use("/service", serviceRouter);
    this.app.use("/part", partRouter);
    this.app.use(errorMiddleware);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
