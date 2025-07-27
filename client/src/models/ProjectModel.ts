import { ProjectWithTags } from "@shared/schema";

export class ProjectModel {
  static formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('pt-BR');
  }

  static getMainImage(project: ProjectWithTags): string {
    return (project.project.galleryImages && project.project.galleryImages.length > 0) 
      ? project.project.galleryImages[0] 
      : project.project.imageUrl;
  }

  static getGalleryImages(project: ProjectWithTags) {
    return (project.project.galleryImages || []).map(image => ({
      src: image,
      alt: `${project.project.title} - Imagem da galeria`
    }));
  }

  static getTagNames(project: ProjectWithTags): string[] {
    return project.tags.map(tag => tag.name);
  }

  static filterByTag(projects: ProjectWithTags[], tagName: string): ProjectWithTags[] {
    return projects.filter(project => 
      project.tags.some(tag => tag.name === tagName)
    );
  }
}