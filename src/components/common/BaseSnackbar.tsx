import { useSnackbar } from "@/hooks/useSnackbar";
import { Snackbar, Alert, Box } from "@mui/material";

const BaseSnackbar = () => {
  const { snackbar, closeSnackbar } = useSnackbar();
  console.log("snackbar", snackbar);
  return (
    <Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={closeSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default BaseSnackbar;
