import React, { Component } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  CircularProgress,
  Alert,
  Chip,
} from '@mui/material';
import { Person as PersonIcon, Email as EmailIcon, Phone as PhoneIcon } from '@mui/icons-material';
import { usersApi } from '../services/externalApi';

class TeamMembers extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      members: [],
      loading: true,
      error: null,
      selectedMember: null,
    };

    this.loadMembers = this.loadMembers.bind(this);
    this.handleSelectMember = this.handleSelectMember.bind(this);
  }

  componentDidMount() {
    this.loadMembers();
  }

  componentWillUnmount() {
    
    console.log('TeamMembers component will unmount');
  }

  componentDidUpdate(prevProps, prevState) {
    
    if (prevProps.projectId !== this.props.projectId) {
      this.loadMembers();
    }
  }

  async loadMembers() {
    try {
      this.setState({ loading: true, error: null });

      const users = await usersApi.getAll();

      const limitedUsers = users.slice(0, 6);

      this.setState({
        members: limitedUsers,
        loading: false,
      });
    } catch (err) {
      this.setState({
        error: err.message || 'Erro ao carregar membros da equipe',
        loading: false,
      });
    }
  }

  handleSelectMember(member) {
    this.setState({
      selectedMember: this.state.selectedMember?.id === member.id ? null : member,
    });
  }

  render() {
    const { members, loading, error, selectedMember } = this.state;
    const { maxDisplay = 6 } = this.props;

    if (loading) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      );
    }

    if (error) {
      return (
        <Box sx={{ p: 2 }}>
          <Alert severity="error">{error}</Alert>
        </Box>
      );
    }

    return (
      <Box sx={{ p: 2 }}>
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
          <PersonIcon color="primary" />
          <Typography variant="h6">
            Membros da Equipe (API Externa)
          </Typography>
          <Chip
            label={`${members.length} membros`}
            size="small"
            color="primary"
            variant="outlined"
          />
        </Box>

        <Grid container spacing={2}>
          {members.slice(0, maxDisplay).map((member) => (
            <Grid item xs={12} sm={6} md={4} key={member.id}>
              <Card
                sx={{
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  border: selectedMember?.id === member.id ? '2px solid #1976d2' : 'none',
                  '&:hover': {
                    boxShadow: 4,
                    transform: 'translateY(-2px)',
                  },
                }}
                onClick={() => this.handleSelectMember(member)}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                      {member.name.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {member.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        @{member.username}
                      </Typography>
                    </Box>
                  </Box>

                  {}
                  {selectedMember?.id === member.id && (
                    <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid #e0e0e0' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <EmailIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {member.email}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <PhoneIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {member.phone}
                        </Typography>
                      </Box>
                      <Typography variant="caption" color="text.secondary" display="block" mt={1}>
                        Empresa: {member.company.name}
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {members.length === 0 && (
          <Typography variant="body2" color="text.secondary" align="center">
            Nenhum membro encontrado
          </Typography>
        )}
      </Box>
    );
  }
}

export default TeamMembers;