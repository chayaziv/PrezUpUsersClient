import {
  IconButton,
  Switch,
  Typography,
  FormControlLabel,
  Tooltip,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { PresentationType } from "@/types/presentation";
import PresentationCard from "@/components/presentations/PresentationCard";

const Visibility = ({ isPublic, id, onTogglePublic }) => (
  <FormControlLabel
    control={
      <Switch
        checked={isPublic}
        onChange={() => onTogglePublic(id)}
        color="primary"
        size="small"
      />
    }
    label={
      <Typography variant="body2" color="text.secondary">
        {isPublic ? "Public" : "Private"}
      </Typography>
    }
  />
);

const DeleteButton = ({ onDeleteClick, id }) => (
  <Tooltip title="Delete presentation">
    <IconButton
      size="small"
      onClick={() => onDeleteClick(id)}
      sx={{ color: "error.main" }}
    >
      <DeleteIcon fontSize="small" />
    </IconButton>
  </Tooltip>
);

interface UserPresentationCardProps {
  presentation: PresentationType;
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
    <PresentationCard
      presentation={presentation}
      formatDate={formatDate}
      visibility={
        <Visibility
          isPublic={presentation.isPublic}
          id={presentation.id}
          onTogglePublic={onTogglePublic}
        />
      }
      deleteButton={
        <DeleteButton onDeleteClick={onDeleteClick} id={presentation.id} />
      }
    />
  );
};

export default UserPresentationCard;
