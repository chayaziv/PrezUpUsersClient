import { Alert, AlertTitle, Typography, Box } from "@mui/material";

interface ImprovementTipsProps {
  tips: string;
}

const ImprovementTips = ({ tips }: ImprovementTipsProps) => {
  return (
    <Alert severity="info" sx={{ bgcolor: "primary.light", color: "primary.dark" }}>
      <AlertTitle sx={{ mb: 1, fontWeight: "bold" }}>טיפים לשיפור</AlertTitle>
      <Box sx={{ whiteSpace: "pre-line" }}>
        {tips.split("\n").map((tip, index) => (
          <Typography key={index} paragraph sx={{ mb: 2 }}>{tip}</Typography>
        ))}
      </Box>
    </Alert>
  );
};

export default ImprovementTips;
