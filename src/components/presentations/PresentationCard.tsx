import { Link } from "react-router-dom";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Rating,
  Chip,
  Button,
  Stack,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { PresentationSummary } from "../../types/presentation2";

interface PresentationCardProps {
  presentation: PresentationSummary;
  formatDate: (dateString: string) => string;
}

const PresentationCard = ({
  presentation,
  formatDate,
}: PresentationCardProps) => {
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
      <CardActionArea component={Link} to={`/presentations/${presentation.id}`}>
        <CardMedia
          component="img"
          height="160"
          image={presentation.thumbnailUrl}
          alt={presentation.title}
          sx={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
        <CardContent sx={{ pt: 2, px: 2.5 }}>
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

          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{ mb: 1.5 }}
          >
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

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 2 }}>
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

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              component={Link}
              to={`/presentations/${presentation.id}`}
              variant="outlined"
              color="primary"
              startIcon={<VisibilityIcon />}
              size="small"
              sx={{
                borderRadius: 4,
                px: 2,
                textTransform: "none",
                fontSize: "0.85rem",
              }}
            >
              View Details
            </Button>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PresentationCard;
