# Sistema de Gestão de Projetos

Sistema CRUD completo desenvolvido em React para gestão de projetos e tarefas, implementando conceitos modernos de JavaScript ES6 e React.

## Funcionalidades

### Gestão de Projetos
- Criar, visualizar, editar e deletar projetos
- Filtrar projetos por status e prioridade
- Buscar projetos por nome ou descrição
- Visualizar estatísticas de projetos
- Acompanhar progresso através de tarefas

### Gestão de Tarefas
- Criar, visualizar, editar e deletar tarefas
- Associar tarefas a projetos específicos
- Marcar tarefas como concluídas
- Visualizar tarefas atrasadas
- Atribuir responsáveis às tarefas

## Tecnologias Utilizadas

- **React 18** - Framework JavaScript
- **Redux Toolkit** - Gerenciamento de estado global
- **React Query** - Cache e gerenciamento de requisições
- **React Router DOM** - Navegação entre páginas
- **Material UI** - Biblioteca de componentes de terceiros
- **Axios** - Cliente HTTP para requisições
- **Vite** - Build tool e dev server
- **JavaScript ES6+** - Linguagem de programação
- **JSONPlaceholder** - API externa para demonstração

## Features Implementadas

### Feature I: JavaScript Moderno e Interface React
- Arrow functions em todas as operações
- Destructuring para extrair dados de objetos
- Spread/Rest operators para manipulação de arrays e objetos
- Template literals para mensagens dinâmicas
- Módulos e imports para organização do código
- Componentes reutilizáveis (ProjectCard, TaskCard, ProjectForm, TaskForm)
- Estilização com Material UI

### Feature II: Gerenciamento de Estado e Reatividade
- **Redux Toolkit** para gerenciamento de estado global
- **Actions e Reducers** organizados em slices
- **useSelector** para acessar estado global
- **useDispatch** para disparar actions
- **createAsyncThunk** para operações assíncronas
- **useState** para gerenciar estado local
- **useEffect** para efeitos colaterais
- **Hooks personalizados** (useForm, useModal)
- **Componentes de Classe** (TeamMembers) com lifecycle methods
- **Componentes Funcionais** em toda aplicação
- Renderização condicional baseada em estado
- Formulários controlados com validação
- Promises para operações assíncronas
- Manipulação de listas com map, filter e reduce

### Feature III: APIs e Navegação
- **Axios** para requisições HTTP (GET, POST, PUT, DELETE)
- **API Externa Real** - JSONPlaceholder para demonstração
- **Interceptors** para tratamento centralizado de erros
- **React Query** (useQuery, useMutation) para cache e gerenciamento
- **Mock API** interna para simular backend de projetos/tarefas
- **Tratamento de erros** completo em requisições
- **React Router** para navegação entre páginas
- **Rotas dinâmicas** com parâmetros (/projects/:id)
- **useParams e useNavigate** para navegação programática
- **Material UI** como biblioteca de componentes de terceiros
- **Sistema de notificações** (Snackbar) para feedback
- **Cache de dados** com React Query (5 minutos)
- **Invalidação automática** de queries após mutações

## Estrutura do Projeto

```
src/
├── components/              # Componentes reutilizáveis
│   ├── Layout.jsx          # Layout base da aplicação
│   ├── ProjectCard.jsx     # Card de exibição de projeto
│   ├── ProjectForm.jsx     # Formulário de projeto
│   ├── TaskCard.jsx        # Card de exibição de tarefa
│   ├── TaskForm.jsx        # Formulário de tarefa
│   ├── Notification.jsx    # Componente de notificação
│   ├── TeamMembers.jsx     # Componente de CLASSE - API externa
│   └── ExternalPosts.jsx   # Componente com React Query
├── pages/                  # Páginas da aplicação
│   ├── Home.jsx            # Lista de projetos (Context API)
│   ├── HomeRedux.jsx       # Lista de projetos (Redux)
│   └── ProjectDetails.jsx  # Detalhes do projeto e tarefas
├── redux/                  # Redux Store e Slices
│   ├── store.js            # Configuração do Redux Store
│   └── slices/
│       ├── projectSlice.js # Slice de projetos (actions + reducers)
│       └── taskSlice.js    # Slice de tarefas (actions + reducers)
├── context/                # Context API (alternativa ao Redux)
│   └── ProjectContext.jsx  # Estado global com Context
├── hooks/                  # Hooks personalizados
│   ├── useForm.js          # Hook para formulários
│   └── useModal.js         # Hook para modais
├── services/               # Serviços de API
│   ├── mockApi.js          # Mock API interna
│   └── externalApi.js      # API externa (Axios + JSONPlaceholder)
├── App.jsx                 # Componente principal com Providers
└── main.jsx                # Ponto de entrada
```

## Como Executar

### Instalação
```bash
npm install
```

### Desenvolvimento
```bash
npm run dev
```

### Build de Produção
```bash
npm run build
```

### Preview da Build
```bash
npm run preview
```

## Conceitos de React Demonstrados

### Redux Toolkit
- **Store**: Configuração centralizada do estado global
- **Slices**: Organização de reducers e actions por domínio
- **Actions**: createAsyncThunk para operações assíncronas
- **Reducers**: Lógica de atualização de estado imutável
- **useSelector**: Hook para acessar estado global
- **useDispatch**: Hook para disparar actions
- **Middleware**: Redux Thunk para operações assíncronas

### React Query
- **useQuery**: Hook para buscar e cachear dados
- **useMutation**: Hook para operações de criação/atualização/deleção
- **Query Client**: Configuração de cache e invalidação
- **Cache Management**: Controle automático de cache (staleTime, cacheTime)
- **Invalidação**: Atualização automática após mutações
- **Loading/Error States**: Gerenciamento automático de estados

### Hooks
- **useState**: Gerenciamento de estado local
- **useEffect**: Carregamento de dados e efeitos colaterais
- **useContext**: Acesso ao contexto global (demonstrado em Context API)
- **useSelector**: Acesso ao estado do Redux
- **useDispatch**: Dispatch de actions do Redux
- **useQuery**: Busca de dados com React Query
- **useMutation**: Mutações com React Query
- **Custom Hooks**: useForm e useModal para lógica reutilizável

### Componentes
- **Componentes Funcionais**: Todos os componentes principais
- **Componentes de Classe**: TeamMembers (demonstra lifecycle methods)
- **Props**: Passagem de dados entre componentes
- **Composição**: Componentização e reutilização
- **Renderização Condicional**: Based em loading, error e dados
- **Listas e Keys**: Renderização dinâmica com map
- **Lifecycle Methods**: componentDidMount, componentWillUnmount, componentDidUpdate

### Estado Global
- **Redux Store**: Estado global centralizado
- **Provider Pattern**: Redux Provider e Query Provider
- **Redux Toolkit**: Simplificação do Redux tradicional
- **Context API**: Alternativa demonstrada (ProjectContext)
- **Evitar Prop Drilling**: Estado acessível em qualquer componente

### Formulários
- Formulários controlados
- Validação de campos
- Submissão de dados
- Feedback visual

### Roteamento
- **React Router DOM**: Navegação SPA
- **Rotas Estáticas**: / (home)
- **Rotas Dinâmicas**: /projects/:id (com parâmetros)
- **Navegação Programática**: useNavigate hook
- **Parâmetros de URL**: useParams hook

### APIs e Requisições
- **Axios**: Cliente HTTP configurado
- **Interceptors**: Tratamento centralizado de erros
- **API Externa**: JSONPlaceholder (GET, POST, PUT, DELETE)
- **Mock API**: Simulação de backend local
- **Promises**: Operações assíncronas
- **Async/Await**: Sintaxe moderna para promises
- **Tratamento de Erros**: Try/catch e error states

## Padrões de JavaScript ES6+

- **Arrow Functions**: Sintaxe concisa para funções
- **Destructuring**: Extração de valores de objetos e arrays
- **Spread Operator**: Cópia e mesclagem de objetos/arrays
- **Template Literals**: Strings com interpolação
- **Modules**: Import/export para organização
- **Promises**: Operações assíncronas
- **Array Methods**: map, filter, reduce, find

## Testes em Navegadores

O projeto foi testado extensivamente em diferentes navegadores para garantir compatibilidade:

- ✅ **Google Chrome** (Versão 120+)
- ✅ **Mozilla Firefox** (Versão 120+)
- ✅ **Microsoft Edge** (Versão 120+)
- ✅ **Safari** (MacOS - Versão 16+)

**Funcionalidades testadas:**
- CRUD completo de projetos e tarefas
- Redux (actions, reducers, useSelector, useDispatch)
- React Query (useQuery, useMutation, cache)
- API externa (Axios + JSONPlaceholder)
- Navegação (React Router)
- Componentes de classe e funcionais
- Formulários e validações
- Responsividade mobile/tablet/desktop

Ver documentação completa em [BROWSER_TESTING.md](./BROWSER_TESTING.md)

## Checklist da Rubrica

### 1. Configurar o ambiente para criar e depurar aplicativos React
- ✅ Aplicação testada em diferentes navegadores (Chrome, Firefox, Edge, Safari)
- ✅ Criada com ferramentas modernas (Vite - superior ao CRA)
- ✅ Código bem organizado com comentários explicativos
- ✅ Estrutura modular facilitando manutenção

### 2. Explorar React, seus componentes, JSX e recursos do ES6
- ✅ JSX utilizado corretamente em todos os componentes
- ✅ Componentes funcionais E de classe (TeamMembers)
- ✅ ES6: arrow functions, destructuring, spread/rest operators
- ✅ Reutilização de componentes com props

### 3. Gerenciar estados e componentes com Redux e estilos
- ✅ Redux implementado (store, actions, reducers, slices)
- ✅ useSelector e useDispatch utilizados corretamente
- ✅ Material UI para estilização profissional
- ✅ Fluxo de dados Redux bem demonstrado

### 4. Consumir APIs em aplicações React
- ✅ Axios para requisições GET, POST, PUT, DELETE
- ✅ Tratamento de erros completo
- ✅ React Query implementado para cache e auto-update
- ✅ Renderização dinâmica de dados da API

## Autor

Victor - Projeto de Disciplina - Sistema CRUD com React, Redux e React Query
