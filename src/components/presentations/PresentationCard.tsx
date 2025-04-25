import {
  Card,
  CardContent,
  Typography,
  Box,
  Rating,
  Chip,
  CardActions,
  Button,
  Stack,
} from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { PresentationType } from "@/types/presentation";
import { useNavigate } from "react-router-dom";
import {
  cardStyles,
  availableCardContentStyles,
  titleStyles,
  scoreStyles,
  dateStyles,
  tagsStyles,
  chipStyles,
  detailsContentStyles,
  viewButtonStyles,
} from "@/styles/Card";

const AvailableCardContent = () => (
  <CardContent sx={availableCardContentStyles}>
    <PlayCircleOutlineIcon sx={{ fontSize: 60, color: "primary.main" }} />
    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
      Recording Available
    </Typography>
  </CardContent>
);

const Title = ({ title }) => (
  <Typography gutterBottom variant="h6" component="h2" sx={titleStyles}>
    {title}
  </Typography>
);

const Score = ({ score }) => (
  <Stack direction="row" alignItems="center" spacing={1} sx={scoreStyles}>
    <Rating
      value={score / 2}
      precision={0.5}
      readOnly
      size="small"
      sx={{ color: "primary.main" }}
    />
    <Typography variant="body2" color="text.secondary">
      ({score}/10)
    </Typography>
  </Stack>
);

const Date = ({ date, formatDate }) => (
  <Typography variant="body2" color="text.secondary" sx={dateStyles}>
    {formatDate(date)}
  </Typography>
);

const Tags = ({ tags }) => (
  <Box sx={tagsStyles}>
    {tags.map((tag) => (
      <Chip key={tag.id} label={tag.name} size="small" sx={chipStyles} />
    ))}
  </Box>
);

const DetailsContent = ({ children }) => (
  <CardContent sx={detailsContentStyles}>{children}</CardContent>
);

const ViewButton = ({ handleViewDetails }) => (
  <CardActions sx={viewButtonStyles}>
    <Button
      startIcon={<VisibilityIcon />}
      size="small"
      onClick={handleViewDetails}
      sx={{ color: "primary.main" }}
    >
      View Details
    </Button>
  </CardActions>
);

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
    <Card sx={cardStyles}>
      <AvailableCardContent />
      <DetailsContent>
        <Title title={presentation.title} />
        <Score score={presentation.score} />
        <Date date={presentation.createdAt} formatDate={formatDate} />
        <Tags tags={presentation.tags} />
      </DetailsContent>
      <ViewButton handleViewDetails={handleViewDetails} />
    </Card>
  );
};

export default PresentationCard;
