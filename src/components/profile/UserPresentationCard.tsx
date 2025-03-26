import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Rating,
  Chip,
  CardActions,
  IconButton,
  Switch,
  FormControlLabel,
  Tooltip,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { PresentationSummary } from "../../types/presentation2";

interface UserPresentationCardProps {
  presentation: PresentationSummary;
  formatDate: (dateString: string) => string;
  onDeleteClick: (id: number) => void;
  onTogglePublic: (id: number) => void;
}

const UserPresentationCard = ({
  presentation,
  formatDate,
  onDeleteClick,
  onTogglePublic,
}: UserPresentationCardProps) => {
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
      <CardMedia
        component="img"
        height="180"
        image={presentation.thumbnailUrl}
        alt={presentation.title}
        sx={{
          objectFit: "cover",
          objectPosition: "center",
        }}
      />
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

        <FormControlLabel
          control={
            <Switch
              checked={presentation.isPublic}
              onChange={() => onTogglePublic(presentation.id)}
              color="primary"
              size="small"
            />
          }
          label={
            <Typography variant="body2" color="text.secondary">
              {presentation.isPublic ? "Public" : "Private"}
            </Typography>
          }
        />
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end", px: 2, pb: 1.5 }}>
        <Tooltip title="Delete presentation">
          <IconButton
            size="small"
            onClick={() => onDeleteClick(presentation.id)}
            sx={{ color: "error.main" }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default UserPresentationCard;
