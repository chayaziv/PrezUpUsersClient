// UploadComplete.styles.ts
import { SystemStyleObject } from '@mui/system';

export const containerStyle: SystemStyleObject = {
  textAlign: 'center',
  p: 3,
  bgcolor: 'rgba(76, 175, 80, 0.1)',
  borderRadius: 2,
  position: 'relative',
  overflow: 'hidden',
  border: '1px solid rgba(76, 175, 80, 0.2)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'radial-gradient(circle at center, rgba(76, 175, 80, 0.1), transparent 70%)',
    pointerEvents: 'none',
  }
};

export const buttonStyle: SystemStyleObject = {
  borderRadius: 2,
  py: 1,
  position: 'relative',
  overflow: 'hidden',
  borderColor: 'primary.main',
  color: 'primary.main',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-50%',
    left: '-50%',
    width: '200%',
    height: '200%',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)',
    opacity: 0,
    transition: 'opacity 0.5s',
  },
  '&:hover::before': {
    opacity: 1,
  }
};
export const iconStyle: SystemStyleObject = {
  fontSize: 48,
  color: 'success.main',
  mb: 2,
  filter: 'drop-shadow(0 0 10px rgba(76, 175, 80, 0.5))'
};
