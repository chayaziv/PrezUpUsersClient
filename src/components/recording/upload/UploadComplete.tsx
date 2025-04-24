// import React, { useState } from "react";
// import { Box, Typography, Button } from "@mui/material";
// import { motion } from "framer-motion";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import ContentCopyIcon from "@mui/icons-material/ContentCopy";
// import {
//   containerStyle,
//   buttonStyle,
//   iconStyle,
// } from "@/styles/uploadCompleteStyle"; // Import styles from the styles file

// interface UploadCompleteProps {
//   presentationName: string;
// }

// const UploadComplete: React.FC<UploadCompleteProps> = ({
//   presentationName,
// }) => {
//   const [copySuccess, setCopySuccess] = useState(false);

//   const handleCopyLink = () => {
//     // Simulate copying a link
//     navigator.clipboard.writeText(
//       `https://presentation-app.com/view/${presentationName
//         .replace(/ /g, "-")
//         .toLowerCase()}`
//     );
//     setCopySuccess(true);
//     setTimeout(() => setCopySuccess(false), 2000);
//   };

//   return (
//     <Box
//       component={motion.div}
//       initial={{ opacity: 0, scale: 0.9 }}
//       animate={{ opacity: 1, scale: 1 }}
//       transition={{
//         type: "spring",
//         stiffness: 300,
//         damping: 25,
//       }}
//       sx={containerStyle}
//     >
//       <motion.div
//         initial={{ scale: 0, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ delay: 0.3, type: "spring" }}
//       >
//         <CheckCircleIcon sx={iconStyle} /> {/* שימוש בעיצוב מהקובץ */}
//       </motion.div>
//       <Typography variant="h6" gutterBottom>
//         Upload Complete!
//       </Typography>
//       <Typography
//         variant="body2"
//         color="text.secondary"
//         gutterBottom
//         sx={{ mb: 2 }}
//       >
//         Your presentation has been successfully uploaded.
//       </Typography>

//       <Button
//         component={motion.button}
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         variant="outlined"
//         color="primary"
//         startIcon={copySuccess ? <CheckCircleIcon /> : <ContentCopyIcon />}
//         onClick={handleCopyLink}
//         sx={buttonStyle}
//       >
//         {copySuccess ? "Link copied!" : "Copy sharing link"}
//       </Button>
//     </Box>
//   );
// };

// export default UploadComplete;

import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {
  containerStyle,
  buttonStyle,
  iconStyle,
} from "@/styles/uploadCompleteStyle"; // Import styles from the styles file

const RenderIcon = () => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: 0.3, type: "spring" }}
  >
    <CheckCircleIcon sx={iconStyle} />
  </motion.div>
);

const CopyLinkButton = ({
  copySuccess,
  handleCopyLink,
}: {
  copySuccess: boolean;
  handleCopyLink: () => void;
}) => (
  <Button
    component={motion.button}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    variant="outlined"
    color="primary"
    startIcon={copySuccess ? <CheckCircleIcon /> : <ContentCopyIcon />}
    onClick={handleCopyLink}
    sx={buttonStyle}
  >
    {copySuccess ? "Link copied!" : "Copy sharing link"}
  </Button>
);

const UploadText = () => (
  <>
    <Typography variant="h6" gutterBottom>
      Upload Complete!
    </Typography>
    <Typography
      variant="body2"
      color="text.secondary"
      gutterBottom
      sx={{ mb: 2 }}
    >
      Your presentation has been successfully uploaded.
    </Typography>
  </>
);

const Wrapper = ({ children }) => (
  <Box
    component={motion.div}
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{
      type: "spring",
      stiffness: 300,
      damping: 25,
    }}
    sx={containerStyle}
  >
    {children}
  </Box>
);

interface UploadCompleteProps {
  presentationName: string;
}

const UploadComplete = ({
  presentationName,
}) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopyLink = () => {
    // Simulate copying a link
    navigator.clipboard.writeText(
      `https://presentation-app.com/view/${presentationName
        .replace(/ /g, "-")
        .toLowerCase()}`
    );
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <Wrapper>
      <RenderIcon />
      <UploadText />
      <CopyLinkButton
        copySuccess={copySuccess}
        handleCopyLink={handleCopyLink}
      />{" "}
    </Wrapper>
  );
};


export default UploadComplete;