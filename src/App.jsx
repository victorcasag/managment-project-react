import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from './redux/store';
import { ProjectProvider } from './context/ProjectContext';
import Layout from './components/Layout';
import HomeRedux from './pages/HomeRedux';
import ProjectDetailsRedux from './pages/ProjectDetailsRedux';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, 
    },
  },
});

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

function App() {
  return (

    <Provider store={store}>
      {}
      <ProjectProvider>
        {}
        <QueryClientProvider client={queryClient}>
          {}
          <ThemeProvider theme={theme}>
            <CssBaseline />

            {}
            <Router>
              {}
              <Layout>
                {}
                <Routes>
                  {}
                  <Route path="/" element={<HomeRedux />} />

                  {}
                  <Route path="/projects/:id" element={<ProjectDetailsRedux />} />

                  {}
                  <Route path="*" element={<HomeRedux />} />
                </Routes>
              </Layout>
            </Router>
          </ThemeProvider>
        </QueryClientProvider>
      </ProjectProvider>
    </Provider>
  );
}

export default App;