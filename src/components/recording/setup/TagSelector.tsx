import { Autocomplete, TextField, Chip, Typography, Box } from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { useTheme } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";

interface TagSelectorProps {
  tags: string[];
  setTags: (tags: string[]) => void;
  suggestedTags: string[];
}

const TagSelector = ({ tags, setTags, suggestedTags }: TagSelectorProps) => {
  const theme = useTheme();

  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: "flex", alignItems: "flex-start", mb: 1 }}>
        <LocalOfferIcon
          fontSize="small"
          sx={{ mr: 1, mt: 0.5, color: "text.secondary" }}
        />
        <Typography
          variant="body1"
          sx={{ fontWeight: 500, color: "text.primary" }}
        >
          Tags (optional)
        </Typography>
      </Box>

      <Autocomplete
        multiple
        id="tags-autocomplete"
        options={suggestedTags}
        value={tags}
        onChange={(_, newValue) => setTags(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            placeholder="Add tags to help categorize your presentation"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 1.5,
              },
            }}
          />
        )}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              label={option}
              {...getTagProps({ index })}
              variant="outlined"
              sx={{
                borderRadius: 1,
                backgroundColor: alpha(theme.palette.primary.main, 0.05),
                borderColor: alpha(theme.palette.primary.main, 0.2),
                color: "text.primary",
              }}
            />
          ))
        }
      />
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ mt: 0.5, display: "block" }}
      >
        Tags help others find your presentation more easily
      </Typography>
    </Box>
  );
};

export default TagSelector;
