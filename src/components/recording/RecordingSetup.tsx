import DescriptionIcon from "@mui/icons-material/Description";
import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  Stack,
  FormControlLabel,
  Switch,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import SettingsIcon from "@mui/icons-material/Settings";
import TagSelector from "./setup/TagSelector";
import { RecordingData } from "@/types/recording";
import { TagType } from "@/types/tag";
import VisibilityIcon from "@mui/icons-material/Visibility";

import * as styles from "@/styles/RecordingSetUpStyle";
import BaseTextField from "../common/BaseTextField";

interface RecordingSetupProps {
  initialData: RecordingData;
  onComplete: (data: Partial<RecordingData>) => void;
}

const RecordingSetup: React.FC<RecordingSetupProps> = ({
  initialData,
  onComplete,
}) => {
  const [isPublic, setIsPublic] = useState(initialData.isPublic);
  const [tags, setTags] = useState<TagType[]>(initialData.tags);

  const [name, setName] = useState(initialData.name);
  const [nameError, setNameError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setNameError("Please enter a name for your presentation");
      return;
    }
    onComplete({ name, isPublic, tags });
  };

  const HeaderSection = () => (
    <>
      <Box sx={styles.headerBox}>
        <SettingsIcon sx={styles.settingsIcon} />
        <Typography variant="h5" component="h2" sx={styles.headerText}>
          Presentation Setup
        </Typography>
      </Box>
      <Typography variant="body1" sx={styles.subHeaderText}>
        Configure the details for your recording before we start
      </Typography>
    </>
  );

  const PresentationNameField = () => {
    return (
      <Box sx={styles.presentationNameBox}>
        <Box sx={styles.presentationNameLabelBox}>
          <DescriptionIcon fontSize="small" sx={styles.presentationNameIcon} />
          <Typography variant="body1" sx={styles.presentationNameText}>
            Presentation Name
          </Typography>
        </Box>

        <BaseTextField
          autoFocus
          placeholder="Enter a name for your presentation"
          variant="outlined"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (e.target.value.trim()) {
              setNameError("");
            }
          }}
          error={!!nameError}
          errorText={nameError}
        />
      </Box>
    );
  };

  const VisibilityToggle = () => {
    return (
      <Box sx={styles.visibilityBox}>
        <Box sx={styles.visibilityLabelBox}>
          <VisibilityIcon fontSize="small" sx={styles.visibilityIcon} />
          <Typography variant="body1" sx={styles.visibilityText}>
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
            <Typography variant="body2" sx={styles.visibilityLabelText}>
              {isPublic
                ? "Public - Anyone can view this presentation"
                : "Private - Only you can view this presentation"}
            </Typography>
          }
        />
      </Box>
    );
  };

  const ContinueButton = () => (
    <Stack direction="row" justifyContent="flex-end">
      <Button
        type="submit"
        variant="contained"
        color="primary"
        endIcon={<NavigateNextIcon />}
        sx={styles.continueButton}
      >
        Continue
      </Button>
    </Stack>
  );

  return (
    <Box component="form" onSubmit={handleSubmit} sx={styles.form}>
      <HeaderSection />
      <Paper elevation={0} sx={styles.paperBox}>
        <PresentationNameField />
        <VisibilityToggle />
        <TagSelector tags={tags} setTags={setTags} />
      </Paper>
      <ContinueButton />
    </Box>
  );
};

export default RecordingSetup;
