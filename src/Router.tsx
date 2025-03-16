import Home from "./pages/Home";
import AudioRecorder from "./components/AudioRecorder";

import { createBrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import About from "./pages/About";
import AppLayout from "./components/AppLayout";
import Register from "./components/Register";
import MyPresentations from "./components/MyPresentations";
import PublicPresentations from "./components/PublicPresentation";
import PresentationComparison from "./components/PresentationComparison";
import AddRecording from "./components/AddRecording";

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
        element: <AddRecording />,
      },

      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "my-presentations",
        element: <MyPresentations />,
      },
      {
        path: "public-presentations",
        element: <PublicPresentations />,
      },
      {
        path: "compare",
        element: <PresentationComparison />,
      },
    ],
  },
]);
