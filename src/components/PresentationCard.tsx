import { Paper, ListItemIcon, ListItemText, Typography, useTheme } from "@mui/material";
import { Visibility as VisibilityIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { PresentationType } from "../types/presentation";

interface PresentationCardProps {
  presentation: PresentationType;
}

const PresentationCard = ({ presentation }: PresentationCardProps) => {
  const theme = useTheme();

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 3,
        borderRadius: 3,
        backgroundColor: theme.palette.background.paper,
        boxShadow: 6,
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "translateY(-10px)",
          boxShadow: 12,
        },
      }}
    >
      <ListItemIcon sx={{ color: theme.palette.primary.main, marginBottom: 1 }}>
        <VisibilityIcon fontSize="large" />
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: theme.palette.text.primary,
              textAlign: "center",
              letterSpacing: 1,
            }}
          >
            {presentation.title}
          </Typography>
        }
      />
      <Link
        to={`/public-presentations/${presentation.id}`}
        style={{
          color: theme.palette.primary.main,
          textDecoration: "none",
          fontWeight: "bold",
          padding: "8px 16px",
          border: `1px solid ${theme.palette.primary.main}`,
          borderRadius: 20,
          fontSize: "0.9rem",
          transition: "background-color 0.3s, color 0.3s",
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = theme.palette.primary.light)}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
      >
        View
      </Link>
    </Paper>
  );
};

export default PresentationCard;
