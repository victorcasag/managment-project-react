import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { projectsApi } from '../../services/mockApi';

export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async (_, { rejectWithValue }) => {
    try {
      const response = await projectsApi.getAll();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createProject = createAsyncThunk(
  'projects/createProject',
  async (projectData, { rejectWithValue }) => {
    try {
      const response = await projectsApi.create(projectData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateProject = createAsyncThunk(
  'projects/updateProject',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await projectsApi.update(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteProject = createAsyncThunk(
  'projects/deleteProject',
  async (id, { rejectWithValue }) => {
    try {
      await projectsApi.delete(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  projects: [],
  loading: false,
  error: null,
  successMessage: '',
};

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    
    clearMessages: (state) => {
      state.error = null;
      state.successMessage = '';
    },
  },
  extraReducers: (builder) => {
    
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(createProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects.push(action.payload);
        state.successMessage = `Projeto "${action.payload.name}" criado com sucesso!`;
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(updateProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.projects.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.projects[index] = action.payload;
        }
        state.successMessage = `Projeto "${action.payload.name}" atualizado com sucesso!`;
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(deleteProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = state.projects.filter(p => p.id !== action.payload);
        state.successMessage = 'Projeto deletado com sucesso!';
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMessages } = projectSlice.actions;

export default projectSlice.reducer;