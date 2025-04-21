import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Avatar, 
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
          p: 4,
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
          <Box sx={{ mt: 3 }}>
            <button 
              onClick={() => window.location.reload()}
              style={{
                padding: '8px 16px',
                backgroundColor: defaultTheme.palette.primary.main,
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
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
  flexDirection: 'column'
}));

const CommitteeHeader = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'color',
})(({ theme, color = '#3f51b5' }) => ({
  background: `linear-gradient(135deg, ${color} 0%, ${theme.palette.augmentColor({ color: { main: color } }).dark} 100%)`,
  color: theme.palette.getContrastText(color),
  padding: theme.spacing(2),
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
  }
}));

const MemberItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1, 0),
  borderBottom: `1px solid ${theme.palette.divider}`,
  '&:last-child': {
    borderBottom: 'none'
  }
}));

const CommitteeDescription = styled(Typography)(({ theme }) => ({
  fontStyle: 'italic',
  marginBottom: theme.spacing(2),
  color: theme.palette.text.secondary,
  fontSize: '0.85rem'
}));

// Enhanced Header Component
const PageHeader = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(8), // Added more padding at the top
  paddingBottom: theme.spacing(4),
  textAlign: 'center',
  position: 'relative',
  '& h1': {
    fontWeight: 700,
    color: theme.palette.primary.main,
    textTransform: 'uppercase',
    letterSpacing: '2px',
    marginBottom: theme.spacing(2),
    position: 'relative',
    '&::after': {
      content: '""',
      display: 'block',
      width: '100px',
      height: '4px',
      background: theme.palette.secondary.main,
      margin: `${theme.spacing(2)} auto 0`,
      borderRadius: '2px'
    }
  },
  '& p': {
    color: theme.palette.text.secondary,
    maxWidth: '800px',
    margin: '0 auto'
  }
}));

// Committees Data
const committeesData = [
    {
      name: "SOCIAL MEDIA COMMITTEE",
      color: "#3f51b5",
      description: "Manages all official social media channels, creates engaging content, and maintains the institution's online presence.",
      members: [
        "Jyoti – Social Media, Website",
        "Tanisha – Social Media, Career Counseling",
        "Bhumika – Social Media, Placement",
        "Lavanya – Social Media, Academic Tour",
        "Dimple – Social Media, Career Counseling",
        "Khushi – Social Media, Website"
      ]
    },
    {
      name: "RECORD KEEPING COMMITTEE",
      color: "#4caf50",
      description: "Maintains institutional records, documentation, and archives important events and achievements.",
      members: [
        "Prashant Mani Awasthi – Record Keeping, Alumni",
        "Chakradhar – Record Keeping, Alumni",
        "Satyam – Record Keeping, Placement",
        "Devashish – Record Keeping, Alumni",
        "Sara – Record Keeping, Alumni",
        "Anushka – Record Keeping, Alumni"
      ]
    },
    
    {
      name: "ALUMNI COMMITTEE",
      color: "#9c27b0",
      description: "Maintains relationships with alumni, organizes alumni events, and facilitates networking opportunities.",
      members: [
        "Devashish – Alumni, Record Keeping",
        "Chakradhar – Alumni, Record",
        "Satyam – Alumni, Placement",
        "Sara – Alumni, Record Keeping",
        "Anushka – Alumni, Record Keeping",
        "Abdul Wajid Ahmad – Alumni, Academic Tour"
      ]
    },
    {
      name: "WEBSITE COMMITTEE",
      color: "#2196f3",
      description: "Develops and maintains the institution's website, ensuring up-to-date information and optimal user experience.",
      members: [
        "Riddhima – Website, Record Keeping",
        "Prashant Raghav – Website, Academic Tour",
        "Nishant – Website, Record Keeping",
        "Mayank – Website, Academic Tour",
        "Loviah Duggal – Website, Alumni",
        "Neersj – Website, Academic"
      ]
    },
    {
      name: "PLACEMENT COMMITTEE",
      color: "#f44336",
      description: "Coordinates with companies, organizes placement drives, and prepares students for recruitment processes.",
      members: [
        "Lokesh – Placement, Social Media",
        "Prsidhi – Placement, Alumni",
        "Anmol – Placement, Academic Tour",
        "Manoj – Placement, Career Counseling",
        "Dev – Placement, Social Media",
        "Arunansh – Placement, Website"
      ]
    },
    {
      name: "ACADEMIC COMMITTEE",
      color: "#009688",
      description: "Supports academic activities, organizes seminars, and facilitates student-faculty academic interactions.",
      members: [
        "Ashutosh – Academic, Career Counseling",
        "Prem – Academic, Record Keeping",
        "Kashish – Academic, Record Keeping",
        "Aditya Raj – Academic, Record Keeping",
        "Anubhav – Academic, Placement",
        "Akshiv – Academic, Alumni"
      ]
    },
    {
      name: "CAREER COUNSELING COMMITTEE",
      color: "#673ab7",
      description: "Provides career guidance, organizes counseling sessions, and helps students with career planning.",
      members: [
        "Prashant Raghav – Career Counseling, Academic Tour",
        "Tanishq – Career Counseling, Placement",
        "Danish – Career Counseling, Academic Tour",
        "Mayank – Career Counseling, Record Keeping",
        "Priya – Career Counseling, Record Keeping",
        "Sarthak – Career Counseling, Social Media"
      ]
    },
    {
      name: "ACADEMIC TOUR COMMITTEE",
      color: "#e91e63",
      description: "Organizes educational tours, field trips, and industry visits to enhance practical learning experiences.",
      members: [
        "Abdul Wajid Ahmad – Academic Tour, Alumni",
        "Piyush – Academic Tour, Website",
        "Aditya Thakur – Academic Tour, Alumni",
        "Dhruv – Academic Tour, Placement",
        "Naitik – Academic Tour, Book Keeping",
        "Lovish – Academic Tour, Placement"
      ]
    },
    {
        name: "MAGAZINE COMMITTEE",
        color: "#ff9800",
        description: "Produces the institutional magazine, collects articles, and designs publications showcasing campus life.",
        members: [
          "Utsav Anand – Magazine, Academic Tour",
          "Aditya Choudhary – Magazine, Academic",
          "Srishti Bhattacharya – Magazine, Academic",
          "Archita – Magazine, Placement",
          "Aryan – Magazine, Website",
          "Dev Bhatia – Magazine, Social Media",
          "Gagan – Magazine, Academic Tour",
          "Kanishka – Magazine, Academic",
          "Sheriyar – Magazine, Placement",
          "Shreeyansh – Magazine, Academic",
          "Shruti – Magazine, Social Media",
          "Srishti Goyal – Magazine, Placement",
          "Suryansh – Magazine, Record Keeping",
          "Vaishnavi – Magazine, Social Media",
          "Saumya – Magazine, Placement"
        ]
      }
  ];

const CommitteesComponent = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%)',
    }}>
      <Container maxWidth="lg">
        {/* Enhanced Header Section */}
        <PageHeader>
          <Typography variant="h2" component="h1">
            Our Committees
          </Typography>
          <Typography variant="subtitle1">
            Dedicated teams working together to make our institution better. 
            Each committee plays a vital role in our community's success.
          </Typography>
        </PageHeader>
        
        {/* Committees Grid */}
        <Grid 
          container 
          spacing={4}
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
            [theme.breakpoints.down('sm')]: {
              gridTemplateColumns: '1fr',
              paddingBottom: theme.spacing(4)
            }
          }}
        >
          {committeesData.map((committee, index) => (
            <Grid item key={index} xs={12} sm={6}>
              <CommitteeCard>
                <CommitteeHeader color={committee.color}>
                  <Typography variant="h5" component="h2" sx={{ fontWeight: 600, position: 'relative', zIndex: 1 }}>
                    {committee.name}
                  </Typography>
                </CommitteeHeader>
                <CardContent sx={{ flexGrow: 1 }}>
                  <CommitteeDescription>
                    {committee.description}
                  </CommitteeDescription>
                  {committee.members.map((member, idx) => (
                    <MemberItem key={idx}>
                      <Avatar 
                        sx={{ 
                          width: 32, 
                          height: 32, 
                          fontSize: '0.8rem',
                          bgcolor: committee.color,
                          mr: 2,
                          fontWeight: 500
                        }}
                      >
                        {member.charAt(0)}
                      </Avatar>
                      <Typography variant="body2">{member}</Typography>
                    </MemberItem>
                  ))}
                </CardContent>
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