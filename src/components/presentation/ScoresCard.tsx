import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  LinearProgress,
} from "@mui/material";

interface ScoreCardProps {
  title: string;
  score: number;
  feedback: string;
  className?: string;
}

export const ScoreCard = ({ title, score, feedback }: ScoreCardProps) => {
  // מפתח צבעים בהתאם לציון
  const getColorByScore = (score: number) => {
    if (score >= 8) return "success";
    if (score >= 6) return "warning";
    return "error";
  };

  return (
    <Card elevation={2}>
      <CardHeader
        title={
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6" component="div">
              {title}
            </Typography>
            <Typography variant="h5" component="div" fontWeight="bold">
              {score}/10
            </Typography>
          </Box>
        }
        sx={{ pb: 1 }}
      />
      <CardContent>
        <Box sx={{ width: "100%", mb: 1 }}>
          <LinearProgress
            variant="determinate"
            value={score*10}
            color={getColorByScore(score)}
            sx={{ height: 8, borderRadius: 4 }}
          />
        </Box>
        <Typography variant="body2" color="text.secondary">
          {feedback}
        </Typography>
      </CardContent>
    </Card>
  );
};
