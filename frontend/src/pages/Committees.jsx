import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  useTheme,
  ThemeProvider,
  createTheme,
  useMediaQuery,
  Container
} from '@mui/material';
import { styled } from '@mui/system';

// Create a default theme
const defaultTheme = createTheme({
  palette: {
    primary: { main: '#3f51b5' },
    secondary: { main: '#f50057' },
    error: { main: '#d32f2f' },
    background: { default: '#f5f7fa' },
    text: { primary: '#212121', secondary: '#666666' },
  },
  spacing: 8,
  typography: {
    h2: {
      fontSize: '2.5rem',
      '@media (max-width: 600px)': {
        fontSize: '1.8rem',
      },
    },
    subtitle1: {
      fontSize: '1.1rem',
      '@media (max-width: 600px)': {
        fontSize: '0.9rem',
      },
    },
    h5: {
      fontSize: '1.5rem',
      '@media (max-width: 600px)': {
        fontSize: '1.2rem',
      },
    },
  },
});

// Error Boundary Component
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Committee Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ 
          p: 2,
          textAlign: 'center',
          backgroundColor: 'background.default',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Typography variant="h4" color="error" gutterBottom>
            Oops! Something went wrong
          </Typography>
          <Typography variant="body1" gutterBottom>
            We couldn't load the committees information.
          </Typography>
          <Box sx={{ mt: 2 }}>
            <button 
              onClick={() => window.location.reload()}
              style={{
                padding: '6px 12px',
                backgroundColor: defaultTheme.palette.primary.main,
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}
            >
              Try Again
            </button>
          </Box>
        </Box>
      );
    }
    return this.props.children;
  }
}

// Styled Components
const CommitteeCard = styled(Card)(({ theme }) => ({
  borderRadius: '12px',
  boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 24px rgba(0,0,0,0.15)'
  },
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
}));

const CommitteeHeader = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'color',
})(({ theme, color = '#3f51b5' }) => ({
  background: `linear-gradient(135deg, ${color} 0%, ${theme.palette.augmentColor({ color: { main: color } }).dark} 100%)`,
  color: theme.palette.getContrastText(color),
  padding: theme.spacing(1.5),
  borderTopLeftRadius: '12px',
  borderTopRightRadius: '12px',
  position: 'relative',
  overflow: 'hidden',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    width: '30%',
    height: '100%',
    background: 'rgba(255,255,255,0.2)',
    transform: 'skewX(-20deg)'
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
  }
}));

// Enhanced Header Component
const PageHeader = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(3),
  textAlign: 'center',
  position: 'relative',
  '& h1': {
    fontWeight: 700,
    color: theme.palette.primary.main,
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
    marginBottom: theme.spacing(1.5),
    position: 'relative',
    '&::after': {
      content: '""',
      display: 'block',
      width: '80px',
      height: '3px',
      background: theme.palette.secondary.main,
      margin: `${theme.spacing(1.5)} auto 0`,
      borderRadius: '2px'
    }
  },
  '& p': {
    color: theme.palette.text.secondary,
    maxWidth: '700px',
    margin: '0 auto',
    fontSize: '1rem'
  },
  [theme.breakpoints.down('sm')]: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    '& h1': {
      letterSpacing: '1px',
      '&::after': {
        width: '60px',
        height: '2px',
        margin: `${theme.spacing(1)} auto 0`
      }
    },
    '& p': {
      maxWidth: '90%',
      fontSize: '0.9rem'
    }
  }
}));

// Committees Data
const committeesData = [
  { name: "Academic Committee", color: "#009688" },
  { name: "Academic Tour Committee", color: "#e91e63" },
  { name: "Add-on Course Committee", color: "#ff5722" },
  { name: "Alumni Committee", color: "#9c27b0" },
  { name: "Course & Syllabus Committee", color: "#4caf50" },
  { name: "Magazine Committee", color: "#ff9800" },
  { name: "Website Committee", color: "#2196f3" },
  { name: "Placement Committee", color: "#f44336" },
  { name: "Social Media Committee", color: "#3f51b5" },
  { name: "Feedback Committee", color: "#673ab7" },
  { name: "Record Keeping Committee", color: "#795548" },
  { name: "Career Counselling Committee", color: "#607d8b" },
  { name: "Department Student Society Committee", color: "#cddc39" },
  { name: "Quality Assurance Committee", color: "#8bc34a" },
  { name: "Grievance Redressal Committee", color: "#ffeb3b" },
];

const CommitteesComponent = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%)',
      pt: 7.5,
    }}>
      <Container maxWidth="lg">
        {/* Enhanced Header Section */}
        <PageHeader>
          <Typography variant="h2" component="h1">
            Department Committees
          </Typography>
          <Typography variant="subtitle1">
            Dedicated teams driving excellence across our department's initiatives.
          </Typography>
        </PageHeader>
        
        {/* Committees Grid */}
        <Grid 
          container 
          spacing={isMobile ? 2 : 4}
          sx={{
            display: 'grid',
            gridTemplateColumns: isMobile 
              ? '1fr' 
              : 'repeat(auto-fill, minmax(300px, 1fr))',
            paddingBottom: theme.spacing(isMobile ? 2 : 4),
          }}
        >
          {committeesData.map((committee, index) => (
            <Grid item key={index} xs={12}>
              <CommitteeCard>
                <CommitteeHeader color={committee.color}>
                  <Typography 
                    variant="h5" 
                    component="h2" 
                    sx={{ 
                      fontWeight: 600, 
                      position: 'relative', 
                      zIndex: 1,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: isMobile ? 'normal' : 'nowrap',
                    }}
                  >
                    {committee.name}
                  </Typography>
                </CommitteeHeader>
                <CardContent sx={{ flexGrow: 1, p: isMobile ? 1.5 : 2 }} />
              </CommitteeCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

const Committees = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={defaultTheme}>
        <CommitteesComponent />
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default Committees;