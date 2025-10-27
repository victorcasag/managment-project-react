import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Typography,
  Button,
  Grid,
  Box,
  CircularProgress,
  TextField,
  InputAdornment,
  MenuItem,
  Paper,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import {
  fetchProjects,
  createProject,
  updateProject,
  deleteProject,
  clearMessages,
} from '../redux/slices/projectSlice';
import { useModal } from '../hooks/useModal';
import ProjectCard from '../components/ProjectCard';
import ProjectForm from '../components/ProjectForm';
import Notification from '../components/Notification';
import TeamMembers from '../components/TeamMembers';
import ExternalPosts from '../components/ExternalPosts';

const HomeRedux = () => {
  
  const { projects, loading, error, successMessage } = useSelector((state) => state.projects);

  const dispatch = useDispatch();

  const projectModal = useModal();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [priorityFilter, setPriorityFilter] = useState('Todos');
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const handleCreate = () => {
    setSelectedProject(null);
    projectModal.open();
  };

  const handleEdit = (project) => {
    setSelectedProject(project);
    projectModal.open();
  };

  const handleDelete = async (id) => {
    await dispatch(deleteProject(id));
  };

  const handleSubmit = async (projectData) => {
    try {
      if (selectedProject) {
        
        await dispatch(updateProject({ id: selectedProject.id, data: projectData }));
      } else {
        
        await dispatch(createProject(projectData));
      }
    } catch (err) {
      console.error('Erro ao salvar projeto:', err);
    }
  };

  const filteredProjects = projects.filter((project) => {
    
    const { name, description, status, priority } = project;

    const matchesSearch =
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'Todos' || status === statusFilter;

    const matchesPriority = priorityFilter === 'Todos' || priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const stats = projects.reduce(
    (acc, project) => {
      acc.total += 1;
      if (project.status === 'Em Progresso') acc.inProgress += 1;
      if (project.status === 'Concluída') acc.completed += 1;
      return acc;
    },
    { total: 0, inProgress: 0, completed: 0 }
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Gestão de Projetos - Redux
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Sistema com Redux Toolkit, React Query e API Externa
        </Typography>
      </Box>

      {}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h4" color="primary">
              {stats.total}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total de Projetos
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h4" color="warning.main">
              {stats.inProgress}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Em Progresso
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h4" color="success.main">
              {stats.completed}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Concluídos
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {}
      <Paper sx={{ mb: 4 }}>
        <TeamMembers maxDisplay={6} />
      </Paper>

      {}
      <Paper sx={{ mb: 4 }}>
        <ExternalPosts />
      </Paper>

      {}
      <Box sx={{ mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={5}>
            {}
            <TextField
              fullWidth
              size="small"
              placeholder="Buscar projetos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={6} md={2}>
            {}
            <TextField
              fullWidth
              select
              size="small"
              label="Status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="Todos">Todos</MenuItem>
              <MenuItem value="Planejamento">Planejamento</MenuItem>
              <MenuItem value="Em Progresso">Em Progresso</MenuItem>
              <MenuItem value="Concluída">Concluída</MenuItem>
              <MenuItem value="Pausado">Pausado</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={6} md={2}>
            {}
            <TextField
              fullWidth
              select
              size="small"
              label="Prioridade"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <MenuItem value="Todos">Todas</MenuItem>
              <MenuItem value="Baixa">Baixa</MenuItem>
              <MenuItem value="Média">Média</MenuItem>
              <MenuItem value="Alta">Alta</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} md={3}>
            {}
            <Button
              fullWidth
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleCreate}
            >
              Novo Projeto
            </Button>
          </Grid>
        </Grid>
      </Box>

      {}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {}
      {!loading && filteredProjects.length > 0 && (
        <Grid container spacing={3}>
          {filteredProjects.map((project) => (
            <Grid item xs={12} sm={6} md={4} key={project.id}>
              <ProjectCard
                project={project}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {}
      {!loading && filteredProjects.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Nenhum projeto encontrado
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            {projects.length === 0
              ? 'Comece criando seu primeiro projeto!'
              : 'Tente ajustar os filtros de busca'}
          </Typography>
          {projects.length === 0 && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleCreate}
            >
              Criar Primeiro Projeto
            </Button>
          )}
        </Box>
      )}

      {}
      <ProjectForm
        open={projectModal.isOpen}
        onClose={projectModal.close}
        onSubmit={handleSubmit}
        initialData={selectedProject}
      />

      {}
      <Notification
        open={Boolean(successMessage)}
        message={successMessage}
        severity="success"
        onClose={() => dispatch(clearMessages())}
      />

      {}
      <Notification
        open={Boolean(error)}
        message={error}
        severity="error"
        onClose={() => dispatch(clearMessages())}
      />
    </Container>
  );
};

export default HomeRedux;