import { users, type User, type InsertUser, 
         projects, type Project, type InsertProject,
         tags, type Tag, type InsertTag,
         projectTags, type ProjectTag, type InsertProjectTag,
         type ProjectWithTags } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

// modify the interface with any CRUD methods
// you might need
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Project methods
  getAllProjects(): Promise<ProjectWithTags[]>;
  getProjectById(id: number): Promise<ProjectWithTags | undefined>;
  getProjectsByUserId(userId: number): Promise<ProjectWithTags[]>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: InsertProject): Promise<void>;
  deleteProject(id: number): Promise<void>;
  
  // Tag methods
  getAllTags(): Promise<Tag[]>;
  getTagById(id: number): Promise<Tag | undefined>;
  getTagByName(name: string): Promise<Tag | undefined>;
  createTag(tag: InsertTag): Promise<Tag>;
  
  // ProjectTag methods
  createProjectTag(projectTag: InsertProjectTag): Promise<ProjectTag>;
  removeProjectTags(projectId: number): Promise<void>;
  
  // Session store
  sessionStore: session.SessionStore;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private projects: Map<number, Project>;
  private tags: Map<number, Tag>;
  private projectTags: Map<number, ProjectTag>;
  private userIdCounter: number;
  private projectIdCounter: number;
  private tagIdCounter: number;
  private projectTagIdCounter: number;
  sessionStore: session.SessionStore;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.tags = new Map();
    this.projectTags = new Map();
    this.userIdCounter = 1;
    this.projectIdCounter = 1;
    this.tagIdCounter = 1;
    this.projectTagIdCounter = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    });

    // Inicializa os dados
    this.initializeData();
  }

  // Métodos privados para inicializar dados de exemplo
  private async initializeData() {
    // Add some initial tags
    const websiteTag = await this.createTag({ name: "Website" });
    const mobileTag = await this.createTag({ name: "Mobile App" });
    const designTag = await this.createTag({ name: "3D Design" });
    const uiuxTag = await this.createTag({ name: "UI/UX" });
    const brandingTag = await this.createTag({ name: "Branding" });

    // Criar usuário demo
    const demoUser = await this.createUser({
      username: "usuario_demo",
      password: "$2b$10$1XpzUYu8FuvuaBj.aOvgwOnrSBKJZVJRFJzcMP.wozOLQWZkRYyXa", // senha123
      name: "Usuário Demonstração",
      avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=200&h=200&q=80"
    });

    // Adicionar projetos de exemplo
    const project1 = await this.createProject({
      title: "Portal da Empresa",
      description: "Site corporativo responsivo com animações suaves, experiência de usuário intuitiva e seções interativas. Desenvolvido com foco em desempenho e acessibilidade, utilizando as mais recentes tecnologias web para garantir que o site seja rápido, fácil de usar e visualmente impactante.",
      imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      galleryImages: [
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
      ],
      userId: demoUser.id,
      category: "Website",
      publishedStatus: "published"
    });

    // Adicionar tags ao projeto
    await this.createProjectTag({ projectId: project1.id, tagId: websiteTag.id });
    await this.createProjectTag({ projectId: project1.id, tagId: uiuxTag.id });
    await this.createProjectTag({ projectId: project1.id, tagId: brandingTag.id });

    // Adicionar segundo projeto
    const project2 = await this.createProject({
      title: "Aplicativo Fitness",
      description: "Aplicativo móvel para acompanhamento de exercícios e nutrição, com funcionalidades avançadas de monitoramento de progresso e planos personalizados. Interface limpa e minimalista que prioriza a facilidade de uso e motivação do usuário.",
      imageUrl: "https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      galleryImages: [
        "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1532384748853-8f54a8f476e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
      ],
      userId: demoUser.id,
      category: "Mobile App",
      publishedStatus: "published"
    });

    // Adicionar tags ao segundo projeto
    await this.createProjectTag({ projectId: project2.id, tagId: mobileTag.id });
    await this.createProjectTag({ projectId: project2.id, tagId: uiuxTag.id });
    
    // Adicionar mais projetos para teste do carrossel (pelo menos 7 no total)
    const project3 = await this.createProject({
      title: "Design 3D Interativo",
      description: "Modelo 3D interativo que permite aos usuários explorar todos os detalhes da experiência. Inclui animações suaves e controles intuitivos para zoom, rotação e visualização de diferentes ângulos e perspectivas.",
      imageUrl: "https://images.unsplash.com/photo-1617791160536-598cf32026fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      userId: demoUser.id,
      category: "3D Design",
      publishedStatus: "published"
    });
    await this.createProjectTag({ projectId: project3.id, tagId: designTag.id });
    
    const project4 = await this.createProject({
      title: "Dashboard Analítico",
      description: "Interface administrativa com painéis de controle interativos, gráficos em tempo real e visualizações de dados complexas. Design minimalista com foco na usabilidade e eficiência operacional.",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      userId: demoUser.id,
      category: "UI/UX",
      publishedStatus: "published"
    });
    await this.createProjectTag({ projectId: project4.id, tagId: uiuxTag.id });
    
    const project5 = await this.createProject({
      title: "Identidade Visual Moderna",
      description: "Sistema completo de identidade visual com logotipo, paleta de cores, tipografia e aplicações em diversos materiais. Projeto desenvolvido com foco em consistência e reconhecimento de marca.",
      imageUrl: "https://images.unsplash.com/photo-1561070791-36c11767b26a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      userId: demoUser.id,
      category: "Branding",
      publishedStatus: "published"
    });
    await this.createProjectTag({ projectId: project5.id, tagId: brandingTag.id });
    
    const project6 = await this.createProject({
      title: "E-commerce Premium",
      description: "Plataforma de comércio eletrônico com experiência de compra refinada, animações sutis e grande atenção aos detalhes. Inclui carrinho de compras, checkout seguro e integração com sistemas de pagamento.",
      imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      userId: demoUser.id,
      category: "Website",
      publishedStatus: "published"
    });
    await this.createProjectTag({ projectId: project6.id, tagId: websiteTag.id });
    await this.createProjectTag({ projectId: project6.id, tagId: uiuxTag.id });
    
    const project7 = await this.createProject({
      title: "App de Fotografia",
      description: "Aplicativo móvel para edição e compartilhamento de fotos com interface intuitiva e ferramentas avançadas. Inclui filtros personalizáveis, ajustes de imagem profissionais e integração com redes sociais.",
      imageUrl: "https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      userId: demoUser.id,
      category: "Mobile App",
      publishedStatus: "published"
    });
    await this.createProjectTag({ projectId: project7.id, tagId: mobileTag.id });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Project methods
  async getAllProjects(): Promise<ProjectWithTags[]> {
    return Array.from(this.projects.values()).map((project) => {
      const user = this.users.get(project.userId);
      const projectTagEntries = Array.from(this.projectTags.values())
        .filter((pt) => pt.projectId === project.id);
      
      const projectTags = projectTagEntries.map((pt) => {
        const tag = this.tags.get(pt.tagId);
        return tag;
      }).filter((tag): tag is Tag => tag !== undefined);

      return {
        project,
        user: user ? { 
          id: user.id, 
          name: user.name, 
          avatarUrl: user.avatarUrl 
        } : { 
          id: 0, 
          name: "Unknown", 
          avatarUrl: null 
        },
        tags: projectTags
      };
    });
  }

  async getProjectById(id: number): Promise<ProjectWithTags | undefined> {
    const project = this.projects.get(id);
    if (!project) {
      return undefined;
    }
    
    const user = this.users.get(project.userId);
    const projectTagEntries = Array.from(this.projectTags.values())
      .filter((pt) => pt.projectId === project.id);
    
    const projectTags = projectTagEntries.map((pt) => {
      const tag = this.tags.get(pt.tagId);
      return tag;
    }).filter((tag): tag is Tag => tag !== undefined);

    return {
      project,
      user: user ? { 
        id: user.id, 
        name: user.name, 
        avatarUrl: user.avatarUrl 
      } : { 
        id: 0, 
        name: "Unknown", 
        avatarUrl: null 
      },
      tags: projectTags
    };
  }

  async getProjectsByUserId(userId: number): Promise<ProjectWithTags[]> {
    const userProjects = Array.from(this.projects.values())
      .filter((project) => project.userId === userId);
    
    return userProjects.map((project) => {
      const user = this.users.get(project.userId);
      const projectTagEntries = Array.from(this.projectTags.values())
        .filter((pt) => pt.projectId === project.id);
      
      const projectTags = projectTagEntries.map((pt) => {
        const tag = this.tags.get(pt.tagId);
        return tag;
      }).filter((tag): tag is Tag => tag !== undefined);

      return {
        project,
        user: user ? { 
          id: user.id, 
          name: user.name, 
          avatarUrl: user.avatarUrl 
        } : { 
          id: 0, 
          name: "Unknown", 
          avatarUrl: null 
        },
        tags: projectTags
      };
    });
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.projectIdCounter++;
    const now = new Date();
    const project: Project = { 
      ...insertProject, 
      id, 
      createdAt: now
    };
    this.projects.set(id, project);
    return project;
  }

  async updateProject(id: number, projectData: InsertProject): Promise<void> {
    const existingProject = this.projects.get(id);
    if (!existingProject) {
      throw new Error(`Project with id ${id} not found`);
    }
    
    const updatedProject: Project = {
      ...existingProject,
      ...projectData,
      id: existingProject.id, // Ensure id doesn't change
      createdAt: existingProject.createdAt // Preserve original creation date
    };
    
    this.projects.set(id, updatedProject);
  }

  async deleteProject(id: number): Promise<void> {
    this.projects.delete(id);
  }

  // Tag methods
  async getAllTags(): Promise<Tag[]> {
    return Array.from(this.tags.values());
  }

  async getTagById(id: number): Promise<Tag | undefined> {
    return this.tags.get(id);
  }

  async getTagByName(name: string): Promise<Tag | undefined> {
    return Array.from(this.tags.values()).find(
      (tag) => tag.name.toLowerCase() === name.toLowerCase(),
    );
  }

  async createTag(insertTag: InsertTag): Promise<Tag> {
    const id = this.tagIdCounter++;
    const tag: Tag = { ...insertTag, id };
    this.tags.set(id, tag);
    return tag;
  }

  // ProjectTag methods
  async createProjectTag(insertProjectTag: InsertProjectTag): Promise<ProjectTag> {
    const id = this.projectTagIdCounter++;
    const projectTag: ProjectTag = { ...insertProjectTag, id };
    this.projectTags.set(id, projectTag);
    return projectTag;
  }

  async removeProjectTags(projectId: number): Promise<void> {
    // Find all projectTags with the given projectId and delete them
    Array.from(this.projectTags.entries())
      .filter(([_, pt]) => pt.projectId === projectId)
      .forEach(([key, _]) => this.projectTags.delete(key));
  }
}

export const storage = new MemStorage();
