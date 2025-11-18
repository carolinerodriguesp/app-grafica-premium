'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Navbar } from '@/components/custom/navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { products } from '@/lib/data';
import { Product } from '@/lib/types';
import { 
  ShoppingCart, 
  Heart, 
  Share2, 
  Upload, 
  Sparkles,
  Check,
  Star,
  Truck,
  Shield,
  ArrowLeft,
  Zap,
  Info
} from 'lucide-react';

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, any>>({});
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [finalPrice, setFinalPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const foundProduct = products.find(p => p.id === params.id);
    if (foundProduct) {
      setProduct(foundProduct);
      setFinalPrice(foundProduct.basePrice);
    }
  }, [params.id]);

  useEffect(() => {
    if (!product) return;
    
    let price = product.basePrice;
    
    // Calcular modificadores de preço
    product.options?.forEach(option => {
      const selectedValue = selectedOptions[option.id];
      if (option.type === 'select' && selectedValue) {
        const choice = option.choices?.find(c => c.value === selectedValue);
        if (choice?.priceModifier) {
          price += choice.priceModifier;
        }
      }
    });
    
    setFinalPrice(price * quantity);
  }, [selectedOptions, quantity, product]);

  const handleOptionChange = (optionId: string, value: any) => {
    setSelectedOptions(prev => ({
      ...prev,
      [optionId]: value
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleAddToCart = () => {
    // Validar opções obrigatórias
    const missingOptions = product?.options?.filter(opt => 
      opt.required && !selectedOptions[opt.id]
    );

    if (missingOptions && missingOptions.length > 0) {
      alert('Por favor, preencha todas as opções obrigatórias');
      return;
    }

    // Adicionar ao carrinho (implementar contexto depois)
    const cartItem = {
      productId: product?.id,
      quantity,
      customization: selectedOptions,
      price: finalPrice,
      uploadedFile: uploadedFile?.name
    };

    // Salvar no localStorage temporariamente
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(cart));

    alert('Produto adicionado ao carrinho!');
    router.push('/carrinho');
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <p className="text-xl text-gray-600">Produto não encontrado</p>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-cyan-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Imagem do Produto */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-xl">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.new && (
                <Badge className="absolute top-4 left-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-0">
                  Novo
                </Badge>
              )}
              {product.popular && (
                <Badge className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
                  Popular
                </Badge>
              )}
            </div>

            {/* Preview da Arte Enviada */}
            {uploadedFile && (
              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-cyan-500">
                <div className="flex items-center gap-3 mb-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <p className="font-semibold text-gray-900">Arte Enviada</p>
                </div>
                <p className="text-sm text-gray-600">{uploadedFile.name}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Tamanho: {(uploadedFile.size / 1024).toFixed(2)} KB
                </p>
              </div>
            )}

            {/* Benefícios */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-md">
                <Truck className="w-6 h-6 text-cyan-600 mb-2" />
                <p className="font-semibold text-sm">Entrega Rápida</p>
                <p className="text-xs text-gray-600">A partir de 24h</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md">
                <Shield className="w-6 h-6 text-green-600 mb-2" />
                <p className="font-semibold text-sm">Qualidade Garantida</p>
                <p className="text-xs text-gray-600">100% satisfação</p>
              </div>
            </div>
          </div>

          {/* Informações e Personalização */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                {product.name}
              </h1>
              <p className="text-lg text-gray-600 mb-4">
                {product.description}
              </p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {product.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Preço */}
              <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6 border-2 border-cyan-200">
                <p className="text-sm text-gray-600 mb-1">Preço Total</p>
                <p className="text-4xl font-bold text-cyan-600">
                  R$ {finalPrice.toFixed(2)}
                </p>
                {quantity > 1 && (
                  <p className="text-sm text-gray-600 mt-2">
                    R$ {(finalPrice / quantity).toFixed(2)} por unidade
                  </p>
                )}
              </div>
            </div>

            {/* Tabs de Personalização */}
            <Tabs defaultValue="options" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="options">Opções</TabsTrigger>
                <TabsTrigger value="upload">Enviar Arte</TabsTrigger>
              </TabsList>

              <TabsContent value="options" className="space-y-6 mt-6">
                {/* Quantidade */}
                <div>
                  <Label className="text-base font-semibold mb-3 block">
                    Quantidade
                  </Label>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      -
                    </Button>
                    <Input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-20 text-center"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>

                {/* Opções do Produto */}
                {product.options?.map(option => (
                  <div key={option.id}>
                    <Label className="text-base font-semibold mb-3 block">
                      {option.name}
                      {option.required && <span className="text-red-500 ml-1">*</span>}
                    </Label>

                    {option.type === 'select' && (
                      <select
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-cyan-500 focus:outline-none transition-colors"
                        value={selectedOptions[option.id] || ''}
                        onChange={(e) => handleOptionChange(option.id, e.target.value)}
                      >
                        <option value="">Selecione uma opção</option>
                        {option.choices?.map(choice => (
                          <option key={choice.value} value={choice.value}>
                            {choice.label}
                            {choice.priceModifier && choice.priceModifier > 0 && 
                              ` (+R$ ${choice.priceModifier.toFixed(2)})`
                            }
                          </option>
                        ))}
                      </select>
                    )}

                    {option.type === 'number' && (
                      <Input
                        type="number"
                        min={option.min}
                        max={option.max}
                        value={selectedOptions[option.id] || ''}
                        onChange={(e) => handleOptionChange(option.id, e.target.value)}
                        className="w-full"
                        placeholder={`Entre ${option.min} e ${option.max}`}
                      />
                    )}
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="upload" className="space-y-6 mt-6">
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-dashed border-purple-300">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <Upload className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 mb-2">
                        Envie Sua Arte
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Formatos aceitos: PDF, AI, PSD, PNG, JPG
                      </p>
                    </div>
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf,.ai,.psd,.png,.jpg,.jpeg"
                        onChange={handleFileUpload}
                      />
                      <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                        Escolher Arquivo
                      </Button>
                    </label>
                  </div>
                </div>

                {/* Sugestão com IA */}
                <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6 border-2 border-cyan-200">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">
                        Não tem arte pronta?
                      </h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Nossa IA pode criar um design personalizado para você em minutos!
                      </p>
                      <Button variant="outline" className="border-cyan-500 text-cyan-600 hover:bg-cyan-50">
                        <Sparkles className="w-4 h-4 mr-2" />
                        Criar com IA
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Especificações Técnicas */}
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center gap-2 mb-4">
                    <Info className="w-5 h-5 text-gray-600" />
                    <h4 className="font-bold text-gray-900">Especificações Técnicas</h4>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Resolução mínima: 300 DPI</li>
                    <li>• Modo de cor: CMYK</li>
                    <li>• Sangria: 3mm em todos os lados</li>
                    <li>• Tamanho máximo: 50MB</li>
                  </ul>
                </div>
              </TabsContent>
            </Tabs>

            {/* Ações */}
            <div className="space-y-3">
              <Button 
                size="lg" 
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-lg shadow-cyan-500/30 text-lg"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Adicionar ao Carrinho
              </Button>

              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="outline" 
                  className="border-2"
                  onClick={() => setIsFavorite(!isFavorite)}
                >
                  <Heart className={`w-5 h-5 mr-2 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                  Favoritar
                </Button>
                <Button variant="outline" className="border-2">
                  <Share2 className="w-5 h-5 mr-2" />
                  Compartilhar
                </Button>
              </div>
            </div>

            {/* Recomendação IA */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border-2 border-orange-200">
              <div className="flex items-start gap-3">
                <Zap className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">
                    Recomendação Inteligente
                  </h4>
                  <p className="text-sm text-gray-600">
                    Clientes que compraram este produto também gostaram de <strong>Adesivos Personalizados</strong> e <strong>Folders</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
