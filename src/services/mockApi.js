let projects = [
  {
    id: 1,
    name: 'Sistema de E-commerce',
    description: 'Desenvolvimento de plataforma de vendas online',
    startDate: '2024-01-15',
    endDate: '2024-06-30',
    status: 'Em Progresso',
    priority: 'Alta',
    team: ['João Silva', 'Maria Santos'],
  },
  {
    id: 2,
    name: 'App Mobile Fitness',
    description: 'Aplicativo para acompanhamento de exercícios',
    startDate: '2024-02-01',
    endDate: '2024-08-15',
    status: 'Planejamento',
    priority: 'Média',
    team: ['Carlos Souza'],
  },
];

let tasks = [
  {
    id: 1,
    projectId: 1,
    title: 'Criar layout responsivo',
    description: 'Implementar design mobile-first',
    status: 'Concluída',
    assignee: 'João Silva',
    dueDate: '2024-03-01',
  },
  {
    id: 2,
    projectId: 1,
    title: 'Integrar gateway de pagamento',
    description: 'Configurar Stripe API',
    status: 'Em Progresso',
    assignee: 'Maria Santos',
    dueDate: '2024-04-15',
  },
];

const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

export const projectsApi = {
  
  getAll: async () => {
    await delay();
    return { data: [...projects] };
  },

  getById: async (id) => {
    await delay();
    const project = projects.find(p => p.id === parseInt(id));
    if (!project) {
      throw new Error(`Projeto com ID ${id} não encontrado`);
    }
    return { data: project };
  },

  create: async (projectData) => {
    await delay();
    
    const { name, description, startDate, endDate, status, priority, team } = projectData;

    if (!name || !description) {
      throw new Error('Nome e descrição são obrigatórios');
    }

    const newProject = {
      ...projectData,
      id: Math.max(...projects.map(p => p.id), 0) + 1,
      team: team || [],
    };

    projects = [...projects, newProject];
    return { data: newProject };
  },

  update: async (id, projectData) => {
    await delay();
    const index = projects.findIndex(p => p.id === parseInt(id));

    if (index === -1) {
      throw new Error(`Projeto com ID ${id} não encontrado`);
    }

    projects[index] = { ...projects[index], ...projectData };
    return { data: projects[index] };
  },

  delete: async (id) => {
    await delay();
    const index = projects.findIndex(p => p.id === parseInt(id));

    if (index === -1) {
      throw new Error(`Projeto com ID ${id} não encontrado`);
    }

    const deletedProject = projects[index];
    projects = projects.filter(p => p.id !== parseInt(id));

    tasks = tasks.filter(t => t.projectId !== parseInt(id));

    return {
      data: deletedProject,
      message: `Projeto "${deletedProject.name}" foi deletado com sucesso`
    };
  },
};

export const tasksApi = {
  
  getAll: async () => {
    await delay();
    return { data: [...tasks] };
  },

  getByProject: async (projectId) => {
    await delay();
    const projectTasks = tasks.filter(t => t.projectId === parseInt(projectId));
    return { data: projectTasks };
  },

  create: async (taskData) => {
    await delay();
    const { title, projectId } = taskData;

    if (!title || !projectId) {
      throw new Error('Título e projeto são obrigatórios');
    }

    const newTask = {
      ...taskData,
      id: Math.max(...tasks.map(t => t.id), 0) + 1,
    };

    tasks = [...tasks, newTask];
    return { data: newTask };
  },

  update: async (id, taskData) => {
    await delay();
    const index = tasks.findIndex(t => t.id === parseInt(id));

    if (index === -1) {
      throw new Error(`Tarefa com ID ${id} não encontrada`);
    }

    tasks[index] = { ...tasks[index], ...taskData };
    return { data: tasks[index] };
  },

  delete: async (id) => {
    await delay();
    const index = tasks.findIndex(t => t.id === parseInt(id));

    if (index === -1) {
      throw new Error(`Tarefa com ID ${id} não encontrada`);
    }

    const deletedTask = tasks[index];
    tasks = tasks.filter(t => t.id !== parseInt(id));

    return {
      data: deletedTask,
      message: `Tarefa "${deletedTask.title}" foi deletada com sucesso`
    };
  },
};

export const resetData = () => {
  projects = [
    {
      id: 1,
      name: 'Sistema de E-commerce',
      description: 'Desenvolvimento de plataforma de vendas online',
      startDate: '2024-01-15',
      endDate: '2024-06-30',
      status: 'Em Progresso',
      priority: 'Alta',
      team: ['João Silva', 'Maria Santos'],
    },
    {
      id: 2,
      name: 'App Mobile Fitness',
      description: 'Aplicativo para acompanhamento de exercícios',
      startDate: '2024-02-01',
      endDate: '2024-08-15',
      status: 'Planejamento',
      priority: 'Média',
      team: ['Carlos Souza'],
    },
  ];

  tasks = [
    {
      id: 1,
      projectId: 1,
      title: 'Criar layout responsivo',
      description: 'Implementar design mobile-first',
      status: 'Concluída',
      assignee: 'João Silva',
      dueDate: '2024-03-01',
    },
    {
      id: 2,
      projectId: 1,
      title: 'Integrar gateway de pagamento',
      description: 'Configurar Stripe API',
      status: 'Em Progresso',
      assignee: 'Maria Santos',
      dueDate: '2024-04-15',
    },
  ];
};