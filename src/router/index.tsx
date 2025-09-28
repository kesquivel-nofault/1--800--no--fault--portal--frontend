import type React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import SignIn from "../modules/auth/ui/SignIn";
import Doctor from "../modules/doctor-lawyer/ui/doctor/Doctor";
import Lawyer from "../modules/doctor-lawyer/ui/lawyer/Lawyer";
import Home from "../modules/home/ui/Home";
import AppLayout from "../shared/ui/layout/AppLayout";
import Blank from "../shared/ui/pages/Blank";
import Calendar from "../shared/ui/pages/Calendar";
import BarChart from "../shared/ui/pages/Charts/BarChart";
import LineChart from "../shared/ui/pages/Charts/LineChart";
import FormElements from "../shared/ui/pages/Forms/FormElements";
import NotFound from "../shared/ui/pages/OtherPage/NotFound";
import BasicTables from "../shared/ui/pages/Tables/BasicTables";
import Alerts from "../shared/ui/pages/UiElements/Alerts";
import Avatars from "../shared/ui/pages/UiElements/Avatars";
import Badges from "../shared/ui/pages/UiElements/Badges";
import Buttons from "../shared/ui/pages/UiElements/Buttons";
import Images from "../shared/ui/pages/UiElements/Images";
import Videos from "../shared/ui/pages/UiElements/Videos";
import UserProfiles from "../shared/ui/pages/UserProfiles";
import { PrivateRoute } from "./private-route";
import { PublicRoute } from "./public-route";
import { routes } from "./routes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <AppLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to={`/${routes.pages.home}`} replace />,
      },
      {
        path: routes.pages.home,
        element: <Home />,
      },

      {
        path: routes.pages.lawyers,
        element: <Lawyer />,
      },

      {
        path: routes.pages.doctors,
        element: <Doctor />,
      },

      {
        path: "profile",
        element: <UserProfiles />,
      },
      {
        path: "calendar",
        element: <Calendar />,
      },
      {
        path: "blank",
        element: <Blank />,
      },

      {
        path: "form-elements",
        element: <FormElements />,
      },

      {
        path: "basic-tables",
        element: <BasicTables />,
      },

      {
        path: "alerts",
        element: <Alerts />,
      },
      {
        path: "avatars",
        element: <Avatars />,
      },
      {
        path: "badge",
        element: <Badges />,
      },
      {
        path: "buttons",
        element: <Buttons />,
      },
      {
        path: "images",
        element: <Images />,
      },
      {
        path: "videos",
        element: <Videos />,
      },
      {
        path: "line-chart",
        element: <LineChart />,
      },
      {
        path: "bar-chart",
        element: <BarChart />,
      },
    ],
  },

  {
    path: "/signin",
    element: (
      <PublicRoute>
        <SignIn />
      </PublicRoute>
    ),
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

function Router(): React.ReactElement {
  return <RouterProvider router={router} />;
}

export { Router };
