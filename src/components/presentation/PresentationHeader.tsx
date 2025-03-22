import { Typography, Box, Chip } from "@mui/material";
import { TagType } from "../../types/tag";


interface PresentationHeaderProps {
  title: string;
  score: number;
  tags: TagType[];
}

const PresentationHeader = ({
  title,
  score,
  tags,
}: PresentationHeaderProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        mb: 4,
      }}
    >
      <Box>
        <Typography variant="h3" component="h1" fontWeight="bold">
          {title}
        </Typography>
        <Box sx={{ display: "flex", gap: 1, mt: 2, flexWrap: "wrap" }}>
          {tags.map((tag) => (
            <Chip
              key={tag.id}
              label={tag.name}
              variant="outlined"
              color="primary"
              sx={{ borderRadius: "16px", fontSize: "0.875rem" }}
            />
          ))}
        </Box>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1 }}>
          ניתוח מעמיק של הפרזנטציה שלך
        </Typography>
       
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: "primary.light",
          borderRadius: "50%",
          p: 3,
        }}
      >
        <Typography variant="h3" component="div" fontWeight="bold">
          {score}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          ציון כולל
        </Typography>
      </Box>
    </Box>
  );
};

export default PresentationHeader;
