// import { RouterProvider } from "react-router-dom";
// import { ThemeProvider, CssBaseline } from "@mui/material";
// import { Provider } from "react-redux";

// import { theme } from "./theme";
// import store from "./store/store";
// import { router } from "./Router";

// function App() {
//   return (
//     <Provider store={store}>
//       <ThemeProvider theme={theme}>
//         <RouterProvider router={router} />
//       </ThemeProvider>
//     </Provider>
//   );
// }

// export default App;
import { RouterProvider } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { Provider } from "react-redux";

import { theme } from "./theme";
import store from "./store/store";
import { router } from "./Router";
import { SnackbarProvider } from "./context/SnackbarProvider";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <CssBaseline />
          <RouterProvider router={router} />
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
