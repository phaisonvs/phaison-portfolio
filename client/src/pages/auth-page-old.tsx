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
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;



export default function AuthPage() {
  const [, navigate] = useLocation();
  const { user, loginMutation, registerMutation } = useAuth();

  // Redirect if already logged in - go to dashboard instead of home
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  // Login form com credenciais pré-preenchidas para teste
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "usuario_demo",
      password: "senha123",
    },
  });

  // Register form
  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Form submission handlers
  const onLoginSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data);
  };

  const onRegisterSubmit = (values: RegisterFormValues) => {
    const { confirmPassword, ...data } = values;
    registerMutation.mutate(data);
  };

  if (user) {
    return (
      <div className="min-h-screen flex flex-col bg-black text-white">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />

      <main className="flex-grow container mx-auto py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Auth Form Section */}
            <div className="bg-zinc-900 p-8 rounded-xl border border-white/10">
              <h1 className="text-3xl font-semibold mb-6">Bem-vindo</h1>
              <p className="text-gray-400 mb-8">
                Entre na sua conta ou crie uma nova para exibir seu trabalho e gerenciar seu portfólio.
              </p>

              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid grid-cols-2 mb-8">
                  <TabsTrigger value="login">Entrar</TabsTrigger>
                  <TabsTrigger value="register">Cadastrar</TabsTrigger>
                </TabsList>
                
                {/* Login Tab */}
                <TabsContent value="login">
                  <Form {...loginForm}>
                    <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-6">
                      <FormField
                        control={loginForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Usuário</FormLabel>
                            <FormControl>
                              <Input placeholder="Digite seu nome de usuário" {...field} />
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
                              <Input type="password" placeholder="••••••••" {...field} />
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
                </TabsContent>
                
                {/* Register Tab */}
                <TabsContent value="register">
                  <Form {...registerForm}>
                    <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-6">
                      <FormField
                        control={registerForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your full name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={registerForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                              <Input placeholder="Choose a username" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={registerForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="••••••••" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={registerForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="••••••••" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="w-full"
                        disabled={registerMutation.isPending}
                      >
                        {registerMutation.isPending ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creating account...
                          </>
                        ) : (
                          "Create account"
                        )}
                      </Button>
                    </form>
                  </Form>
                </TabsContent>
              </Tabs>
            </div>

            {/* Hero Section */}
            <div className="order-first md:order-last">
              <div className="text-center md:text-left">
                <h2 className="text-4xl font-semibold mb-6">Showcase your creative work</h2>
                <p className="text-gray-400 text-lg mb-8">
                  Join our platform to share your portfolio with the world. Connect with other creators and find new opportunities.
                </p>
                <div className="rounded-xl overflow-hidden mb-6">
                  <img
                    src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                    alt="Creative workspace"
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="flex items-center justify-center md:justify-start space-x-4">
                  <div className="flex -space-x-2">
                    {["https://images.unsplash.com/photo-1472099645785-5658abf4ff4e", 
                      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
                      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7"].map((url, i) => (
                      <img
                        key={i}
                        src={`${url}?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=48&h=48&q=80`}
                        alt={`User ${i + 1}`}
                        className="w-8 h-8 rounded-full border-2 border-black"
                      />
                    ))}
                  </div>
                  <span className="text-gray-400 text-sm">Join 1,000+ creators</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
