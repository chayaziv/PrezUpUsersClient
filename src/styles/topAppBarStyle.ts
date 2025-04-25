// topAppBarStyles.ts
export const appBarStyles = {
    zIndex: (theme: any) => theme.zIndex.drawer + 1,
    boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
    background: '#FFFFFF',
  };
  
  export const avatarStyles = {
    width: 40,
    height: 40,
    bgcolor: 'secondary.main',
    boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
    border: '2px solid white',
  };
  
  export const signInButtonStyles = {
    borderColor: 'primary.light',
    color: 'primary.main',
    borderRadius: 2,
    '&:hover': {
      borderColor: 'primary.main',
      backgroundColor: 'rgba(75, 124, 133, 0.04)',
    }
  };
  
  export const menuStyles = {
    overflow: 'visible',
    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
    mt: 1.5,
    borderRadius: 2,
    minWidth: 180,
  };
  