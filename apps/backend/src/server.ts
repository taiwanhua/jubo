import { App } from "@/app";
import { ValidateEnv } from "@/utils/validateEnv";
import { OrderRoute } from "@/routes/order.route";
import { PatientRoute } from "@/routes/patient.route";
import { RelevanceRoute } from "@/routes/relevance.route";

ValidateEnv();

const app = new App([
  new OrderRoute(),
  new PatientRoute(),
  new RelevanceRoute(),
]);

app.listen();
