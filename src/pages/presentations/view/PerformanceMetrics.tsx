import {
  Paper,
  Typography,
  Stack,
  Divider,
  Box,
  LinearProgress,
  CardContent,
  Card,
} from "@mui/material";

import { getProgressColor } from "@/utils/format";

const ScoreRing = ({ score }) => {
  const getProgressColor = (score) => {
    if (score >= 9) return "green";
    if (score >= 7) return "blue";
    if (score >= 5) return "orange";
    return "red";
  };

  return (
    <Box
      sx={{
        ml: "auto",
        width: 80,
        height: 80,
        borderRadius: "50%",
        border: `8px solid ${getProgressColor(score)}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.paper",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        color={getProgressColor(score)}
      >
        {score}
      </Typography>
    </Box>
  );
};

const MetricCard = ({ metric }) => {
  return (
    <Card variant="outlined" sx={{ borderRadius: 3, boxShadow: "none" }}>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Typography variant="subtitle1" fontWeight="medium">
            {metric.label}
          </Typography>
          <Box sx={{ ml: "auto", display: "flex", alignItems: "center" }}>
            <Typography
              variant="body2"
              fontWeight="bold"
              sx={{ color: getProgressColor(metric.value), mr: 1 }}
            >
              {metric.value}/10
            </Typography>
          </Box>
        </Box>

        <LinearProgress
          variant="determinate"
          value={metric.value * 10}
          sx={{
            height: 8,
            borderRadius: 4,
            mb: 2,
            bgcolor: "rgba(0,0,0,0.04)",
            "& .MuiLinearProgress-bar": {
              bgcolor: getProgressColor(metric.value),
              borderRadius: 4,
            },
          }}
        />

        <Typography variant="body2" color="text.secondary">
          {metric.feedback}
        </Typography>
      </CardContent>
    </Card>
  );
};

const PerformanceMetrics = ({ presentation }) => {
  return (
    <Paper elevation={1} sx={{ p: 3, mb: 4, borderRadius: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" fontWeight="bold">
          Overall Score
        </Typography>
        <ScoreRing score={presentation.score} />
      </Box>

      <Divider sx={{ mb: 3 }} />
      <Stack spacing={3}>
        {[
          {
            label: "Clarity",
            value: presentation.clarity,
            feedback: presentation.clarityFeedback,
          },
          {
            label: "Fluency",
            value: presentation.fluency,
            feedback: presentation.fluencyFeedback,
          },
          {
            label: "Confidence",
            value: presentation.confidence,
            feedback: presentation.confidenceFeedback,
          },
          {
            label: "Engagement",
            value: presentation.engagement,
            feedback: presentation.engagementFeedback,
          },
          {
            label: "Speech Style",
            value: presentation.speechStyle,
            feedback: presentation.speechStyleFeedback,
          },
        ].map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </Stack>
    </Paper>
  );
};

export default PerformanceMetrics;
