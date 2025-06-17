import { createBrowserRouter } from "react-router";
import RootLayout from "./layouts/RootLayout";
import JobPage from "./pages/JobPage";

let router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout/>,
    children: [
      {
        index: true,
        element: <JobPage/>
      }
    ]
  }
]);


export default router;