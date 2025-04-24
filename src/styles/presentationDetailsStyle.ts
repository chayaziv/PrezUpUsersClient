import { alpha, Theme } from "@mui/material";

const paperWrapperStyle = (theme: Theme) => ({
  p: 3,
  borderRadius: 3,
  background: "white",
  border: "1px solid",
  borderColor: alpha("#3A36E0", 0.1),
  flex: 1,
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
    transform: "translateY(-5px)",
  },
});

const titleStyle = {
  color: "primary.main",
  fontWeight: 600,
  mb: 2,
  display: "flex",
  alignItems: "center",
  gap: 1,
};

const listItemTextPrimary = {
  fontWeight: 500,
};

const chipTagStyle = {
  borderRadius: 2,
  background: (theme: Theme) => alpha("#3A36E0", 0.05),
  borderColor: (theme: Theme) => alpha("#3A36E0", 0.3),
};

const tagsWrapperStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: 0.5,
  mt: 0.5,
};

const secondaryTextStyle = {
  mt: 0.5,
};

const dividerStyle = {
  my: 1.5,
};

export {
  paperWrapperStyle,
  titleStyle,
  listItemTextPrimary,
  chipTagStyle,
  tagsWrapperStyle,
  secondaryTextStyle,
  dividerStyle,
};
