import { App } from "@/app";
import { ValidateEnv } from "@/utils/validateEnv";
import { OrderRoute } from "./routes/order.route";
import { ReferenceRoute } from "./routes/reference.route";
import { PatientRoute } from "./routes/patient.route";

ValidateEnv();

const app = new App([
  new OrderRoute(),
  new PatientRoute(),
  new ReferenceRoute(),
]);

app.listen();
