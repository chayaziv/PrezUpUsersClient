import { Autocomplete, TextField, Chip, Typography, Box } from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { useTheme } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../store/store";
import { useEffect, useState } from "react";
import { fetchTags } from "../../../store/slices/tagsSlice";
import { TagType } from "@/types/tag";

interface TagSelectorProps {
  tags: TagType[];
  setTags: (tags: TagType[]) => void;
}

const TagSelector: React.FC<TagSelectorProps> = ({ tags, setTags }) => {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const [availableTags, setAvailableTags] = useState<TagType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadTags = async () => {
      setLoading(true);
      try {
        const result = await dispatch(fetchTags()).unwrap();
        setAvailableTags(result);
      } catch (error) {
        console.error("Failed to load tags:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTags();
  }, [dispatch]);

  const handleTagChange = (event: React.SyntheticEvent, value: TagType[]) => {
    setTags(value);
  };

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
        options={availableTags}
        getOptionLabel={(option) => option.name}
        value={tags}
        onChange={handleTagChange}
        loading={loading}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Tags"
            placeholder="Select tags"
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <>
                  <LocalOfferIcon sx={{ mr: 1, color: "primary.main" }} />
                  {params.InputProps.startAdornment}
                </>
              ),
            }}
          />
        )}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              {...getTagProps({ index })}
              key={option.id}
              label={option.name}
              color="primary"
              variant="outlined"
              sx={{
                borderRadius: 2,
                background: alpha(theme.palette.primary.main, 0.05),
                borderColor: alpha(theme.palette.primary.main, 0.3),
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
