import RootLayout from "@layouts/RootLayout";
import JobFilterPage from "@pages/JobFilter/JobFilterPage";
import JobFilterPageDetail from "@pages/JobFilter/JobFilterPageDetail";
import JobPage from "@pages/JobPage";
import PortfolioPage from "@pages/Portfolio/PortfolioPage";
import ProjectDetailPage from "@pages/Portfolio/ProjectDetailPage";
import { createBrowserRouter } from "react-router";
import ProjectEditPage from "@pages/Portfolio/ProjectEditPage";
import ProfilePage from "@pages/Profile/ProfilePage";
import ProjectNewPage from "@pages/Portfolio/ProjectNewPage";
import CreateJobFilterPage from "@pages/JobFilter/CreateJobFilterPage";
import LoginPage from "@pages/Authentication/LoginPage";
import RegisterPage from "@pages/Authentication/RegisterPage";

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
          {
            path: "new",
            element: <CreateJobFilterPage />,
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
            element: <ProjectNewPage />,
          },
        ],
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
]);

export default router;
