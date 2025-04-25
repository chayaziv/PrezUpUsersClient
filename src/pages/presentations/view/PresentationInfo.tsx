import { Paper, Typography, Box, Chip } from "@mui/material";
import PreviewPlayer from "@/components/recording/finalize/PreviewPlayer";
import { formatTime } from "@/utils/format";

const PresentationInfo = ({ presentation }) => {
  return (
    <Paper elevation={1} sx={{ p: 3, mb: 4, borderRadius: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Box>
          <Typography variant="subtitle1" fontWeight="bold">
            {presentation.user?.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {presentation.user?.jobTitle}
          </Typography>
        </Box>
      </Box>

      <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mt: 2 }}>
        {presentation.title}
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
        {presentation.tags.map((tag) => (
          <Chip key={tag.id} label={tag.name} size="small" color="primary" variant="outlined" />
        ))}
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Typography variant="body2" color="text.secondary">
          {new Date(presentation.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Duration: {formatTime(presentation.duration || 0)}
        </Typography>
      </Box>

      <PreviewPlayer videoUrl={presentation.fileUrl} />
    </Paper>
  );
};

export default PresentationInfo;
