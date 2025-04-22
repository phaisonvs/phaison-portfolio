import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  avatarUrl: text("avatar_url"),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(), // Mantido para compatibilidade
  galleryImages: json("gallery_images").$type<string[]>().default([]).notNull(),
  figmaUrl: text("figma_url"),
  videoUrl: text("video_url"),
  sectionDisplay: text("section_display").default("general"),
  userId: integer("user_id").notNull().references(() => users.id),
  category: text("category").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  publishedStatus: text("published_status").default("draft").notNull(),
});

export const tags = pgTable("tags", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
});

export const projectTags = pgTable("project_tags", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull().references(() => projects.id),
  tagId: integer("tag_id").notNull().references(() => tags.id),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  name: true,
  avatarUrl: true,
});

export const insertProjectSchema = createInsertSchema(projects).pick({
  title: true,
  description: true,
  imageUrl: true,
  galleryImages: true,
  figmaUrl: true,
  videoUrl: true,
  sectionDisplay: true,
  userId: true,
  category: true,
  publishedStatus: true,
});

export const insertTagSchema = createInsertSchema(tags).pick({
  name: true,
});

export const insertProjectTagSchema = createInsertSchema(projectTags).pick({
  projectId: true,
  tagId: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

export type InsertTag = z.infer<typeof insertTagSchema>;
export type Tag = typeof tags.$inferSelect;

export type InsertProjectTag = z.infer<typeof insertProjectTagSchema>;
export type ProjectTag = typeof projectTags.$inferSelect;

// Extended schemas
export const projectWithTagsSchema = z.object({
  project: z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    imageUrl: z.string(),
    galleryImages: z.array(z.string()).default([]),
    userId: z.number(),
    category: z.string(),
    publishedStatus: z.string(),
    createdAt: z.string().or(z.date()),
  }),
  user: z.object({
    id: z.number(),
    name: z.string(),
    avatarUrl: z.string().nullable(),
  }),
  tags: z.array(z.object({
    id: z.number(),
    name: z.string(),
  }))
});

export type ProjectWithTags = z.infer<typeof projectWithTagsSchema>;
