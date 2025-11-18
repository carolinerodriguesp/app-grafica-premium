'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Navbar } from '@/components/custom/navbar';
import { ProductCard } from '@/components/custom/product-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { categories, getProductsByCategory } from '@/lib/data';
import { Category, Product } from '@/lib/types';
import { 
  ArrowLeft, 
  SlidersHorizontal,
  Grid3x3,
  List,
  TrendingUp,
  Sparkles
} from 'lucide-react';

export default function CategoriaPage() {
  const params = useParams();
  const router = useRouter();
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('popular');

  useEffect(() => {
    const foundCategory = categories.find(c => c.id === params.id);
    if (foundCategory) {
      setCategory(foundCategory);
      let categoryProducts = getProductsByCategory(foundCategory.id);
      
      // Ordenar produtos
      if (sortBy === 'price-asc') {
        categoryProducts = [...categoryProducts].sort((a, b) => a.basePrice - b.basePrice);
      } else if (sortBy === 'price-desc') {
        categoryProducts = [...categoryProducts].sort((a, b) => b.basePrice - a.basePrice);
      } else if (sortBy === 'popular') {
        categoryProducts = [...categoryProducts].sort((a, b) => 
          (b.popular ? 1 : 0) - (a.popular ? 1 : 0)
        );
      }
      
      setProducts(categoryProducts);
    }
  }, [params.id, sortBy]);

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <p className="text-xl text-gray-600">Categoria não encontrada</p>
          <Button onClick={() => router.push('/')} className="mt-4">
            Voltar para Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero da Categoria */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={category.image} 
          alt={category.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
        
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <button 
              onClick={() => router.back()}
              className="flex items-center gap-2 text-white hover:text-cyan-300 mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </button>
            
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">
              {category.name}
            </h1>
            <p className="text-xl text-gray-200 mb-4">
              {category.description}
            </p>
            <Badge className="bg-white/20 backdrop-blur-sm text-white border-0">
              {category.productCount} produtos disponíveis
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filtros e Ordenação */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <Button variant="outline" className="border-2">
              <SlidersHorizontal className="w-5 h-5 mr-2" />
              Filtros
            </Button>
            
            <select
              className="px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-cyan-500 focus:outline-none"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="popular">Mais Populares</option>
              <option value="price-asc">Menor Preço</option>
              <option value="price-desc">Maior Preço</option>
              <option value="newest">Mais Recentes</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewMode('grid')}
            >
              <Grid3x3 className="w-5 h-5" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewMode('list')}
            >
              <List className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Produtos */}
        {products.length > 0 ? (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-200 flex items-center justify-center">
              <Sparkles className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Nenhum produto encontrado
            </h3>
            <p className="text-gray-600 mb-6">
              Não encontramos produtos nesta categoria no momento
            </p>
            <Button 
              onClick={() => router.push('/')}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
            >
              Explorar Outras Categorias
            </Button>
          </div>
        )}

        {/* Recomendação IA */}
        {products.length > 0 && (
          <div className="mt-12 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border-2 border-purple-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Sugestão Inteligente
                </h3>
                <p className="text-gray-600 mb-4">
                  Baseado no seu interesse em <strong>{category.name}</strong>, 
                  recomendamos também explorar <strong>Adesivos Personalizados</strong> e <strong>Banners</strong> 
                  para complementar seus materiais de marketing.
                </p>
                <Button 
                  variant="outline" 
                  className="border-purple-500 text-purple-600 hover:bg-purple-50"
                  onClick={() => router.push('/')}
                >
                  Ver Recomendações
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
