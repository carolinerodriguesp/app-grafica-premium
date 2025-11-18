'use client';

import { Category } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { 
  CreditCard, 
  Flag, 
  FileText, 
  Mail, 
  Package, 
  Gift,
  LucideIcon
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface CategoryCardProps {
  category: Category;
}

// Mapeamento de ícones
const iconMap: Record<string, LucideIcon> = {
  CreditCard,
  Flag,
  FileText,
  Mail,
  Package,
  Gift
};

export function CategoryCard({ category }: CategoryCardProps) {
  const router = useRouter();
  const Icon = iconMap[category.icon] || Package;

  const handleClick = () => {
    // Scroll suave para a seção de produtos
    const section = document.getElementById('produtos-populares');
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div 
      onClick={handleClick}
      className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-cyan-500 cursor-pointer"
    >
      {/* Background Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={category.image} 
          alt={category.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        
        {/* Icon */}
        <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
          <Icon className="w-6 h-6 text-cyan-600" />
        </div>

        {/* Product Count Badge */}
        <Badge className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-900 border-0 shadow-lg">
          {category.productCount} produtos
        </Badge>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-cyan-600 transition-colors">
          {category.name}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2">
          {category.description}
        </p>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 border-2 border-cyan-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </div>
  );
}
