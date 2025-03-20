import { useEffect, useState } from "react";
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
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";

interface PresentationCardProps {
  presentation: PresentationType;
}

const PresentationDetails = () => {
  const [openFeedback, setOpenFeedback] = useState<{ [key: string]: boolean }>(
    {}
  );
  const theme = useTheme();
  const { id } = useParams<{ id: string }>(); // שליפת ה-ID מה-URL
  const dispatch = useDispatch<AppDispatch>();

  // שליפת הפרזנטציה מה-Redux store לפי ה-ID
  const presentation = useSelector((state: RootState) => {
    console.log("state.publicPresentations.list: ", state.publicPresentations.list);
    console.log("id: ", id);
    return state.publicPresentations.list.find(
      (p: PresentationType) => p.id.toString() === id
    );
  });

  useEffect(() => {
    // אם לא נמצאה פרזנטציה, אפשר להציג הודעה או נטפל במקרה הזה
    if (!presentation) {
      console.log("Presentation not found");
    }
  }, [presentation]);

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
    <Card
      sx={{
        width: "100%",
        marginBottom: 3,
        boxShadow: 10,
        borderRadius: 2,
        backgroundColor: theme.palette.background.paper,
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "translateY(-10px)",
          boxShadow: 20,
        },
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          gutterBottom
          textAlign="center"
          color={theme.palette.primary.main}
          sx={{
            fontWeight: "bold",
            letterSpacing: 1.5,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <StarIcon sx={{ verticalAlign: "middle", marginRight: 1 }} />
          {presentation?.title}
        </Typography>

        <Divider sx={{ marginY: 2 }} />

        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Typography variant="h5" color={theme.palette.secondary.main}>
            <strong>Score:</strong> {presentation?.score} / 10
          </Typography>
        </Box>

        {criteria.map(({ key, label, icon }) => (
          <Box key={key} sx={{ marginBottom: 2 }}>
            <Paper
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 2,
                borderRadius: 2,
                backgroundColor: theme.palette.action.hover,
                transition: "background-color 0.3s",
                "&:hover": {
                  backgroundColor: theme.palette.primary.light,
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {icon}
                <Typography variant="body1" sx={{ marginLeft: 1 }}>
                  <strong>{label}:</strong> {presentation?.[key as keyof PresentationType]} / 10
                </Typography>
              </Box>
              <IconButton
                onClick={() => toggleFeedback(key)}
                sx={{
                  transform: openFeedback[key]
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
                  transition: "transform 0.3s",
                }}
              >
                <ExpandMoreIcon color="primary" />
              </IconButton>
            </Paper>
            <Collapse in={openFeedback[key]}>
              <Box
                sx={{
                  padding: 2,
                  backgroundColor: theme.palette.background.default,
                  borderRadius: 2,
                  marginTop: 1,
                  boxShadow: 2,
                }}
              >
                <Typography
                  variant="body2"
                  color={theme.palette.text.secondary}
                >
                  {presentation?.[`${key}Feedback` as keyof PresentationType]}
                </Typography>
              </Box>
            </Collapse>
          </Box>
        ))}

        <Divider sx={{ marginY: 3 }} />

        <Typography
          variant="body2"
          textAlign="center"
          fontStyle="italic"
          color={theme.palette.text.secondary}
          sx={{ marginBottom: 3 }}
        >
          "{presentation?.tips}"
        </Typography>

        <Box sx={{ marginTop: 3, textAlign: "center" }}>
          {presentation?.fileUrl && (
            <Button
              variant="contained"
              color="primary"
              href={presentation.fileUrl}
              target="_blank"
              sx={{
                padding: "12px 24px",
                borderRadius: 3,
                fontSize: "1rem",
                boxShadow: 5,
                transition: "background-color 0.3s",
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark,
                },
              }}
              startIcon={<VisibilityIcon />}
            >
              View Presentation
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default PresentationDetails;
