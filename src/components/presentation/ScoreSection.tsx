import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Divider,
  Box,
} from "@mui/material";
import { EmojiEvents } from "@mui/icons-material";
import { PresentationType } from "../../types/presentation";
import { ScoreCard } from "./ScoresCard";

interface ScoreSectionProps {
  presentation: PresentationType;
}

const ScoreSection = ({ presentation }: ScoreSectionProps) => {
  const scoreCategories = [
    {
      title: "בהירות",
      score: presentation.clarity,
      feedback: presentation.clarityFeedback,
    },
    {
      title: "שטף",
      score: presentation.fluency,
      feedback: presentation.fluencyFeedback,
    },
    {
      title: "ביטחון",
      score: presentation.confidence,
      feedback: presentation.confidenceFeedback,
    },
    {
      title: "מעורבות",
      score: presentation.engagement,
      feedback: presentation.engagementFeedback,
    },
    {
      title: "סגנון דיבור",
      score: presentation.speechStyle,
      feedback: presentation.speechStyleFeedback,
    },
  ];

  return (
    <>
      <Grid container spacing={3}>
        {scoreCategories.map((category, index) => (
          <Grid item xs={12} md={6} key={index}>
            <ScoreCard
              title={category.title}
              score={category.score}
              feedback={category.feedback}
            />
          </Grid>
        ))}
      </Grid>

      <Card sx={{ mt: 4 }} elevation={2}>
        <CardHeader
          title={
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <EmojiEvents sx={{ mr: 1, color: "primary.main" }} />
              <Typography variant="h6">ניתוח כולל</Typography>
            </Box>
          }
        />
        <CardContent>
          <Typography variant="h6">ציון כולל</Typography>
          <Typography variant="body2" color="text.secondary">
            הציון המשוקלל של כל הקטגוריות
          </Typography>
          <Typography variant="h3" fontWeight="bold">
            {presentation.score}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body2">
            הציון הכללי מחושב על סמך הביצועים בכל הקטגוריות.
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default ScoreSection;
