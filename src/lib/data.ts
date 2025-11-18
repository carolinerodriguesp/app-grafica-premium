// Dados do catálogo Padrão Color
import { Product, Category } from './types';

export const categories: Category[] = [
  {
    id: 'cartoes',
    name: 'Cartões de Visita',
    icon: 'CreditCard',
    description: 'Cartões profissionais de alta qualidade',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&h=600&fit=crop',
    productCount: 15
  },
  {
    id: 'banners',
    name: 'Banners e Faixas',
    icon: 'Flag',
    description: 'Impressão em lona e tecido',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop',
    productCount: 12
  },
  {
    id: 'adesivos',
    name: 'Adesivos',
    icon: 'Sticker',
    description: 'Adesivos personalizados para qualquer superfície',
    image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&h=600&fit=crop',
    productCount: 20
  },
  {
    id: 'folders',
    name: 'Folders e Panfletos',
    icon: 'FileText',
    description: 'Material promocional impresso',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=600&fit=crop',
    productCount: 18
  },
  {
    id: 'convites',
    name: 'Convites',
    icon: 'Mail',
    description: 'Convites para eventos especiais',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop',
    productCount: 25
  },
  {
    id: 'embalagens',
    name: 'Embalagens',
    icon: 'Package',
    description: 'Caixas e sacolas personalizadas',
    image: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=800&h=600&fit=crop',
    productCount: 10
  },
  {
    id: 'sinalizacao',
    name: 'Sinalização',
    icon: 'SignpostBig',
    description: 'Placas e totens',
    image: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=800&h=600&fit=crop',
    productCount: 14
  },
  {
    id: 'brindes',
    name: 'Brindes',
    icon: 'Gift',
    description: 'Produtos promocionais personalizados',
    image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=800&h=600&fit=crop',
    productCount: 30
  }
];

export const products: Product[] = [
  // Cartões de Visita
  {
    id: 'cartao-premium',
    name: 'Cartão de Visita Premium',
    category: 'cartoes',
    description: 'Cartão em papel couché 300g com acabamento fosco ou brilho',
    basePrice: 89.90,
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&h=600&fit=crop',
    customizable: true,
    popular: true,
    tags: ['profissional', 'premium', 'personalizado'],
    options: [
      {
        id: 'quantidade',
        name: 'Quantidade',
        type: 'select',
        required: true,
        choices: [
          { label: '100 unidades', value: '100', priceModifier: 0 },
          { label: '250 unidades', value: '250', priceModifier: 30 },
          { label: '500 unidades', value: '500', priceModifier: 50 },
          { label: '1000 unidades', value: '1000', priceModifier: 80 }
        ]
      },
      {
        id: 'acabamento',
        name: 'Acabamento',
        type: 'select',
        required: true,
        choices: [
          { label: 'Fosco', value: 'fosco', priceModifier: 0 },
          { label: 'Brilho', value: 'brilho', priceModifier: 10 },
          { label: 'Verniz Localizado', value: 'verniz', priceModifier: 25 }
        ]
      },
      {
        id: 'arte',
        name: 'Arquivo da Arte',
        type: 'upload',
        required: true
      }
    ]
  },
  {
    id: 'cartao-luxo',
    name: 'Cartão de Visita Luxo',
    category: 'cartoes',
    description: 'Papel especial 400g com hot stamping dourado ou prateado',
    basePrice: 149.90,
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&h=600&fit=crop',
    customizable: true,
    new: true,
    popular: true,
    tags: ['luxo', 'diferenciado', 'hot-stamping'],
    options: [
      {
        id: 'quantidade',
        name: 'Quantidade',
        type: 'select',
        required: true,
        choices: [
          { label: '100 unidades', value: '100', priceModifier: 0 },
          { label: '250 unidades', value: '250', priceModifier: 50 },
          { label: '500 unidades', value: '500', priceModifier: 90 }
        ]
      },
      {
        id: 'hotstamping',
        name: 'Hot Stamping',
        type: 'select',
        required: true,
        choices: [
          { label: 'Dourado', value: 'dourado', priceModifier: 0 },
          { label: 'Prateado', value: 'prateado', priceModifier: 0 },
          { label: 'Rose Gold', value: 'rose', priceModifier: 15 }
        ]
      }
    ]
  },
  // Banners
  {
    id: 'banner-lona',
    name: 'Banner em Lona',
    category: 'banners',
    description: 'Banner em lona 440g com impressão digital de alta resolução',
    basePrice: 45.00,
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop',
    customizable: true,
    popular: true,
    tags: ['outdoor', 'resistente', 'grande-formato'],
    options: [
      {
        id: 'largura',
        name: 'Largura (metros)',
        type: 'number',
        required: true,
        min: 0.5,
        max: 5
      },
      {
        id: 'altura',
        name: 'Altura (metros)',
        type: 'number',
        required: true,
        min: 0.5,
        max: 10
      },
      {
        id: 'acabamento',
        name: 'Acabamento',
        type: 'select',
        required: true,
        choices: [
          { label: 'Sem acabamento', value: 'sem', priceModifier: 0 },
          { label: 'Ilhós nas pontas', value: 'ilhos', priceModifier: 15 },
          { label: 'Bastão superior e inferior', value: 'bastao', priceModifier: 35 }
        ]
      }
    ]
  },
  // Adesivos
  {
    id: 'adesivo-vinil',
    name: 'Adesivo em Vinil',
    category: 'adesivos',
    description: 'Adesivo em vinil branco ou transparente, resistente à água',
    basePrice: 12.90,
    image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&h=600&fit=crop',
    customizable: true,
    popular: true,
    new: true,
    tags: ['personalizado', 'resistente', 'versátil'],
    options: [
      {
        id: 'tamanho',
        name: 'Tamanho',
        type: 'select',
        required: true,
        choices: [
          { label: '5x5 cm', value: '5x5', priceModifier: 0 },
          { label: '10x10 cm', value: '10x10', priceModifier: 5 },
          { label: '15x15 cm', value: '15x15', priceModifier: 12 },
          { label: '20x20 cm', value: '20x20', priceModifier: 20 }
        ]
      },
      {
        id: 'quantidade',
        name: 'Quantidade',
        type: 'select',
        required: true,
        choices: [
          { label: '50 unidades', value: '50', priceModifier: 0 },
          { label: '100 unidades', value: '100', priceModifier: 15 },
          { label: '250 unidades', value: '250', priceModifier: 35 },
          { label: '500 unidades', value: '500', priceModifier: 60 }
        ]
      },
      {
        id: 'tipo',
        name: 'Tipo de Vinil',
        type: 'select',
        required: true,
        choices: [
          { label: 'Branco', value: 'branco', priceModifier: 0 },
          { label: 'Transparente', value: 'transparente', priceModifier: 8 }
        ]
      }
    ]
  },
  // Folders
  {
    id: 'folder-dobrado',
    name: 'Folder Dobrado',
    category: 'folders',
    description: 'Folder em couché 150g com 1 ou 2 dobras',
    basePrice: 0.45,
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=600&fit=crop',
    customizable: true,
    popular: true,
    tags: ['promocional', 'informativo', 'econômico'],
    options: [
      {
        id: 'quantidade',
        name: 'Quantidade',
        type: 'select',
        required: true,
        choices: [
          { label: '500 unidades', value: '500', priceModifier: 0 },
          { label: '1000 unidades', value: '1000', priceModifier: 150 },
          { label: '2500 unidades', value: '2500', priceModifier: 300 },
          { label: '5000 unidades', value: '5000', priceModifier: 500 }
        ]
      },
      {
        id: 'dobras',
        name: 'Número de Dobras',
        type: 'select',
        required: true,
        choices: [
          { label: '1 dobra (4 páginas)', value: '1', priceModifier: 0 },
          { label: '2 dobras (6 páginas)', value: '2', priceModifier: 50 }
        ]
      }
    ]
  },
  // Convites
  {
    id: 'convite-casamento',
    name: 'Convite de Casamento Premium',
    category: 'convites',
    description: 'Convite em papel especial com envelope e tag personalizada',
    basePrice: 8.50,
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop',
    customizable: true,
    new: true,
    tags: ['casamento', 'elegante', 'premium'],
    options: [
      {
        id: 'quantidade',
        name: 'Quantidade',
        type: 'select',
        required: true,
        choices: [
          { label: '50 convites', value: '50', priceModifier: 0 },
          { label: '100 convites', value: '100', priceModifier: 150 },
          { label: '150 convites', value: '150', priceModifier: 250 },
          { label: '200 convites', value: '200', priceModifier: 350 }
        ]
      },
      {
        id: 'papel',
        name: 'Tipo de Papel',
        type: 'select',
        required: true,
        choices: [
          { label: 'Vergê', value: 'verge', priceModifier: 0 },
          { label: 'Texturizado', value: 'texturizado', priceModifier: 50 },
          { label: 'Perolado', value: 'perolado', priceModifier: 80 }
        ]
      }
    ]
  },
  // Embalagens
  {
    id: 'caixa-personalizada',
    name: 'Caixa Personalizada',
    category: 'embalagens',
    description: 'Caixa em papelão rígido com impressão personalizada',
    basePrice: 3.50,
    image: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=800&h=600&fit=crop',
    customizable: true,
    popular: true,
    new: true,
    tags: ['embalagem', 'branding', 'produto'],
    options: [
      {
        id: 'tamanho',
        name: 'Tamanho',
        type: 'select',
        required: true,
        choices: [
          { label: 'Pequena (10x10x5cm)', value: 'p', priceModifier: 0 },
          { label: 'Média (20x15x10cm)', value: 'm', priceModifier: 1.50 },
          { label: 'Grande (30x25x15cm)', value: 'g', priceModifier: 3.00 }
        ]
      },
      {
        id: 'quantidade',
        name: 'Quantidade',
        type: 'select',
        required: true,
        choices: [
          { label: '100 unidades', value: '100', priceModifier: 0 },
          { label: '250 unidades', value: '250', priceModifier: 150 },
          { label: '500 unidades', value: '500', priceModifier: 250 },
          { label: '1000 unidades', value: '1000', priceModifier: 400 }
        ]
      }
    ]
  },
  // Sinalização
  {
    id: 'placa-acm',
    name: 'Placa em ACM',
    category: 'sinalizacao',
    description: 'Placa em alumínio composto (ACM) 3mm com impressão digital',
    basePrice: 120.00,
    image: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=800&h=600&fit=crop',
    customizable: true,
    popular: true,
    tags: ['durável', 'profissional', 'externa'],
    options: [
      {
        id: 'largura',
        name: 'Largura (cm)',
        type: 'number',
        required: true,
        min: 20,
        max: 200
      },
      {
        id: 'altura',
        name: 'Altura (cm)',
        type: 'number',
        required: true,
        min: 20,
        max: 200
      }
    ]
  },
  // Brindes
  {
    id: 'caneca-personalizada',
    name: 'Caneca Personalizada',
    category: 'brindes',
    description: 'Caneca de cerâmica branca 325ml com impressão colorida',
    basePrice: 18.90,
    image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=800&h=600&fit=crop',
    customizable: true,
    popular: true,
    new: true,
    tags: ['brinde', 'personalizado', 'presente'],
    options: [
      {
        id: 'quantidade',
        name: 'Quantidade',
        type: 'select',
        required: true,
        choices: [
          { label: '12 unidades', value: '12', priceModifier: 0 },
          { label: '24 unidades', value: '24', priceModifier: 40 },
          { label: '50 unidades', value: '50', priceModifier: 80 },
          { label: '100 unidades', value: '100', priceModifier: 150 }
        ]
      },
      {
        id: 'impressao',
        name: 'Tipo de Impressão',
        type: 'select',
        required: true,
        choices: [
          { label: 'Frente', value: 'frente', priceModifier: 0 },
          { label: 'Frente e Verso', value: 'ambos', priceModifier: 25 }
        ]
      }
    ]
  }
];

// Função para obter produtos por categoria
export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter(p => p.category === categoryId);
}

// Função para obter produtos populares
export function getPopularProducts(): Product[] {
  return products.filter(p => p.popular === true);
}

// Função para obter produtos novos
export function getNewProducts(): Product[] {
  return products.filter(p => p.new === true);
}

// Função para buscar produtos
export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return products.filter(p => 
    p.name.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery) ||
    p.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}
