import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";

// Form schema
const projectFormSchema = z.object({
  title: z.string().min(3, "O título deve ter pelo menos 3 caracteres"),
  description: z.string().min(10, "A descrição deve ter pelo menos 10 caracteres"),
  imageUrl: z.string().url("Por favor, insira uma URL válida para a imagem principal"),
  category: z.string().min(1, "Por favor, selecione uma categoria"),
  publishedStatus: z.string(),
  tags: z.string().optional(),
  figmaUrl: z.string().url("Por favor, insira uma URL válida do Figma").or(z.string().length(0)).optional(),
  videoUrl: z.string().url("Por favor, insira uma URL válida do vídeo").or(z.string().length(0)).optional(),
  sectionDisplay: z.string().optional(),
  galleryImages: z.array(z.string()).optional().default([]),
});

type ProjectFormValues = z.infer<typeof projectFormSchema>;

interface ProjectFormProps {
  projectId?: number;
  onSuccess?: () => void;
}

export function ProjectForm({ projectId, onSuccess }: ProjectFormProps) {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch existing project data if editing
  const { data: existingProject, isLoading: isLoadingProject } = useQuery({
    queryKey: [`/api/projects/${projectId}`],
    enabled: !!projectId,
  });

  // Fetch all tags
  const { data: allTags } = useQuery({
    queryKey: ['/api/tags'],
  });

  // Create project mutation
  const createProject = useMutation({
    mutationFn: async (data: ProjectFormValues) => {
      // Parse tags from comma-separated string to array
      const tagsArray = data.tags ? data.tags.split(',').map(tag => tag.trim()) : [];
      
      const projectData = {
        ...data,
        tags: tagsArray,
      };
      
      const res = await apiRequest("POST", "/api/projects", projectData);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/projects'] });
      toast({
        title: "Success!",
        description: "Project created successfully.",
      });
      if (onSuccess) onSuccess();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create project.",
        variant: "destructive",
      });
    },
    onSettled: () => {
      setIsSubmitting(false);
    }
  });

  // Update project mutation
  const updateProject = useMutation({
    mutationFn: async (data: ProjectFormValues) => {
      // Parse tags from comma-separated string to array
      const tagsArray = data.tags ? data.tags.split(',').map(tag => tag.trim()) : [];
      
      const projectData = {
        ...data,
        tags: tagsArray,
      };
      
      const res = await apiRequest("PUT", `/api/projects/${projectId}`, projectData);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/projects'] });
      queryClient.invalidateQueries({ queryKey: [`/api/projects/${projectId}`] });
      toast({
        title: "Success!",
        description: "Project updated successfully.",
      });
      if (onSuccess) onSuccess();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update project.",
        variant: "destructive",
      });
    },
    onSettled: () => {
      setIsSubmitting(false);
    }
  });

  // Prepare default values for the form
  const defaultValues: Partial<ProjectFormValues> = {
    title: "",
    description: "",
    imageUrl: "",
    category: "",
    publishedStatus: "draft",
    tags: "",
    figmaUrl: "",
    videoUrl: "",
    sectionDisplay: "general",
    galleryImages: [],
  };

  // If editing, set form values from existing project
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: existingProject 
      ? {
          title: existingProject.project.title,
          description: existingProject.project.description,
          imageUrl: existingProject.project.imageUrl,
          category: existingProject.project.category,
          publishedStatus: existingProject.project.publishedStatus,
          tags: existingProject.tags.map((tag: any) => tag.name).join(", "),
          figmaUrl: existingProject.project.figmaUrl || "",
          videoUrl: existingProject.project.videoUrl || "",
          sectionDisplay: existingProject.project.sectionDisplay || "general",
          galleryImages: existingProject.project.galleryImages || [],
        } 
      : defaultValues,
  });

  // Update form values when existing project data is loaded
  useEffect(() => {
    if (existingProject && !form.formState.isDirty) {
      form.reset({
        title: existingProject.project.title,
        description: existingProject.project.description,
        imageUrl: existingProject.project.imageUrl,
        category: existingProject.project.category,
        publishedStatus: existingProject.project.publishedStatus,
        tags: existingProject.tags.map((tag: any) => tag.name).join(", "),
        figmaUrl: existingProject.project.figmaUrl || "",
        videoUrl: existingProject.project.videoUrl || "",
        sectionDisplay: existingProject.project.sectionDisplay || "general",
        galleryImages: existingProject.project.galleryImages || [],
      });
    }
  }, [existingProject, form]);

  // Form submission handler
  const onSubmit = async (data: ProjectFormValues) => {
    setIsSubmitting(true);
    
    if (projectId) {
      // Update existing project
      updateProject.mutate(data);
    } else {
      // Create new project
      createProject.mutate(data);
    }
  };

  if (isLoadingProject && projectId) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título do Projeto</FormLabel>
              <FormControl>
                <Input placeholder="Digite o título do projeto" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Descreva seu projeto"
                  className="min-h-[120px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL da Imagem Principal</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/image.jpg" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoria</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Website">Website</SelectItem>
                    <SelectItem value="Mobile App">Aplicativo Móvel</SelectItem>
                    <SelectItem value="3D Design">Design 3D</SelectItem>
                    <SelectItem value="UI/UX">UI/UX</SelectItem>
                    <SelectItem value="Branding">Branding</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="publishedStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="draft">Rascunho</SelectItem>
                    <SelectItem value="published">Publicado</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags (separadas por vírgula)</FormLabel>
              <FormControl>
                <Input 
                  placeholder="ex: React, UI Design, 3D"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
              
              {/* Show existing tags as suggestions */}
              {allTags && allTags.length > 0 && (
                <div className="mt-2">
                  <p className="text-xs text-gray-400 mb-1">Tags sugeridas:</p>
                  <div className="flex flex-wrap gap-1">
                    {allTags.map((tag: { id: number, name: string }) => (
                      <Button
                        key={tag.id}
                        type="button"
                        variant="outline"
                        size="sm"
                        className="text-xs py-0 h-6"
                        onClick={() => {
                          const currentTags = field.value ? field.value.split(',').map(t => t.trim()) : [];
                          if (!currentTags.includes(tag.name)) {
                            const newTags = [...currentTags, tag.name].filter(Boolean).join(', ');
                            field.onChange(newTags);
                          }
                        }}
                      >
                        {tag.name}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </FormItem>
          )}
        />
        
        {/* Figma and Video URLs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="figmaUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Link do Figma (opcional)</FormLabel>
                <FormControl>
                  <Input placeholder="https://www.figma.com/file/..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="videoUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Link do vídeo (opcional)</FormLabel>
                <FormControl>
                  <Input placeholder="https://www.youtube.com/watch?v=..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Section Display */}
        <FormField
          control={form.control}
          name="sectionDisplay"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Seção de exibição</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione onde exibir o projeto" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="general">Geral</SelectItem>
                  <SelectItem value="featured">Destaque</SelectItem>
                  <SelectItem value="best">Melhores</SelectItem>
                  <SelectItem value="top">Top Templates</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Gallery Images */}
        <FormField
          control={form.control}
          name="galleryImages"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Imagens da galeria (URLs separadas por linha)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
                  className="min-h-[100px]"
                  onChange={(e) => {
                    const urls = e.target.value.split('\n').filter(url => url.trim());
                    field.onChange(urls);
                  }}
                  value={Array.isArray(field.value) ? field.value.join('\n') : ''}
                />
              </FormControl>
              <p className="text-xs text-gray-400 mt-1">Máximo 6 imagens. Adicione uma URL por linha.</p>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end space-x-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onSuccess}
          >
            Cancelar
          </Button>
          
          <Button 
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {projectId ? "Atualizando..." : "Criando..."}
              </>
            ) : (
              projectId ? "Atualizar Projeto" : "Criar Projeto"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
