
import { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  TextField,
  Button,
  Avatar,
  Divider,
  Card,
  CardContent,
  CardHeader,
  Switch,
  FormControlLabel,
  Alert,
  Snackbar,
  IconButton,
  InputAdornment,
  CircularProgress,
  Tabs,
  Tab
} from '@mui/material';
import {
  Save as SaveIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  PhotoCamera as PhotoCameraIcon
} from '@mui/icons-material';
import UserPresentations from '../components/profile/UserPresentations';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const UserProfile = () => {
  // Mock user data
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Public speaker and presentation coach with 5 years of experience.',
    avatarUrl: '',
    notificationSettings: {
      emailNotifications: true,
      analysisComplete: true,
      weeklyTips: true
    }
  });

  // Form states
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(userData);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleEditToggle = () => {
    setEditMode(!editMode);
    if (!editMode) {
      setFormData(userData);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      notificationSettings: {
        ...prev.notificationSettings,
        [name]: checked
      }
    }));
  };

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const validateProfileForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is not valid';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePasswordForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!passwordData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }
    
    if (!passwordData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (passwordData.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateProfileForm()) {
      setSaving(true);
      
      // Simulate API call
      setTimeout(() => {
        setUserData(formData);
        setEditMode(false);
        setSaving(false);
        setSuccessMessage('Profile updated successfully');
      }, 1500);
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validatePasswordForm()) {
      setSaving(true);
      
      // Simulate API call
      setTimeout(() => {
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        setSaving(false);
        setSuccessMessage('Password updated successfully');
      }, 1500);
    }
  };

  const handleCloseSnackbar = () => {
    setSuccessMessage('');
  };

  return (
    <Container maxWidth="lg">
      <Typography
        variant="h3"
        component="h1"
        color="primary"
        gutterBottom
        sx={{ fontWeight: 'bold', mb: 4 }}
      >
        Your Profile
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 4 }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar
                src={userData.avatarUrl || ''}
                alt={userData.name}
                sx={{
                  width: 120,
                  height: 120,
                  mx: 'auto',
                  mb: 2,
                  bgcolor: 'primary.main',
                  fontSize: '3rem'
                }}
              >
                {userData.name.charAt(0)}
              </Avatar>
              
              {editMode && (
                <Box sx={{ mb: 2 }}>
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<PhotoCameraIcon />}
                    size="small"
                  >
                    Change Photo
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                    />
                  </Button>
                </Box>
              )}
              
              <Typography variant="h5" gutterBottom>
                {userData.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {userData.email}
              </Typography>
              
              <Button
                variant={editMode ? "outlined" : "contained"}
                color={editMode ? "secondary" : "primary"}
                startIcon={editMode ? <SaveIcon /> : <EditIcon />}
                onClick={handleEditToggle}
                sx={{ mb: 2 }}
              >
                {editMode ? "Cancel Editing" : "Edit Profile"}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader title="Account Statistics" />
            <Divider />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Presentations
                  </Typography>
                  <Typography variant="h6">12</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Public
                  </Typography>
                  <Typography variant="h6">8</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Avg. Score
                  </Typography>
                  <Typography variant="h6">78%</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Member Since
                  </Typography>
                  <Typography variant="h6">Jun 2023</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="profile tabs">
              <Tab label="Profile Information" id="profile-tab-0" aria-controls="profile-tabpanel-0" />
              <Tab label="My Presentations" id="profile-tab-1" aria-controls="profile-tabpanel-1" />
              <Tab label="Settings" id="profile-tab-2" aria-controls="profile-tabpanel-2" />
            </Tabs>
          </Box>

          <TabPanel value={tabValue} index={0}>
            <Card sx={{ mb: 4 }}>
              <CardHeader title="Profile Information" />
              <Divider />
              <CardContent>
                <Box component="form" onSubmit={handleProfileSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        disabled={!editMode}
                        error={!!errors.name}
                        helperText={errors.name}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        disabled={!editMode}
                        error={!!errors.email}
                        helperText={errors.email}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleFormChange}
                        disabled={!editMode}
                        multiline
                        rows={4}
                      />
                    </Grid>
                    
                    {editMode && (
                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          startIcon={saving ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                          disabled={saving}
                        >
                          Save Changes
                        </Button>
                      </Grid>
                    )}
                  </Grid>
                </Box>
              </CardContent>
            </Card>

            <Card>
              <CardHeader title="Change Password" />
              <Divider />
              <CardContent>
                <Box component="form" onSubmit={handlePasswordSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Current Password"
                        name="currentPassword"
                        type={showPassword.current ? 'text' : 'password'}
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        error={!!errors.currentPassword}
                        helperText={errors.currentPassword}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => togglePasswordVisibility('current')}
                                edge="end"
                              >
                                {showPassword.current ? <VisibilityOffIcon /> : <VisibilityIcon />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="New Password"
                        name="newPassword"
                        type={showPassword.new ? 'text' : 'password'}
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        error={!!errors.newPassword}
                        helperText={errors.newPassword}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => togglePasswordVisibility('new')}
                                edge="end"
                              >
                                {showPassword.new ? <VisibilityOffIcon /> : <VisibilityIcon />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Confirm New Password"
                        name="confirmPassword"
                        type={showPassword.confirm ? 'text' : 'password'}
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => togglePasswordVisibility('confirm')}
                                edge="end"
                              >
                                {showPassword.confirm ? <VisibilityOffIcon /> : <VisibilityIcon />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        startIcon={saving ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                        disabled={saving}
                      >
                        Update Password
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <UserPresentations />
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <Card>
              <CardHeader title="Notification Settings" />
              <Divider />
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={formData.notificationSettings.emailNotifications}
                          onChange={handleNotificationChange}
                          name="emailNotifications"
                          color="primary"
                          disabled={!editMode}
                        />
                      }
                      label="Email Notifications"
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 6 }}>
                      Receive email notifications about your account activity
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={formData.notificationSettings.analysisComplete}
                          onChange={handleNotificationChange}
                          name="analysisComplete"
                          color="primary"
                          disabled={!editMode}
                        />
                      }
                      label="Analysis Complete Alerts"
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 6 }}>
                      Get notified when your presentation analysis is complete
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={formData.notificationSettings.weeklyTips}
                          onChange={handleNotificationChange}
                          name="weeklyTips"
                          color="primary"
                          disabled={!editMode}
                        />
                      }
                      label="Weekly Tips & Insights"
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 6 }}>
                      Receive weekly tips to improve your presentation skills
                    </Typography>
                  </Grid>
                  
                  {editMode && (
                    <Grid item xs={12} sx={{ mt: 2 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={saving ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                        onClick={handleProfileSubmit}
                        disabled={saving}
                      >
                        Save Notification Settings
                      </Button>
                    </Grid>
                  )}
                </Grid>
              </CardContent>
            </Card>
          </TabPanel>
        </Grid>
      </Grid>

      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default UserProfile;
