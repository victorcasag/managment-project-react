import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import { Folder as FolderIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Layout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {}
      <AppBar position="static">
        <Toolbar>
          <FolderIcon sx={{ mr: 2 }} />
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              cursor: 'pointer',
              '&:hover': { opacity: 0.8 },
            }}
            onClick={handleLogoClick}
          >
            Sistema de Gestão de Projetos
          </Typography>
        </Toolbar>
      </AppBar>

      {}
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default' }}>
        {children}
      </Box>

      {}
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) => theme.palette.grey[200],
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center">
            Sistema CRUD de Gestão de Projetos - Desenvolvido com React
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;