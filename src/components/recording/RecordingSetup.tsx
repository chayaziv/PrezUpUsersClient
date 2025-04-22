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
import PresentationNameField from "./setup/PresentationNameField";
import TagSelector from "./setup/TagSelector";
import { RecordingData } from "@/types/recording";
import { TagType } from "@/types/tag";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  formStyle,
  headerBoxStyle,
  settingsIconStyle,
  headerTextStyle,
  subHeaderTextStyle,
  paperBoxStyle,
  continueButtonStyle,
} from "@/styles/RecordingSetUpStyle";

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

  const HeaderSection = () => (
    <>
      <Box sx={headerBoxStyle}>
        <SettingsIcon sx={settingsIconStyle} />
        <Typography variant="h5" component="h2" sx={headerTextStyle}>
          Presentation Setup
        </Typography>
      </Box>
      <Typography variant="body1" sx={subHeaderTextStyle}>
        Configure the details for your recording before we start
      </Typography>
    </>
  );

  const VisibilityToggle = () => {
    return (
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "flex-start", mb: 1 }}>
          <VisibilityIcon
            fontSize="small"
            sx={{ mr: 1, mt: 0.5, color: "text.secondary" }}
          />
          <Typography
            variant="body1"
            sx={{ fontWeight: 500, color: "text.primary" }}
          >
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
        sx={continueButtonStyle}
      >
        Continue
      </Button>
    </Stack>
  );

  return (
    <Box component="form" onSubmit={handleSubmit} sx={formStyle}>
      <HeaderSection />
      <Paper elevation={0} sx={paperBoxStyle}>
        <PresentationNameField
          name={name}
          nameError={nameError}
          setName={setName}
          setNameError={setNameError}
        />
        <VisibilityToggle />
        <TagSelector tags={tags} setTags={setTags} />
      </Paper>
      <ContinueButton />
    </Box>
  );
};

export default RecordingSetup;
