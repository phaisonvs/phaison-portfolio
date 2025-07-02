import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { AlertCircle, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />
      
      <main className="flex-grow flex items-center justify-center px-4 py-16">
        <div className="max-w-2xl w-full text-center">
          <div className="mb-8">
            <AlertCircle className="h-24 w-24 text-primary mx-auto mb-6" />
            <h1 className="text-6xl md:text-8xl font-bold mb-4 text-primary">404</h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Página não encontrada
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
              A página que você está procurando não existe ou foi movida para outro local.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Voltar ao início
              </Link>
            </Button>
            <Button variant="outline" size="lg" onClick={() => window.history.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Página anterior
            </Button>
          </div>
          
          <div className="mt-12 p-6 rounded-xl bg-zinc-900/50 border border-white/10">
            <h3 className="text-lg font-medium mb-2">Sugestões</h3>
            <ul className="text-gray-400 text-sm space-y-1">
              <li>• Verifique se o endereço está digitado corretamente</li>
              <li>• Navegue usando o menu principal</li>
              <li>• Volte à página inicial e explore o portfólio</li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
