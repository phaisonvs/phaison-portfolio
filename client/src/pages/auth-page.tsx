import { useEffect } from "react";
import { useLocation } from "wouter";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";

// Login form schema
const loginSchema = z.object({
  username: z.string().min(1, "Usuário é obrigatório"),
  password: z.string().min(1, "Senha é obrigatória"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function AuthPage() {
  const [, navigate] = useLocation();
  const { user, loginMutation } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  // Login form
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onLoginSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />
      
      <main className="flex-grow flex items-center justify-center px-4 py-16">
        <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Form */}
          <div className="max-w-md w-full mx-auto lg:mx-0">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-semibold mb-2">Acesso administrativo</h1>
              <p className="text-gray-400">Entre com suas credenciais para gerenciar o portfólio</p>
            </div>

            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-6">
                <FormField
                  control={loginForm.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Usuário</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Digite seu usuário"
                          {...field}
                          disabled={loginMutation.isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Digite sua senha"
                          {...field}
                          disabled={loginMutation.isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Entrando...
                    </>
                  ) : (
                    "Entrar"
                  )}
                </Button>
              </form>
            </Form>
          </div>

          {/* Right side - Hero content */}
          <div className="text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl font-semibold mb-6 leading-tight">
              Gerencie seu portfólio com facilidade
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Área restrita para administração do portfólio. Aqui você pode 
              gerenciar projetos, atualizar informações e controlar o que 
              será exibido no site.
            </p>
            
            <div className="grid grid-cols-2 gap-6 max-w-sm mx-auto lg:mx-0">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">Projetos</div>
                <div className="text-sm text-gray-400">Gerenciar portfólio</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">Conteúdo</div>
                <div className="text-sm text-gray-400">Atualizar informações</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}