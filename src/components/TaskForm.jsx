import { useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Grid,
} from '@mui/material';
import { useForm } from '../hooks/useForm';

const TaskForm = ({ open, onClose, onSubmit, initialData = null, projectId }) => {
  
  const { values, errors, handleChange, validate, reset, setValues } = useForm({
    title: '',
    description: '',
    status: 'Pendente',
    assignee: '',
    dueDate: '',
    projectId: projectId || '',
  });

  useEffect(() => {
    if (initialData) {
      setValues({ ...initialData });
    } else {
      reset();
      if (projectId) {
        setValues(prev => ({ ...prev, projectId }));
      }
    }
  }, [initialData, open, projectId]);

  const statusOptions = ['Pendente', 'Em Progresso', 'Concluída'];

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationRules = {
      title: {
        required: true,
        label: 'Título da tarefa',
        minLength: 3,
      },
      assignee: {
        required: true,
        label: 'Responsável',
      },
    };

    if (validate(validationRules)) {
      
      const taskData = {
        ...values,
        projectId: projectId || values.projectId,
      };

      onSubmit(taskData);
      handleClose();
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        {initialData ? 'Editar Tarefa' : 'Nova Tarefa'}
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            {}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Título da Tarefa"
                name="title"
                value={values.title}
                onChange={handleChange}
                error={Boolean(errors.title)}
                helperText={errors.title}
                required
                placeholder="Ex: Criar layout responsivo"
              />
            </Grid>

            {}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Descrição"
                name="description"
                value={values.description}
                onChange={handleChange}
                multiline
                rows={3}
                placeholder="Descreva os detalhes da tarefa"
              />
            </Grid>

            {}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Status"
                name="status"
                value={values.status}
                onChange={handleChange}
                required
              >
                {statusOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Responsável"
                name="assignee"
                value={values.assignee}
                onChange={handleChange}
                error={Boolean(errors.assignee)}
                helperText={errors.assignee}
                required
                placeholder="Nome do responsável"
              />
            </Grid>

            {}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Data de Conclusão"
                name="dueDate"
                type="date"
                value={values.dueDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            {initialData ? 'Atualizar' : 'Criar'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default TaskForm;