import {
  Card,
  CardContent,
  Typography,
  Chip,
  IconButton,
  Box,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckIcon,
} from '@mui/icons-material';

const TaskCard = ({ task, onEdit, onDelete, onToggleStatus }) => {
  const { id, title, description, status, assignee, dueDate } = task;

  const getStatusColor = (status) => {
    const colors = {
      'Pendente': 'default',
      'Em Progresso': 'warning',
      'Concluída': 'success',
    };
    return colors[status] || 'default';
  };

  const isOverdue = () => {
    if (status === 'Concluída' || !dueDate) return false;
    return new Date(dueDate) < new Date();
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      `Tem certeza que deseja deletar a tarefa "${title}"?`
    );

    if (confirmDelete) {
      onDelete(id);
    }
  };

  return (
    <Card
      sx={{
        mb: 2,
        transition: 'all 0.2s',
        borderLeft: isOverdue() ? '4px solid #f44336' : '4px solid transparent',
        '&:hover': {
          boxShadow: 3,
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box sx={{ flexGrow: 1 }}>
            {}
            <Typography variant="h6" component="h3" gutterBottom>
              {title}
            </Typography>

            {}
            {description && (
              <Typography variant="body2" color="text.secondary" paragraph>
                {description}
              </Typography>
            )}

            {}
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
              <Chip
                label={status}
                color={getStatusColor(status)}
                size="small"
              />

              {assignee && (
                <Chip
                  label={assignee}
                  size="small"
                  variant="outlined"
                />
              )}

              {dueDate && (
                <Chip
                  label={`Prazo: ${new Date(dueDate).toLocaleDateString('pt-BR')}`}
                  size="small"
                  color={isOverdue() ? 'error' : 'default'}
                  variant="outlined"
                />
              )}

              {}
              {isOverdue() && (
                <Typography variant="caption" color="error" sx={{ ml: 1 }}>
                  ATRASADA
                </Typography>
              )}
            </Box>
          </Box>

          {}
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            {status !== 'Concluída' && (
              <IconButton
                size="small"
                color="success"
                onClick={() => onToggleStatus(id, 'Concluída')}
                title="Marcar como concluída"
              >
                <CheckIcon />
              </IconButton>
            )}
            <IconButton
              size="small"
              color="primary"
              onClick={() => onEdit(task)}
              title="Editar"
            >
              <EditIcon />
            </IconButton>
            <IconButton
              size="small"
              color="error"
              onClick={handleDelete}
              title="Deletar"
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TaskCard;