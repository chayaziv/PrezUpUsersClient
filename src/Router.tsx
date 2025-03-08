import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import AudioRecorder from "./components/AudioRecorder";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "record",
    element: <AudioRecorder />,
  }
]);
