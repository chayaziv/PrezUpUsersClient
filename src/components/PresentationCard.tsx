import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  Button,
  IconButton,
  Collapse,
  useTheme,
  Paper,
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  Visibility as VisibilityIcon,
  Star as StarIcon,
  Speaker as SpeakerIcon,
  RecordVoiceOver as RecordVoiceOverIcon,
  ThumbUp as ThumbUpIcon,
  Forum as ForumIcon,
  Style as StyleIcon,
} from "@mui/icons-material";
import { PresentationType } from "../types/presentation";

interface PresentationCardProps {
  presentation: PresentationType;
}

const PresentationCard: React.FC<PresentationCardProps> = ({ presentation }) => {
  const [openFeedback, setOpenFeedback] = useState<{ [key: string]: boolean }>({});
  const theme = useTheme();

  const toggleFeedback = (key: string) => {
    setOpenFeedback((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const criteria = [
    { key: "clarity", label: "Clarity", icon: <SpeakerIcon /> },
    { key: "fluency", label: "Fluency", icon: <RecordVoiceOverIcon /> },
    { key: "confidence", label: "Confidence", icon: <ThumbUpIcon /> },
    { key: "engagement", label: "Engagement", icon: <ForumIcon /> },
    { key: "speechStyle", label: "Speech Style", icon: <StyleIcon /> },
  ];

  return (
    <Card sx={{ width: "100%", marginBottom: 3, boxShadow: 3, borderRadius: 2, backgroundColor: theme.palette.background.paper }}>
      <CardContent>
        <Typography variant="h6" gutterBottom textAlign="center" color={theme.palette.primary.main}>
          <StarIcon sx={{ verticalAlign: "middle" }} /> {presentation.title}
        </Typography>

        <Divider sx={{ marginY: 2 }} />

        <Box sx={{ textAlign: "center", mb: 2 }}>
          <Typography variant="h5" color={theme.palette.secondary.main}>
            <strong>Score:</strong> {presentation.score} / 10
          </Typography>
        </Box>

        {criteria.map(({ key, label, icon }) => (
          <Box key={key} sx={{ marginBottom: 1 }}>
            <Paper sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 2, borderRadius: 2, backgroundColor: theme.palette.action.hover }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {icon}
                <Typography variant="body1" sx={{ marginLeft: 1 }}>
                  <strong>{label}:</strong> {presentation[key as keyof PresentationType]} / 10
                </Typography>
              </Box>
              <IconButton
                onClick={() => toggleFeedback(key)}
                sx={{ transform: openFeedback[key] ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s" }}
              >
                <ExpandMoreIcon color="primary" />
              </IconButton>
            </Paper>
            <Collapse in={openFeedback[key]}>
              <Box sx={{ padding: 2, backgroundColor: theme.palette.background.default, borderRadius: 2, marginTop: 1 }}>
                <Typography variant="body2" color={theme.palette.text.secondary}>
                  {presentation[`${key}Feedback` as keyof PresentationType]}
                </Typography>
              </Box>
            </Collapse>
          </Box>
        ))}

        <Divider sx={{ marginY: 2 }} />

        <Typography variant="body2" textAlign="center" fontStyle="italic" color={theme.palette.text.secondary}>
          "{presentation.tips}"
        </Typography>

        <Box sx={{ marginTop: 2, textAlign: "center" }}>
          <Button
            variant="contained"
            color="primary"
            href={presentation.fileUrl}
            target="_blank"
            sx={{ padding: "8px 16px", borderRadius: 3 }}
            startIcon={<VisibilityIcon />}
          >
            View Presentation
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PresentationCard;