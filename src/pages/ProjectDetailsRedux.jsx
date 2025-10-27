import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  Grid,
  Chip,
  Divider,
  IconButton,
  CircularProgress,
} from '@mui/material';
import {
  ArrowBack as BackIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Group as GroupIcon,
} from '@mui/icons-material';
import {
  fetchProjects,
  updateProject,
  deleteProject,
  clearMessages,
} from '../redux/slices/projectSlice';
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
} from '../redux/slices/taskSlice';
import { useModal } from '../hooks/useModal';
import ProjectForm from '../components/ProjectForm';
import TaskForm from '../components/TaskForm';
import TaskCard from '../components/TaskCard';
import Notification from '../components/Notification';

const ProjectDetailsRedux = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { projects, loading: projectsLoading, error, successMessage } = useSelector((state) => state.projects);
  const { tasks, loading: tasksLoading } = useSelector((state) => state.tasks);

  const projectModal = useModal();
  const taskModal = useModal();

  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchTasks());
  }, [dispatch]);

  const project = projects.find(p => p.id === parseInt(id));

  const projectTasks = tasks.filter(t => t.projectId === parseInt(id));

  const taskStats = projectTasks.reduce(
    (acc, task) => {
      acc.total += 1;
      if (task.status === 'Concluída') acc.completed += 1;
      if (task.status === 'Em Progresso') acc.inProgress += 1;
      if (task.status === 'Pendente') acc.pending += 1;
      return acc;
    },
    { total: 0, completed: 0, inProgress: 0, pending: 0 }
  );

  const calculateProgress = () => {
    if (taskStats.total === 0) return 0;
    return Math.round((taskStats.completed / taskStats.total) * 100);
  };

  const handleEditProject = () => {
    projectModal.open();
  };

  const handleDeleteProject = async () => {
    const confirmDelete = window.confirm(
      `Tem certeza que deseja deletar o projeto "${project.name}"?\nTodas as tarefas associadas também serão removidas.`
    );

    if (confirmDelete) {
      await dispatch(deleteProject(id));
      navigate('/');
    }
  };

  const handleSubmitProject = async (projectData) => {
    try {
      await dispatch(updateProject({ id: parseInt(id), data: projectData }));
      projectModal.close();
    } catch (err) {
      console.error('Erro ao atualizar projeto:', err);
    }
  };

  const handleCreateTask = () => {
    setSelectedTask(null);
    taskModal.open();
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    taskModal.open();
  };

  const handleDeleteTask = async (taskId) => {
    const confirmDelete = window.confirm('Tem certeza que deseja deletar esta tarefa?');
    if (confirmDelete) {
      await dispatch(deleteTask(taskId));
    }
  };

  const handleToggleTaskStatus = async (taskId, newStatus) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      await dispatch(updateTask({ id: taskId, data: { ...task, status: newStatus } }));
    }
  };

  const handleSubmitTask = async (taskData) => {
    try {
      if (selectedTask) {
        await dispatch(updateTask({ id: selectedTask.id, data: taskData }));
      } else {
        await dispatch(createTask(taskData));
      }
      taskModal.close();
    } catch (err) {
      console.error('Erro ao salvar tarefa:', err);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  const loading = projectsLoading || tasksLoading;

  if (!loading && !project) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h5" color="error">
          Projeto não encontrado
        </Typography>
        <Button startIcon={<BackIcon />} onClick={handleBack} sx={{ mt: 2 }}>
          Voltar
        </Button>
      </Container>
    );
  }

  if (loading || !project) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  const { name, description, startDate, endDate, status, priority, team } = project;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        startIcon={<BackIcon />}
        onClick={handleBack}
        sx={{ mb: 2 }}
      >
        Voltar
      </Button>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              {name}
            </Typography>

            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <Chip label={status} color="primary" />
              <Chip label={`Prioridade: ${priority}`} color="warning" />
              <Chip
                label={`Progresso: ${calculateProgress()}%`}
                color="success"
                variant="outlined"
              />
            </Box>

            <Typography variant="body1" color="text.secondary" paragraph>
              {description}
            </Typography>

            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  <strong>Início:</strong> {new Date(startDate).toLocaleDateString('pt-BR')}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  <strong>Término:</strong> {new Date(endDate).toLocaleDateString('pt-BR')}
                </Typography>
              </Grid>
            </Grid>

            {team && team.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <GroupIcon color="action" />
                  <Typography variant="subtitle2">
                    Equipe ({team.length} {team.length === 1 ? 'membro' : 'membros'}):
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {team.map((member, index) => (
                    <Chip key={index} label={member} size="small" variant="outlined" />
                  ))}
                </Box>
              </Box>
            )}
          </Box>

          <Box>
            <IconButton
              color="primary"
              onClick={handleEditProject}
              title="Editar projeto"
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color="error"
              onClick={handleDeleteProject}
              title="Deletar projeto"
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      </Paper>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={6} sm={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h5" color="primary">
              {taskStats.total}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h5" color="text.secondary">
              {taskStats.pending}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Pendentes
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h5" color="warning.main">
              {taskStats.inProgress}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Em Progresso
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h5" color="success.main">
              {taskStats.completed}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Concluídas
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" component="h2">
          Tarefas
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreateTask}
        >
          Nova Tarefa
        </Button>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {projectTasks.length > 0 ? (
        projectTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            onToggleStatus={handleToggleTaskStatus}
          />
        ))
      ) : (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Nenhuma tarefa cadastrada ainda
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Comece criando a primeira tarefa deste projeto
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreateTask}
          >
            Criar Primeira Tarefa
          </Button>
        </Paper>
      )}

      <ProjectForm
        open={projectModal.isOpen}
        onClose={projectModal.close}
        onSubmit={handleSubmitProject}
        initialData={project}
      />

      <TaskForm
        open={taskModal.isOpen}
        onClose={taskModal.close}
        onSubmit={handleSubmitTask}
        initialData={selectedTask}
        projectId={parseInt(id)}
      />

      <Notification
        open={Boolean(successMessage)}
        message={successMessage}
        severity="success"
        onClose={() => dispatch(clearMessages())}
      />

      <Notification
        open={Boolean(error)}
        message={error}
        severity="error"
        onClose={() => dispatch(clearMessages())}
      />
    </Container>
  );
};

export default ProjectDetailsRedux;
