import type React from "react";
import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import { PrivateRoute } from "./private-route";
import { PublicRoute } from "./public-route";
import { routes } from "./routes";

import { ProgressSpinner } from "primereact/progressspinner";

const SignIn = lazy(() => import("../modules/auth/ui/SignIn"));
const Doctor = lazy(() => import("../modules/doctor-lawyer/ui/doctor/Doctor"));
const Lawyer = lazy(() => import("../modules/doctor-lawyer/ui/lawyer/Lawyer"));
const Home = lazy(() => import("../modules/home/ui/Home"));
const AppLayout = lazy(() => import("../shared/ui/layout/AppLayout"));
const Blank = lazy(() => import("../shared/ui/pages/Blank"));
const Calendar = lazy(() => import("../shared/ui/pages/Calendar"));
const BarChart = lazy(() => import("../shared/ui/pages/Charts/BarChart"));
const LineChart = lazy(() => import("../shared/ui/pages/Charts/LineChart"));
const FormElements = lazy(
  () => import("../shared/ui/pages/Forms/FormElements"),
);
const NotFound = lazy(() => import("../shared/ui/pages/OtherPage/NotFound"));
const BasicTables = lazy(() => import("../shared/ui/pages/Tables/BasicTables"));
const Alerts = lazy(() => import("../shared/ui/pages/UiElements/Alerts"));
const Avatars = lazy(() => import("../shared/ui/pages/UiElements/Avatars"));
const Badges = lazy(() => import("../shared/ui/pages/UiElements/Badges"));
const Buttons = lazy(() => import("../shared/ui/pages/UiElements/Buttons"));
const Images = lazy(() => import("../shared/ui/pages/UiElements/Images"));
const Videos = lazy(() => import("../shared/ui/pages/UiElements/Videos"));
const UserProfiles = lazy(() => import("../shared/ui/pages/UserProfiles"));

const withSuspense = (Component: React.ReactNode) => (
  <Suspense
    name="router-suspense"
    fallback={
      <section className="flex h-screen w-full items-center justify-center">
        <ProgressSpinner
          style={{ width: "50px", height: "50px" }}
          strokeWidth="8"
          fill="var(--surface-ground)"
          animationDuration=".5s"
          color="#1eb9cd"
          className=""
        />
      </section>
    }
  >
    {Component}
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: withSuspense(
      <PrivateRoute>
        <AppLayout />
      </PrivateRoute>,
    ),
    children: [
      {
        index: true,
        element: <Navigate to={`/${routes.pages.home}`} replace />,
      },
      { path: routes.pages.home, element: withSuspense(<Home />) },
      { path: routes.pages.lawyers, element: withSuspense(<Lawyer />) },
      { path: routes.pages.doctors, element: withSuspense(<Doctor />) },
      { path: "profile", element: withSuspense(<UserProfiles />) },
      { path: "calendar", element: withSuspense(<Calendar />) },
      { path: "blank", element: withSuspense(<Blank />) },
      { path: "form-elements", element: withSuspense(<FormElements />) },
      { path: "basic-tables", element: withSuspense(<BasicTables />) },
      { path: "alerts", element: withSuspense(<Alerts />) },
      { path: "avatars", element: withSuspense(<Avatars />) },
      { path: "badge", element: withSuspense(<Badges />) },
      { path: "buttons", element: withSuspense(<Buttons />) },
      { path: "images", element: withSuspense(<Images />) },
      { path: "videos", element: withSuspense(<Videos />) },
      { path: "line-chart", element: withSuspense(<LineChart />) },
      { path: "bar-chart", element: withSuspense(<BarChart />) },
    ],
  },
  {
    path: "/signin",
    element: withSuspense(
      <PublicRoute>
        <SignIn />
      </PublicRoute>,
    ),
  },
  {
    path: "*",
    element: withSuspense(<NotFound />),
  },
]);

function Router(): React.ReactElement {
  return <RouterProvider router={router} />;
}

export { Router };
