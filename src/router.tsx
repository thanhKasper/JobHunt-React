import RootLayout from "@layouts/RootLayout";
import JobFilterPage from "@pages/JobFilter/JobFilterPage";
import JobFilterPageDetail from "@pages/JobFilter/JobFilterPageDetail";
import JobPage from "@pages/JobPage";
import PortfolioPage from "@pages/Portfolio/PortfolioPage";
import ProjectDetailPage from "@pages/Portfolio/ProjectDetailPage";
import { createBrowserRouter } from "react-router";
import ProjectEditPage from "./pages/Portfolio/ProjectEditPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import ProjectNewPage from "./pages/Portfolio/ProjectNewPage";

let router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <JobPage />,
      },
      {
        path: "jobs",
        element: <JobPage />,
      },
      {
        path: "job-filters",
        children: [
          {
            index: true,
            element: <JobFilterPage />,
          },
          {
            path: "/job-filters/:jobFilterId",
            element: <JobFilterPageDetail />,
          },
        ],
      },
      {
        path: "portfolio",
        children: [
          {
            index: true,
            element: <PortfolioPage />,
          },
          {
            path: ":projectId",
            element: <ProjectDetailPage />,
          },
          {
            path: ":projectId/edit",
            element: <ProjectEditPage />,
          },
          {
            path: "new",
            element: <ProjectNewPage/>,
          }
        ],
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
    ],
  },
]);

export default router;
