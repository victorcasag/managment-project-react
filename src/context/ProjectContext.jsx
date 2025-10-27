import { createContext, useContext, useState, useEffect } from 'react';
import { projectsApi, tasksApi } from '../services/mockApi';

const ProjectContext = createContext();

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjects deve ser usado dentro de ProjectProvider');
  }
  return context;
};

export const ProjectProvider = ({ children }) => {
  
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    loadProjects();
    loadTasks();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await projectsApi.getAll();
      setProjects(response.data);
    } catch (err) {
      setError(`Erro ao carregar projetos: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const loadTasks = async () => {
    try {
      const response = await tasksApi.getAll();
      setTasks(response.data);
    } catch (err) {
      console.error('Erro ao carregar tarefas:', err);
    }
  };

  const createProject = async (projectData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await projectsApi.create(projectData);

      setProjects(prev => [...prev, response.data]);

      setSuccessMessage(`Projeto "${response.data.name}" criado com sucesso!`);
      return response.data;
    } catch (err) {
      setError(`Erro ao criar projeto: ${err.message}`);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateProject = async (id, projectData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await projectsApi.update(id, projectData);

      setProjects(prev =>
        prev.map(p => (p.id === id ? response.data : p))
      );

      setSuccessMessage(`Projeto "${response.data.name}" atualizado com sucesso!`);
      return response.data;
    } catch (err) {
      setError(`Erro ao atualizar projeto: ${err.message}`);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await projectsApi.delete(id);

      setProjects(prev => prev.filter(p => p.id !== id));

      setTasks(prev => prev.filter(t => t.projectId !== id));

      setSuccessMessage(response.message);
    } catch (err) {
      setError(`Erro ao deletar projeto: ${err.message}`);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await tasksApi.create(taskData);

      setTasks(prev => [...prev, response.data]);
      setSuccessMessage(`Tarefa "${response.data.title}" criada com sucesso!`);
      return response.data;
    } catch (err) {
      setError(`Erro ao criar tarefa: ${err.message}`);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await tasksApi.update(id, taskData);

      setTasks(prev =>
        prev.map(t => (t.id === id ? response.data : t))
      );

      setSuccessMessage(`Tarefa "${response.data.title}" atualizada com sucesso!`);
      return response.data;
    } catch (err) {
      setError(`Erro ao atualizar tarefa: ${err.message}`);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await tasksApi.delete(id);

      setTasks(prev => prev.filter(t => t.id !== id));
      setSuccessMessage(response.message);
    } catch (err) {
      setError(`Erro ao deletar tarefa: ${err.message}`);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getTasksByProject = (projectId) => {
    return tasks.filter(t => t.projectId === parseInt(projectId));
  };

  const clearMessages = () => {
    setError(null);
    setSuccessMessage('');
  };

  const value = {
    projects,
    tasks,
    loading,
    error,
    successMessage,
    createProject,
    updateProject,
    deleteProject,
    createTask,
    updateTask,
    deleteTask,
    getTasksByProject,
    clearMessages,
    loadProjects,
    loadTasks,
  };

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
};