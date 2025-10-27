import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { tasksApi } from '../../services/mockApi';

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await tasksApi.getAll();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (taskData, { rejectWithValue }) => {
    try {
      const response = await tasksApi.create(taskData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await tasksApi.update(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (id, { rejectWithValue }) => {
    try {
      await tasksApi.delete(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  tasks: [],
  loading: false,
  error: null,
  successMessage: '',
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    
    clearTaskMessages: (state) => {
      state.error = null;
      state.successMessage = '';
    },
    
    removeTasksByProject: (state, action) => {
      state.tasks = state.tasks.filter(t => t.projectId !== action.payload);
    },
  },
  extraReducers: (builder) => {
    
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload);
        state.successMessage = `Tarefa "${action.payload.title}" criada com sucesso!`;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.tasks.findIndex(t => t.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
        state.successMessage = `Tarefa "${action.payload.title}" atualizada com sucesso!`;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.filter(t => t.id !== action.payload);
        state.successMessage = 'Tarefa deletada com sucesso!';
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearTaskMessages, removeTasksByProject } = taskSlice.actions;

export default taskSlice.reducer;