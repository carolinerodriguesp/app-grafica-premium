'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/custom/navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { products } from '@/lib/data';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag,
  ArrowRight,
  Sparkles,
  Tag,
  TrendingUp
} from 'lucide-react';

interface CartItem {
  productId: string;
  quantity: number;
  customization: Record<string, any>;
  price: number;
  uploadedFile?: string;
}

export default function CarrinhoPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(cart);
  }, []);

  const updateCart = (newCart: CartItem[]) => {
    setCartItems(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const removeItem = (index: number) => {
    const newCart = cartItems.filter((_, i) => i !== index);
    updateCart(newCart);
  };

  const updateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    const newCart = [...cartItems];
    const product = products.find(p => p.id === newCart[index].productId);
    if (product) {
      newCart[index].quantity = newQuantity;
      newCart[index].price = (product.basePrice * newQuantity);
      updateCart(newCart);
    }
  };

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === 'PRIMEIRA10') {
      setDiscount(0.1);
      alert('Cupom aplicado! 10% de desconto');
    } else if (couponCode.toUpperCase() === 'FIDELIDADE15') {
      setDiscount(0.15);
      alert('Cupom aplicado! 15% de desconto');
    } else {
      alert('Cupom inválido');
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const discountAmount = subtotal * discount;
  const shipping = subtotal > 200 ? 0 : 15;
  const total = subtotal - discountAmount + shipping;

  const getProductDetails = (productId: string) => {
    return products.find(p => p.id === productId);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center space-y-6">
            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
              <ShoppingBag className="w-12 h-12 text-gray-500" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Seu carrinho está vazio
              </h2>
              <p className="text-gray-600">
                Adicione produtos incríveis e comece a criar!
              </p>
            </div>
            <Button 
              size="lg"
              onClick={() => router.push('/')}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
            >
              Explorar Produtos
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Meu Carrinho
          </h1>
          <p className="text-gray-600">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'itens'} no carrinho
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Lista de Produtos */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item, index) => {
              const product = getProductDetails(item.productId);
              if (!product) return null;

              return (
                <div key={index} className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
                  <div className="flex gap-6">
                    {/* Imagem */}
                    <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Detalhes */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-bold text-lg text-gray-900 mb-1">
                            {product.name}
                          </h3>
                          {item.uploadedFile && (
                            <Badge variant="outline" className="text-xs">
                              Arte: {item.uploadedFile}
                            </Badge>
                          )}
                        </div>
                        <button
                          onClick={() => removeItem(index)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Customizações */}
                      {Object.keys(item.customization).length > 0 && (
                        <div className="mb-3">
                          <p className="text-sm text-gray-600">
                            {Object.entries(item.customization).map(([key, value]) => (
                              <span key={key} className="mr-3">
                                {key}: <strong>{value}</strong>
                              </span>
                            ))}
                          </p>
                        </div>
                      )}

                      {/* Quantidade e Preço */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(index, item.quantity - 1)}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="font-semibold w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(index, item.quantity + 1)}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>

                        <p className="text-xl font-bold text-cyan-600">
                          R$ {item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Recomendações IA */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
              <div className="flex items-start gap-3 mb-4">
                <Sparkles className="w-6 h-6 text-purple-600 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">
                    Sugestão Inteligente
                  </h3>
                  <p className="text-sm text-gray-600">
                    Baseado no seu carrinho, recomendamos adicionar <strong>Adesivos Personalizados</strong> para complementar seus produtos
                  </p>
                </div>
              </div>
              <Button variant="outline" className="border-purple-500 text-purple-600 hover:bg-purple-50">
                Ver Recomendações
              </Button>
            </div>
          </div>

          {/* Resumo do Pedido */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Resumo do Pedido
              </h2>

              {/* Cupom */}
              <div className="mb-6">
                <Label className="text-sm font-semibold mb-2 block">
                  Cupom de Desconto
                </Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Digite o cupom"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    variant="outline"
                    onClick={applyCoupon}
                    className="border-cyan-500 text-cyan-600 hover:bg-cyan-50"
                  >
                    <Tag className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Use <strong>PRIMEIRA10</strong> para 10% off
                </p>
              </div>

              {/* Valores */}
              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>R$ {subtotal.toFixed(2)}</span>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Desconto ({(discount * 100).toFixed(0)}%)</span>
                    <span>-R$ {discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-gray-600">
                  <span>Frete</span>
                  <span>
                    {shipping === 0 ? (
                      <Badge className="bg-green-500">Grátis</Badge>
                    ) : (
                      `R$ ${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>

                {subtotal < 200 && (
                  <p className="text-xs text-gray-500">
                    Falta R$ {(200 - subtotal).toFixed(2)} para frete grátis
                  </p>
                )}
              </div>

              {/* Total */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-cyan-600">
                  R$ {total.toFixed(2)}
                </span>
              </div>

              {/* Botão Finalizar */}
              <Button 
                size="lg" 
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-lg shadow-cyan-500/30 mb-3"
                onClick={() => router.push('/checkout')}
              >
                Finalizar Compra
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>

              <Button 
                variant="outline" 
                className="w-full border-2"
                onClick={() => router.push('/')}
              >
                Continuar Comprando
              </Button>

              {/* Benefícios */}
              <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  <span>Ganhe 5% de cashback nesta compra</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Sparkles className="w-5 h-5 text-purple-500" />
                  <span>Produção em até 24h úteis</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>;
}
