import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Alert,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  IconButton,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { postsApi } from '../services/externalApi';

const ExternalPosts = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', body: '' });

  const queryClient = useQueryClient();

  const {
    data: posts,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['posts'], 
    queryFn: async () => {
      const data = await postsApi.getAll();
      
      return data.slice(0, 10);
    },
    staleTime: 5 * 60 * 1000, 
    cacheTime: 10 * 60 * 1000, 
    retry: 2, 
  });

  const createPostMutation = useMutation({
    mutationFn: (postData) => postsApi.create(postData),
    onSuccess: () => {
      
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      setDialogOpen(false);
      setNewPost({ title: '', body: '' });
    },
    onError: (error) => {
      console.error('Erro ao criar post:', error);
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: (postId) => postsApi.delete(postId),
    onSuccess: () => {
      
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: (error) => {
      console.error('Erro ao deletar post:', error);
    },
  });

  const handleCreatePost = () => {
    if (newPost.title && newPost.body) {
      createPostMutation.mutate({
        ...newPost,
        userId: 1,
      });
    }
  };

  const handleDeletePost = (postId) => {
    const confirmed = window.confirm('Tem certeza que deseja deletar este post?');
    if (confirmed) {
      deletePostMutation.mutate(postId);
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Carregando posts da API externa...</Typography>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="error">
          Erro ao carregar posts: {error?.message || 'Erro desconhecido'}
        </Alert>
        <Button
          variant="contained"
          startIcon={<RefreshIcon />}
          onClick={() => refetch()}
          sx={{ mt: 2 }}
        >
          Tentar Novamente
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      {}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h6">
            Posts Externos (React Query + Axios)
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Dados da API JSONPlaceholder com cache e auto-update
          </Typography>
        </Box>
        <Box>
          <IconButton onClick={() => refetch()} title="Recarregar">
            <RefreshIcon />
          </IconButton>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setDialogOpen(true)}
            size="small"
          >
            Novo Post
          </Button>
        </Box>
      </Box>

      {}
      <Box sx={{ mb: 2 }}>
        <Chip
          label="Dados em cache por 5 minutos"
          size="small"
          color="info"
          variant="outlined"
        />
      </Box>

      {}
      {posts && posts.map((post) => (
        <Card key={post.id} sx={{ mb: 2 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="h3" gutterBottom>
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.body}
                </Typography>
                <Chip
                  label={`User ID: ${post.userId}`}
                  size="small"
                  sx={{ mt: 1 }}
                />
              </Box>
              <IconButton
                size="small"
                color="error"
                onClick={() => handleDeletePost(post.id)}
                disabled={deletePostMutation.isLoading}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      ))}

      {}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Criar Novo Post</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Título"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Conteúdo"
            value={newPost.body}
            onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
            margin="normal"
            multiline
            rows={4}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={handleCreatePost}
            disabled={createPostMutation.isLoading || !newPost.title || !newPost.body}
          >
            {createPostMutation.isLoading ? 'Criando...' : 'Criar'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ExternalPosts;