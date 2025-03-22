import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  FormControlLabel,
  Switch,
  Button,
  Typography,
  Chip,
  Autocomplete,
  Stack,
  Paper,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import SettingsIcon from "@mui/icons-material/Settings";
import { fetchPublicPresentations } from "../../store/PublicPresentationsSlice";
import { fetchTags } from "../../store/tagsSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { TagType } from "../../types/tag";
import { RecordingData } from "./RecordManager";

interface RecordingSetupProps {
  initialData: RecordingData;
  onComplete: (data: Partial<RecordingData>) => void;
}

const RecordingSetup: React.FC<RecordingSetupProps> = ({
  initialData,
  onComplete,
}) => {
  const [title, setTitle] = useState(initialData.title);
  const [isPublic, setIsPublic] = useState(initialData.isPublic);
  const [tags, setTags] = useState<TagType[]>(initialData.tags);
  const [titleError, setTitleError] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchPublicPresentations());
    dispatch(fetchTags());
  }, [dispatch]);

  const suggestedTags = useSelector(
    (state: { tags: { list: TagType[] } }) => state.tags.list
  );
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setTitleError("Please enter a title for your presentation");
      return;
    }

    onComplete({ title, isPublic, tags });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <SettingsIcon color="primary" sx={{ mr: 1.5, fontSize: 28 }} />
        <Typography
          variant="h5"
          component="h2"
          sx={{ color: "primary.main", fontWeight: "bold" }}
        >
          Presentation Setup
        </Typography>
      </Box>

      <Typography variant="body1" sx={{ mb: 4, color: "text.secondary" }}>
        Configure the details for your recording before we start.
      </Typography>

      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          bgcolor: "rgba(0, 131, 143, 0.03)",
          border: "1px solid rgba(0, 131, 143, 0.1)",
          borderRadius: 2,
        }}
      >
        <TextField
          fullWidth
          label="Presentation title"
          variant="outlined"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (e.target.value.trim()) {
              setTitleError("");
            }
          }}
          error={!!titleError}
          helperText={titleError}
          sx={{ mb: 3 }}
          InputProps={{
            sx: { borderRadius: 1.5 },
          }}
        />

        <FormControlLabel
          control={
            <Switch
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              color="primary"
            />
          }
          label={
            <Typography variant="body1" sx={{ color: "text.primary" }}>
              Make this presentation public
            </Typography>
          }
          sx={{ mb: 3, display: "block" }}
        />

        <Autocomplete
          multiple
          id="tags-autocomplete"
          options={suggestedTags.map((tag) => tag.name)}
          value={tags.map((tag) => tag.name)} // ערך נוכחי
          onChange={(_, newValue) =>
            setTags(suggestedTags.filter((tag) => newValue.includes(tag.name)))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Tags (optional)"
              placeholder="Add tags"
              InputProps={{
                ...params.InputProps,
                sx: { borderRadius: 1.5 },
              }}
            />
          )}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                label={option}
                {...getTagProps({ index })}
                color="primary"
                variant="outlined"
                sx={{ borderRadius: 1.5 }}
              />
            ))
          }
        />
      </Paper>

      <Stack direction="row" justifyContent="flex-end">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          endIcon={<NavigateNextIcon />}
          size="large"
          sx={{
            px: 4,
            py: 1.2,
            fontSize: "1rem",
            transition: "all 0.2s",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 4px 8px rgba(0, 131, 143, 0.25)",
            },
          }}
        >
          Continue
        </Button>
      </Stack>
    </Box>
  );
};

export default RecordingSetup;
