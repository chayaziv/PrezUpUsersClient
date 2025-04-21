import { Theme, SystemStyleObject } from "@mui/system";

export const heroPaperStyles: SystemStyleObject<Theme> = {
  position: "relative",
  backgroundColor: "primary.main",
  color: "white",
  mb: 6,
  borderRadius: 3,
  overflow: "hidden",
  backgroundImage: "linear-gradient(45deg, #2E5077 0%, #4A6D8C 100%)",
};

export const heroContainerStyles: SystemStyleObject<Theme> = {
  py: 8,
};

export const heroTitleStyles: SystemStyleObject<Theme> = {
  fontWeight: "bold",
};

export const heroSubtitleStyles: SystemStyleObject<Theme> = {
  opacity: 0.9,
  mb: 4,
};

export const heroButtonStyles: SystemStyleObject<Theme> = {
  px: 4,
  py: 1.5,
  borderRadius: 2,
  boxShadow: "0 8px 16px rgba(230, 57, 70, 0.3)",
};

export const heroImageStyles: SystemStyleObject<Theme> = {
  width: "100%",
  height: "auto",
  objectFit: "cover",
  borderRadius: 2,
  boxShadow: "0 12px 24px rgba(0, 0, 0, 0.2)",
  transform: "perspective(1000px) rotateY(-15deg)",
};

export const featuresTitleStyles: SystemStyleObject<Theme> = {
  mb: 6,
};

export const featureCardStyles: SystemStyleObject<Theme> = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.3s, box-shadow 0.3s",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0 12px 20px rgba(0, 0, 0, 0.1)",
  },
};

export const featureIconStyles: SystemStyleObject<Theme> = {
  p: 3,
  display: "flex",
  justifyContent: "center",
  color: "primary.main",
};

export const featureTitleStyles: SystemStyleObject<Theme> = {
  color: "primary.main",
};

export const ctaPaperStyles: SystemStyleObject<Theme> = {
  p: 6,
  borderRadius: 3,
  textAlign: "center",
  backgroundImage: "linear-gradient(to right, #e6f2ff 0%, #f0f7ff 100%)",
};

export const ctaTextStyles: SystemStyleObject<Theme> = {
  mb: 4,
  maxWidth: 700,
  mx: "auto",
};

export const ctaButtonStyles: SystemStyleObject<Theme> = {
  px: 4,
  py: 1.5,
  borderRadius: 2,
};
