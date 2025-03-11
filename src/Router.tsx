import Home from "./pages/Home";
import AudioRecorder from "./components/AudioRecorder";

import { createBrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import About from "./pages/About";
import AppLayout from "./components/AppLayout";
import Register from "./components/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "record",
        element: <AudioRecorder />,
      },

      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);
