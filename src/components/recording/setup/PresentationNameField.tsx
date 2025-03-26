
import { TextField, Typography, Box } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';

interface PresentationNameFieldProps {
  name: string;
  nameError: string;
  setName: (value: string) => void;
  setNameError: (value: string) => void;
}

const PresentationNameField = ({ 
  name, 
  nameError, 
  setName, 
  setNameError 
}: PresentationNameFieldProps) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
        <DescriptionIcon 
          fontSize="small" 
          sx={{ mr: 1, mt: 0.5, color: 'text.secondary' }} 
        />
        <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.primary' }}>
          Presentation Name
        </Typography>
      </Box>
      
      <TextField
        fullWidth
        placeholder="Enter a name for your presentation"
        variant="outlined"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          if (e.target.value.trim()) {
            setNameError('');
          }
        }}
        error={!!nameError}
        helperText={nameError}
        sx={{ 
          '& .MuiOutlinedInput-root': {
            borderRadius: 1.5,
          },
        }}
      />
    </Box>
  );
};

export default PresentationNameField;
