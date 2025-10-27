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
  Chip,
  Box,
  FormHelperText,
} from '@mui/material';
import { useForm } from '../hooks/useForm';

const ProjectForm = ({ open, onClose, onSubmit, initialData = null }) => {
  
  const { values, errors, handleChange, validate, reset, setValues } = useForm({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    status: 'Planejamento',
    priority: 'Média',
    team: '',
  });

  useEffect(() => {
    if (initialData) {
      
      setValues({
        ...initialData,
        team: initialData.team ? initialData.team.join(', ') : '',
      });
    } else {
      reset();
    }
  }, [initialData, open]);

  const statusOptions = ['Planejamento', 'Em Progresso', 'Concluída', 'Pausado'];

  const priorityOptions = ['Baixa', 'Média', 'Alta'];

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationRules = {
      name: {
        required: true,
        label: 'Nome do projeto',
        minLength: 3,
      },
      description: {
        required: true,
        label: 'Descrição',
        minLength: 10,
      },
      startDate: {
        required: true,
        label: 'Data de início',
      },
      endDate: {
        required: true,
        label: 'Data de término',
        custom: (value) => {
          if (!values.startDate) return true;
          return new Date(value) >= new Date(values.startDate);
        },
        message: 'Data de término deve ser posterior à data de início',
      },
    };

    if (validate(validationRules)) {
      
      const { team, ...otherValues } = values;

      const projectData = {
        ...otherValues,
        
        team: team
          ? team.split(',').map(member => member.trim()).filter(Boolean)
          : [],
      };

      onSubmit(projectData);
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
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        {initialData ? `Editar Projeto: ${initialData.name}` : 'Novo Projeto'}
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            {}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nome do Projeto"
                name="name"
                value={values.name}
                onChange={handleChange}
                error={Boolean(errors.name)}
                helperText={errors.name}
                required
                placeholder="Ex: Sistema de E-commerce"
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
                error={Boolean(errors.description)}
                helperText={errors.description}
                required
                multiline
                rows={3}
                placeholder="Descreva os objetivos e escopo do projeto"
              />
            </Grid>

            {}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Data de Início"
                name="startDate"
                type="date"
                value={values.startDate}
                onChange={handleChange}
                error={Boolean(errors.startDate)}
                helperText={errors.startDate}
                required
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            {}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Data de Término"
                name="endDate"
                type="date"
                value={values.endDate}
                onChange={handleChange}
                error={Boolean(errors.endDate)}
                helperText={errors.endDate}
                required
                InputLabelProps={{ shrink: true }}
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
                select
                label="Prioridade"
                name="priority"
                value={values.priority}
                onChange={handleChange}
                required
              >
                {priorityOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Equipe"
                name="team"
                value={values.team}
                onChange={handleChange}
                placeholder="Separe os nomes por vírgula: João Silva, Maria Santos"
                helperText="Digite os nomes dos membros da equipe separados por vírgula"
              />
              {}
              {values.team && (
                <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {values.team
                    .split(',')
                    .map(member => member.trim())
                    .filter(Boolean)
                    .map((member, index) => (
                      <Chip key={index} label={member} size="small" />
                    ))}
                </Box>
              )}
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

export default ProjectForm;