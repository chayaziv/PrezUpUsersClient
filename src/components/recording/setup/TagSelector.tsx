
import {
  Autocomplete,
  TextField,
  Chip,
  Typography,
  Box,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { Theme, useTheme } from "@mui/material/styles";
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

const TagHeader = () => (
  <Box sx={headerStyles}>
    <LocalOfferIcon fontSize="small" sx={iconStyles} />
    <Typography variant="body1" sx={titleStyles}>
      Tags (optional)
    </Typography>
  </Box>
);

const RenderTagChips = (
  value: TagType[],
  getTagProps: (params: { index: number }) => Record<string, any>,
  theme: Theme
) =>
  value.map((option, index) => (
    <Chip
      {...getTagProps({ index })}
      key={option.id}
      label={option.name}
      color="primary"
      variant="outlined"
      sx={chipStyles(theme)}
    />
  ));

const TagsAutocomplete = ({
  availableTags,
  selectedTags,
  onChange,
  loading,
  theme,
}: {
  availableTags: TagType[];
  selectedTags: TagType[];
  onChange: (event: React.SyntheticEvent, value: TagType[]) => void;
  loading: boolean;
  theme: Theme;
}) => (
  <Autocomplete
    multiple
    options={availableTags}
    getOptionLabel={(option) => option.name}
    value={selectedTags}
    onChange={onChange}
    loading={loading}
    renderInput={(params) => (
      <TextField
        {...params}
        placeholder="Select tags"
        InputProps={{
          ...params.InputProps,
          endAdornment: (
            <>
              {loading ? (
                <InputAdornment position="end">
                  <CircularProgress size={18} />
                </InputAdornment>
              ) : null}
              {params.InputProps.endAdornment}
            </>
          ),
        }}
      />
    )}
    renderTags={(value, getTagProps) =>
      RenderTagChips(value, getTagProps, theme)
    }
  />
);

const TagCaption = () => (
  <Typography variant="caption" sx={captionStyles}>
    Tags help others find your presentation more easily
  </Typography>
);

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
      <TagHeader />
      <TagsAutocomplete
        availableTags={availableTags}
        selectedTags={tags}
        onChange={handleTagChange}
        loading={loading}
        theme={theme}
      />
      <TagCaption />
    </Box>
  );
};

export default TagSelector;
