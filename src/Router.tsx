import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import AudioRecorder from "./components/AudioRecorder";
import Login from "./components/Login";
import Register from "./components/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "record",
    element: <AudioRecorder />,
  },
  {
    path: "signIn",
    element: <Login />,
  },
  {
    path: "signUp",
    element: <Register />,
  },
]);
