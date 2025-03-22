import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Container, Button, Tabs, Tab, Box } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useState } from "react";
import { PresentationType } from "../../types/presentation";
import PresentationHeader from "./PresentationHeader";

import ScoreSection from "./ScoreSection";
import ImprovementTips from "./ImprovementTips";
import VideoPlayer from "./VideoPlayer";

const PresentationDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [tabValue, setTabValue] = useState(0);

  const presentation: PresentationType | undefined = useSelector(
    (state: RootState) =>
      state.publicPresentations.list.find((p) => p.id.toString() === id)
  );

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  if (!presentation) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          sx={{ mb: 4 }}
        >
          חזרה
        </Button>
        <Box sx={{ textAlign: "center", py: 8 }}>
          <h2>הפרזנטציה לא נמצאה</h2>
          <p>הפרזנטציה המבוקשת אינה קיימת או שאין לך גישה אליה.</p>
          <Button
            variant="contained"
            onClick={() => navigate("/home")}
            sx={{ mt: 4 }}
          >
            חזרה לדף הבית
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Button
        variant="outlined"
        startIcon={<ArrowBack />}
        onClick={() => navigate(-1)}
        sx={{ mb: 4 }}
      >
        חזרה
      </Button>

      <PresentationHeader
        title={presentation.title}
        score={presentation.score}
        tags={presentation.tags}
      />
      <Box
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          border: 1,
          borderColor: "divider",
          mb: 4,
        }}
      >
        <VideoPlayer url={presentation.fileUrl} title={presentation.title} />
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
        <Tabs value={tabValue} onChange={handleTabChange} centered>
          <Tab label="ניקוד מפורט" />
          <Tab label="טיפים לשיפור" />
        </Tabs>
      </Box>

      {tabValue === 0 ? (
        <ScoreSection presentation={presentation} />
      ) : (
        <ImprovementTips tips={presentation.tips} />
      )}
    </Container>
  );
};

export default PresentationDetails;
