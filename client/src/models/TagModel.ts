import { SelectTag } from "@shared/schema";

export type Tag = SelectTag;

export class TagModel {
  static getAllUniqueNames(tags: Tag[]): string[] {
    return [...new Set(tags.map(tag => tag.name))];
  }

  static findById(tags: Tag[], id: number): Tag | undefined {
    return tags.find(tag => tag.id === id);
  }

  static sortByName(tags: Tag[]): Tag[] {
    return [...tags].sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
  }
}