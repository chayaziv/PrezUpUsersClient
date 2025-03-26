
import { FormControlLabel, Switch, Typography, Box } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface VisibilityToggleProps {
  isPublic: boolean;
  setIsPublic: (value: boolean) => void;
}

const VisibilityToggle = ({ isPublic, setIsPublic }: VisibilityToggleProps) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
        <VisibilityIcon 
          fontSize="small" 
          sx={{ mr: 1, mt: 0.5, color: 'text.secondary' }} 
        />
        <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.primary' }}>
          Visibility
        </Typography>
      </Box>
      
      <FormControlLabel
        control={
          <Switch
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
            color="primary"
          />
        }
        label={
          <Typography variant="body2" color="text.secondary">
            {isPublic ? "Public - Anyone can view this presentation" : "Private - Only you can view this presentation"}
          </Typography>
        }
      />
    </Box>
  );
};

export default VisibilityToggle;
