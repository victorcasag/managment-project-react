import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
  IconButton,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Group as GroupIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const ProjectCard = ({ project, onEdit, onDelete }) => {
  const navigate = useNavigate();

  const { id, name, description, status, priority, team, startDate, endDate } = project;

  const getStatusColor = (status) => {
    const colors = {
      'Planejamento': 'info',
      'Em Progresso': 'warning',
      'Concluída': 'success',
      'Pausado': 'error',
    };
    return colors[status] || 'default';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'Baixa': 'success',
      'Média': 'warning',
      'Alta': 'error',
    };
    return colors[priority] || 'default';
  };

  const handleView = () => {
    navigate(`/projects/${id}`);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit(project);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    const confirmDelete = window.confirm(
      `Tem certeza que deseja deletar o projeto "${name}"?\nTodas as tarefas associadas também serão removidas.`
    );

    if (confirmDelete) {
      onDelete(id);
    }
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6,
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        {}
        <Typography variant="h6" component="h2" gutterBottom>
          {name}
        </Typography>

        {}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {description}
        </Typography>

        {}
        <Box sx={{ mb: 2, display: 'flex', gap: 1 }}>
          <Chip
            label={status}
            color={getStatusColor(status)}
            size="small"
          />
          <Chip
            label={`Prioridade: ${priority}`}
            color={getPriorityColor(priority)}
            size="small"
            variant="outlined"
          />
        </Box>

        {}
        <Typography variant="caption" color="text.secondary" display="block">
          Início: {new Date(startDate).toLocaleDateString('pt-BR')}
        </Typography>
        <Typography variant="caption" color="text.secondary" display="block">
          Término: {new Date(endDate).toLocaleDateString('pt-BR')}
        </Typography>

        {}
        {team && team.length > 0 && (
          <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <GroupIcon fontSize="small" color="action" />
            <Typography variant="caption" color="text.secondary">
              {team.length} {team.length === 1 ? 'membro' : 'membros'}
            </Typography>
          </Box>
        )}
      </CardContent>

      {}
      <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
        <Button
          size="small"
          startIcon={<ViewIcon />}
          onClick={handleView}
        >
          Ver Detalhes
        </Button>
        <Box>
          <IconButton
            size="small"
            color="primary"
            onClick={handleEdit}
            aria-label="editar projeto"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            size="small"
            color="error"
            onClick={handleDelete}
            aria-label="deletar projeto"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
};

export default ProjectCard;