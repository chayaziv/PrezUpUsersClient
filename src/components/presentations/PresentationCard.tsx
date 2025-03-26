import {
  Card,
  CardContent,
  Typography,
  Box,
  Rating,
  Chip,
  CardActions,
  IconButton,
  Button,
  Tooltip,
  Stack,
} from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { PresentationType } from "@/types/presentation";
import { useNavigate } from "react-router-dom";

interface PresentationCardProps {
  presentation: PresentationType;
  formatDate: (dateString: string) => string;
}

const PresentationCard = ({
  presentation,
  formatDate,
}: PresentationCardProps) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/presentations/${presentation.id}`);
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 6px 12px rgba(0,0,0,0.08)",
        },
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "180px",
          bgcolor: "grey.50",
          borderBottom: "1px solid",
          borderColor: "grey.200",
        }}
      >
        <PlayCircleOutlineIcon sx={{ fontSize: 60, color: "primary.main" }} />
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Recording Available
        </Typography>
      </CardContent>
      <CardContent sx={{ flexGrow: 1, pt: 2, px: 2.5 }}>
        <Typography
          gutterBottom
          variant="h6"
          component="h2"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            height: "3em",
            fontWeight: 500,
            color: "#333",
          }}
        >
          {presentation.title}
        </Typography>

        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
          <Rating
            value={presentation.score / 20}
            precision={0.5}
            readOnly
            size="small"
            sx={{ color: "primary.main" }}
          />
          <Typography variant="body2" color="text.secondary">
            ({presentation.score}/100)
          </Typography>
        </Stack>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
          {formatDate(presentation.createdAt)}
        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 1.5 }}>
          {presentation.tags.map((tag) => (
            <Chip
              key={tag.id}
              label={tag.name}
              size="small"
              sx={{
                mr: 0.5,
                mb: 0.5,
                bgcolor: "rgba(0,0,0,0.05)",
                color: "text.secondary",
                borderRadius: 1,
              }}
            />
          ))}
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end", px: 2, pb: 1.5 }}>
        <Button
          startIcon={<VisibilityIcon />}
          size="small"
          onClick={handleViewDetails}
          sx={{ color: "primary.main" }}
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default PresentationCard;
