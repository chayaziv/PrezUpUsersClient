import React from "react";
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Chip,
  alpha,
  Tooltip,
} from "@mui/material";
import { motion } from "framer-motion";
import PublicIcon from "@mui/icons-material/Public";
import LockIcon from "@mui/icons-material/Lock";
import LabelIcon from "@mui/icons-material/Label";
import VideoFileIcon from "@mui/icons-material/VideoFile";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { TagType } from "@/types/tag";

import {
  paperWrapperStyle,
  titleStyle,
  listItemTextPrimary,
  chipTagStyle,
  tagsWrapperStyle,
  secondaryTextStyle,
  dividerStyle,
} from "../../../styles/presentationDetailsStyle";

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <Paper elevation={1} sx={paperWrapperStyle}>
    {children}
  </Paper>
);

const Title = () => (
  <Typography variant="h6" gutterBottom sx={titleStyle}>
    <VideoFileIcon fontSize="small" />
    Presentation Details
  </Typography>
);

const InfoListItem = ({ icon, label, content, delay = 0 }) => (
  <ListItem
    component={motion.li}
    initial={{ x: -20, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ delay }}
    sx={{ px: 0 }}
  >
    <ListItemIcon sx={{ minWidth: 40 }}>{icon}</ListItemIcon>
    <ListItemText
      primary={
        <Typography variant="body1" sx={listItemTextPrimary}>
          {label}
        </Typography>
      }
      secondary={content}
    />
  </ListItem>
);

const DividerSection = () => <Divider component="li" sx={dividerStyle} />;

const VisibilityItem = ({ isPublic }) => (
  <InfoListItem
    icon={
      isPublic ? <PublicIcon color="primary" /> : <LockIcon color="secondary" />
    }
    label="Visibility"
    content={
      <Tooltip
        title={
          isPublic
            ? "Anyone can view this presentation"
            : "Only you can view this presentation"
        }
      >
        <Chip
          label={isPublic ? "Public" : "Private"}
          size="small"
          color={isPublic ? "primary" : "default"}
          variant="outlined"
          sx={{ mt: 0.5 }}
        />
      </Tooltip>
    }
  />
);

const TagsItem = ({ tags }: { tags: TagType[] }) => {
  const content =
    tags.length > 0 ? (
      <Box sx={tagsWrapperStyle}>
        {tags.map((tag) => (
          <Chip
            key={tag.id}
            label={tag.name}
            size="small"
            color="primary"
            variant="outlined"
            sx={chipTagStyle}
          />
        ))}
      </Box>
    ) : (
      <Typography
        variant="body2"
        color="text.secondary"
        sx={secondaryTextStyle}
      >
        No tags
      </Typography>
    );

  return (
    <InfoListItem
      icon={<LabelIcon color="primary" />}
      label="Tags"
      content={content}
      delay={0.2}
    />
  );
};

const FileSizeItem = ({ fileSize }: { fileSize: number }) => (
  <InfoListItem
    icon={<VideoFileIcon color="primary" />}
    label="File Size"
    content={
      <Typography
        variant="body2"
        color="text.secondary"
        sx={secondaryTextStyle}
      >
        {fileSize.toFixed(2)} MB
      </Typography>
    }
    delay={0.3}
  />
);

const CreatedDateItem = () => {
  const dateStr = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <InfoListItem
      icon={<CalendarTodayIcon color="primary" />}
      label="Created"
      content={
        <Typography
          variant="body2"
          color="text.secondary"
          sx={secondaryTextStyle}
        >
          {dateStr}
        </Typography>
      }
      delay={0.4}
    />
  );
};

interface PresentationDetailsProps {
  name: string;
  isPublic: boolean;
  tags: TagType[];
  fileSize: number; // in MB
}

const PresentationDetails: React.FC<PresentationDetailsProps> = ({
  name,
  isPublic,
  tags,
  fileSize,
}) => {
  return (
    <Wrapper>
      <Title />
      <List dense>
        <VisibilityItem isPublic={isPublic} />
        <DividerSection />
        <TagsItem tags={tags} />
        <DividerSection />
        <FileSizeItem fileSize={fileSize} />
        <DividerSection />
        <CreatedDateItem />
      </List>
    </Wrapper>
  );
};

export default PresentationDetails;
