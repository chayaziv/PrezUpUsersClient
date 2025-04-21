import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import RecordingFlow from "./pages/RecordingFlow";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import AllPresentations from "./pages/presentations/AllPresentations";
import Comparisons from "./pages/Comparisons";
import UserProfile from "./pages/UserProfile";
import Notifications from "./pages/Notifications";
import CustomerChat from "./pages/CustomerChat";
import NotFound from "./pages/NotFound";
import PresentationDetail from "./pages/presentations/PresentationDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "auth/signin",
        element: <SignIn />,
      },
      {
        path: "auth/signup",
        element: <SignUp />,
      },
      {
        path: "record",
        element: <RecordingFlow />,
      },
      {
        path: "presentations",
        element: <AllPresentations />,
      },
      {
        path: "presentations/:id",
        element: <PresentationDetail />,
      },
      {
        path: "comparisons",
        element: <Comparisons />,
      },
      {
        path: "profile",
        element: <UserProfile />,
      },
      {
        path: "notifications",
        element: <Notifications />,
      },
      {
        path: "chat",
        element: <CustomerChat />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
