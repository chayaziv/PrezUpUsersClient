import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./Router";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  return (
    <Provider store={store}>
      {" "}
      {/* עטיפת האפליקציה ב-Provider */}
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
