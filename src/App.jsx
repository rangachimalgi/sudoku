import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PageScreen } from "./screens/PageScreen";
import { Page } from "./screens/Page";
import { DivWrapper } from "./screens/DivWrapper";
import { Screen3 } from "./screens/Screen3";
import { Screen4 } from "./screens/Screen4";
import { PagePlay } from "./screens/PagePlay";
import { PagePause } from "./screens/PagePause";
import { Screen7 } from "./screens/Screen7";
import { Screen8 } from "./screens/Screen8";

const router = createBrowserRouter([
  {
    path: "/*",
    element: <PageScreen />,
  },
  {
    path: "/page-1",
    element: <PageScreen />,
  },
  {
    path: "/page-2",
    element: <Page />,
  },
  {
    path: "/page-4",
    element: <DivWrapper />,
  },
  {
    path: "/page-3",
    element: <Screen3 />,
  },
  {
    path: "/page-5",
    element: <Screen4 />,
  },
  {
    path: "/page-6-u40playu41",
    element: <PagePlay />,
  },
  {
    path: "/page-7-u40pauseu41",
    element: <PagePause />,
  },
  {
    path: "/page-8",
    element: <Screen7 />,
  },
  {
    path: "/page-9",
    element: <Screen8 />,
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};
