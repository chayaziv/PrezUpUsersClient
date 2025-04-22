import { Autocomplete, TextField, Chip, Typography, Box } from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { useTheme } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { useEffect, useState } from "react";
import { fetchTags } from "../../../store/slices/tagsSlice";
import { TagType } from "@/types/tag";
import {
  containerStyles,
  headerStyles,
  iconStyles,
  titleStyles,
  chipStyles,
  captionStyles,
} from "@/styles/tagSelectorStyle";

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
    <Box sx={containerStyles}>
      <Box sx={headerStyles}>
        <LocalOfferIcon fontSize="small" sx={iconStyles} />
        <Typography variant="body1" sx={titleStyles}>
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
            placeholder="Select tags"
            InputProps={{
              ...params.InputProps,
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
              sx={chipStyles(theme)}
            />
          ))
        }
      />
      <Typography variant="caption" sx={captionStyles}>
        Tags help others find your presentation more easily
      </Typography>
    </Box>
  );
};

export default TagSelector;
