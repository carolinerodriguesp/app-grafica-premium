// Home Page - Padrão Color App
'use client';

import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/custom/navbar';
import { CategoryCard } from '@/components/custom/category-card';
import { ProductCard } from '@/components/custom/product-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { categories, getPopularProducts, getNewProducts } from '@/lib/data';
import { 
  Sparkles, 
  Zap, 
  Award, 
  TrendingUp, 
  ArrowRight,
  Star,
  Clock,
  Shield,
  Truck,
  HeadphonesIcon,
  Palette
} from 'lucide-react';

export default function Home() {
  const popularProducts = getPopularProducts();
  const newProducts = getNewProducts();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6bTAgMTBjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span className="text-sm font-medium">Tecnologia + Criatividade</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Transforme suas ideias em{' '}
                <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                  produtos incríveis
                </span>
              </h1>

              <p className="text-xl text-cyan-50 leading-relaxed">
                Gráfica moderna com personalização inteligente, entrega rápida e qualidade premium. 
                Crie, personalize e receba seus produtos com tecnologia de ponta.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-cyan-600 hover:bg-gray-100 shadow-2xl shadow-black/20 text-lg px-8"
                  onClick={() => router.push('/criador-ia')}
                >
                  <Palette className="w-5 h-5 mr-2" />
                  Criar com IA
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm text-lg px-8"
                  onClick={() => {
                    const section = document.getElementById('produtos-populares');
                    section?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Ver Catálogo
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div>
                  <p className="text-3xl font-bold">15k+</p>
                  <p className="text-sm text-cyan-100">Clientes Satisfeitos</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">50k+</p>
                  <p className="text-sm text-cyan-100">Pedidos Entregues</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">4.9★</p>
                  <p className="text-sm text-cyan-100">Avaliação Média</p>
                </div>
              </div>
            </div>

            {/* Right Content - Feature Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <Zap className="w-10 h-10 text-yellow-300 mb-3" />
                <h3 className="font-bold text-lg mb-2">Entrega Rápida</h3>
                <p className="text-sm text-cyan-100">Produção em até 24h</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105 mt-8">
                <Award className="w-10 h-10 text-yellow-300 mb-3" />
                <h3 className="font-bold text-lg mb-2">Qualidade Premium</h3>
                <p className="text-sm text-cyan-100">Materiais de primeira</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <Sparkles className="w-10 h-10 text-yellow-300 mb-3" />
                <h3 className="font-bold text-lg mb-2">IA Criativa</h3>
                <p className="text-sm text-cyan-100">Sugestões inteligentes</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105 mt-8">
                <TrendingUp className="w-10 h-10 text-yellow-300 mb-3" />
                <h3 className="font-bold text-lg mb-2">Cashback</h3>
                <p className="text-sm text-cyan-100">Ganhe em cada compra</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="border-y border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-bold text-gray-900">Entrega Rápida</p>
                <p className="text-sm text-gray-600">A partir de 24h</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-bold text-gray-900">Compra Segura</p>
                <p className="text-sm text-gray-600">Pagamento protegido</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-bold text-gray-900">Frete Grátis</p>
                <p className="text-sm text-gray-600">Acima de R$ 200</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                <HeadphonesIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-bold text-gray-900">Suporte 24/7</p>
                <p className="text-sm text-gray-600">Sempre disponível</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-0">
              Explore Nosso Catálogo
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Produtos para Todas as Necessidades
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              De cartões de visita a banners gigantes, temos tudo para sua empresa crescer
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              size="lg" 
              variant="outline"
              className="border-2 border-cyan-500 text-cyan-600 hover:bg-cyan-50"
              onClick={() => {
                const section = document.getElementById('produtos-populares');
                section?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Ver Todas as Categorias
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section id="produtos-populares" className="py-16 sm:py-24 bg-gradient-to-b from-gray-50 to-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-6 h-6 text-orange-500" />
                <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
                  Mais Vendidos
                </Badge>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Produtos Populares
              </h2>
              <p className="text-gray-600 mt-2">Os favoritos dos nossos clientes</p>
            </div>
            <Button variant="ghost" className="hidden sm:flex text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50">
              Ver Todos
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {popularProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* New Products */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-6 h-6 text-cyan-500" />
                <Badge className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-0">
                  Novidades
                </Badge>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Lançamentos
              </h2>
              <p className="text-gray-600 mt-2">Confira nossos produtos mais recentes</p>
            </div>
            <Button variant="ghost" className="hidden sm:flex text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50">
              Ver Todos
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {newProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0wIDEwYzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-4">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-medium">Tecnologia de Ponta</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Inteligência Artificial a Seu Favor
            </h2>
            <p className="text-xl text-purple-100 max-w-2xl mx-auto">
              Ferramentas exclusivas que facilitam sua criação e aumentam suas vendas
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center mb-6 shadow-2xl">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Sugestões Inteligentes</h3>
              <p className="text-purple-100 leading-relaxed">
                Nossa IA analisa suas necessidades e sugere os produtos perfeitos para seu negócio
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center mb-6 shadow-2xl">
                <Palette className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Criador Guiado</h3>
              <p className="text-purple-100 leading-relaxed">
                Assistente inteligente que te guia passo a passo na criação do produto ideal
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-400 to-red-500 flex items-center justify-center mb-6 shadow-2xl">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Análise Visual</h3>
              <p className="text-purple-100 leading-relaxed">
                Envie sua identidade visual e receba recomendações personalizadas de materiais
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button 
              size="lg" 
              className="bg-white text-purple-600 hover:bg-gray-100 shadow-2xl shadow-black/20 text-lg px-8"
            >
              Experimentar Agora
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-0">
            Fique por Dentro
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Receba Ofertas Exclusivas
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Cadastre-se e ganhe 10% de desconto na primeira compra
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Seu melhor e-mail"
              className="flex-1 h-12"
            />
            <Button 
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-lg shadow-cyan-500/30"
            >
              Cadastrar
            </Button>
          </div>

          <p className="text-sm text-gray-500 mt-4">
            Ao se cadastrar, você concorda com nossa política de privacidade
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">PC</span>
                </div>
                <span className="text-xl font-bold">Padrão Color</span>
              </div>
              <p className="text-gray-400 text-sm">
                Gráfica moderna com tecnologia de ponta e qualidade premium
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-4">Produtos</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Cartões de Visita</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Banners</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Adesivos</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Brindes</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Empresa</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Sobre Nós</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Trabalhe Conosco</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Suporte</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Rastreamento</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Política de Troca</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Termos de Uso</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>© 2025 Padrão Color. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
