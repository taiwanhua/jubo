/* eslint-disable import/no-extraneous-dependencies -- roboto font*/
import CssBaseline from "@mui/material/CssBaseline";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { OrderList } from "./components/list/OrderList";

export function App(): JSX.Element {
  return (
    <>
      <CssBaseline />
      <OrderList />
    </>
  );
}
