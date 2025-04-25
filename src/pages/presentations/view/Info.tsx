import PreviewPlayer from "@/components/recording/finalize/PreviewPlayer";
import { formatTime } from "@/utils/format";

import {
  Box,
  Chip,
  Grid,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { ShareIcon } from "lucide-react";

const UserInfo = ({ name, jobTitle }) => (
  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
    {/* <Avatar
                      src={presentation.user?.avatar}
                      sx={{ width: 48, height: 48, mr: 2 }}
                    /> */}
    <Box>
      <Typography variant="subtitle1" fontWeight="bold">
        {name}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {jobTitle}
      </Typography>
    </Box>
    <Box sx={{ ml: "auto", display: "flex", alignItems: "center" }}>
      <Tooltip title="Share presentation">
        <IconButton color="primary" sx={{ mr: 1 }}>
          <ShareIcon />
        </IconButton>
      </Tooltip>
      {/* <Tooltip
                        title={
                          hasUpvoted ? "Remove upvote" : "Upvote this presentation"
                        }
                      >
                        <IconButton
                          color={hasUpvoted ? "primary" : "default"}
                          onClick={handleUpvote}
                        >
                          {hasUpvoted ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
                        </IconButton>
                      </Tooltip> */}
      {/* <Typography variant="body2" sx={{ ml: 1, minWidth: 24 }}>
                        {upvoteCount}
                      </Typography> */}
    </Box>
  </Box>
);

const MetaData = ({ presentation }) => (
  <>
    <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mt: 2 }}>
      {presentation.title}
    </Typography>

    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
      {presentation.tags.map((tag) => (
        <Chip
          key={tag.id}
          label={tag.name}
          size="small"
          color="primary"
          variant="outlined"
        />
      ))}
    </Box>

    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
      <Typography variant="body2" color="text.secondary">
        {new Date(presentation.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Duration: {formatTime(presentation.duration || 0)}
      </Typography>
    </Box>
  </>
);

const Tips = ({ tips }) => (
  <Box sx={{ mb: 3, mt: 3 }}>
    <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
      Key Improvement Tips:
    </Typography>
    <Typography variant="body2" sx={{ mb: 1 }}>
      {tips}
    </Typography>
  </Box>
);

const InfoContainer = ({ children }) => (
  <Grid item xs={12} md={7}>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Paper
        elevation={1}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        {children}
      </Paper>
    </motion.div>
  </Grid>
);

const Info = ({ presentation }) => {
  return (
    <InfoContainer>
      <>
        <UserInfo
          name={presentation.user?.name}
          jobTitle={presentation.user?.jobTitle}
        />
        <MetaData presentation={presentation} />

        <PreviewPlayer videoUrl={presentation.fileUrl} />

        <Tips tips={presentation.tips} />
      </>
    </InfoContainer>
  );
};

export default Info;
