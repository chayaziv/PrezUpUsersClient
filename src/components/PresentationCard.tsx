import { Card, CardContent, Typography, Box, Divider, Button } from "@mui/material";
import { PresentationType } from "../types/presentation";

interface PresentationCardProps {
  presentation: PresentationType;
}

const PresentationCard: React.FC<PresentationCardProps> = ({ presentation }) => {
  return (
    <Card sx={{ maxWidth: 345, marginBottom: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Presentation #{presentation.id}
        </Typography>

        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="body2" color="text.secondary">
            <strong>Score:</strong> {presentation.score} / 10
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Clarity:</strong> {presentation.clarity} / 10
            <br />
            <strong>Fluency:</strong> {presentation.fluency} / 10
            <br />
            <strong>Confidence:</strong> {presentation.confidence} / 10
            <br />
            <strong>Engagement:</strong> {presentation.engagement} / 10
            <br />
            <strong>Speech Style:</strong> {presentation.speechStyle} / 10
          </Typography>
        </Box>

        <Divider sx={{ marginBottom: 2 }} />

        <Typography variant="body2" color="text.primary">
          <strong>Feedback:</strong>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Clarity:</strong> {presentation.clarityFeedback}
          <br />
          <strong>Fluency:</strong> {presentation.fluencyFeedback}
          <br />
          <strong>Confidence:</strong> {presentation.confidenceFeedback}
          <br />
          <strong>Engagement:</strong> {presentation.engagementFeedback}
          <br />
          <strong>Speech Style:</strong> {presentation.speechStyleFeedback}
        </Typography>

        <Divider sx={{ marginTop: 2 }} />

        <Box sx={{ marginTop: 2, textAlign: "center" }}>
          <Button
            variant="contained"
            color="primary"
            href={presentation.fileUrl}
            target="_blank"
            sx={{ padding: "8px 16px" }}
          >
            View Presentation
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PresentationCard;
