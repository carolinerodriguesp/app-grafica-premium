'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  ShoppingCart, 
  Heart, 
  Bell, 
  User, 
  Search,
  Menu,
  X,
  Sparkles
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const cartItemsCount = typeof window !== 'undefined' 
    ? JSON.parse(localStorage.getItem('cart') || '[]').length 
    : 0;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implementar busca
      console.log('Buscar:', searchQuery);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => router.push('/')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">PC</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                Padrão Color
              </span>
              <p className="text-xs text-gray-600">Gráfica Moderna</p>
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar produtos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 w-full"
              />
            </div>
          </form>

          {/* Actions - Desktop */}
          <div className="hidden md:flex items-center gap-3">
            {/* Notifications */}
            <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Bell className="w-6 h-6 text-gray-700" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            {/* Favorites */}
            <button 
              className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => router.push('/meus-pedidos')}
            >
              <Heart className="w-6 h-6 text-gray-700" />
            </button>

            {/* Cart */}
            <button 
              className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => router.push('/carrinho')}
            >
              <ShoppingCart className="w-6 h-6 text-gray-700" />
              {cartItemsCount > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-0 text-xs">
                  {cartItemsCount}
                </Badge>
              )}
            </button>

            {/* User Menu */}
            <Button 
              variant="outline"
              className="border-2 border-cyan-500 text-cyan-600 hover:bg-cyan-50"
              onClick={() => router.push('/meus-pedidos')}
            >
              <User className="w-5 h-5 mr-2" />
              Minha Conta
            </Button>

            {/* CTA */}
            <Button 
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-lg shadow-cyan-500/30"
              onClick={() => router.push('/criador-ia')}
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Criar com IA
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            {/* Search - Mobile */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Buscar produtos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 w-full"
                />
              </div>
            </form>

            {/* Mobile Actions */}
            <div className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => {
                  router.push('/meus-pedidos');
                  setIsMenuOpen(false);
                }}
              >
                <User className="w-5 h-5 mr-2" />
                Minha Conta
              </Button>

              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => {
                  router.push('/carrinho');
                  setIsMenuOpen(false);
                }}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Carrinho ({cartItemsCount})
              </Button>

              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => {
                  router.push('/meus-pedidos');
                  setIsMenuOpen(false);
                }}
              >
                <Heart className="w-5 h-5 mr-2" />
                Favoritos
              </Button>

              <Button 
                variant="outline" 
                className="w-full justify-start"
              >
                <Bell className="w-5 h-5 mr-2" />
                Notificações
              </Button>

              <Button 
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                onClick={() => {
                  router.push('/criador-ia');
                  setIsMenuOpen(false);
                }}
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Criar com IA
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
