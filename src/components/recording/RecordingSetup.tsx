import React, { useState } from "react";
import { Box, Button, Typography, Paper, Stack } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import SettingsIcon from "@mui/icons-material/Settings";

import PresentationNameField from "./setup/PresentationNameField";
import VisibilityToggle from "./setup/VisibilityToggle";
import TagSelector from "./setup/TagSelector";
import { RecordingData } from "@/types/recording";
import { TagType } from "@/types/tag";

interface RecordingSetupProps {
  initialData: RecordingData;
  onComplete: (data: Partial<RecordingData>) => void;
}

const RecordingSetup: React.FC<RecordingSetupProps> = ({
  initialData,
  onComplete,
}) => {
  const [name, setName] = useState(initialData.name);
  const [isPublic, setIsPublic] = useState(initialData.isPublic);
  const [tags, setTags] = useState<TagType[]>(initialData.tags);
  const [nameError, setNameError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setNameError("Please enter a name for your presentation");
      return;
    }

    onComplete({ name, isPublic, tags });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 3,
        }}
      >
        <SettingsIcon
          sx={{
            mr: 1.5,
            fontSize: 26,
            color: "primary.main",
          }}
        />
        <Typography
          variant="h5"
          component="h2"
          sx={{
            color: "text.primary",
            fontWeight: 600,
          }}
        >
          Presentation Setup
        </Typography>
      </Box>

      <Typography
        variant="body1"
        sx={{
          mb: 4,
          color: "text.secondary",
        }}
      >
        Configure the details for your recording before we start
      </Typography>

      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          bgcolor: "background.paper",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
        }}
      >
        <PresentationNameField
          name={name}
          nameError={nameError}
          setName={setName}
          setNameError={setNameError}
        />

        <VisibilityToggle isPublic={isPublic} setIsPublic={setIsPublic} />

        <TagSelector tags={tags} setTags={setTags} />
      </Paper>

      <Stack direction="row" justifyContent="flex-end">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          endIcon={<NavigateNextIcon />}
          sx={{
            px: 3,
            py: 1,
            borderRadius: 2,
          }}
        >
          Continue
        </Button>
      </Stack>
    </Box>
  );
};

export default RecordingSetup;
