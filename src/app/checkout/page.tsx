'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/custom/navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CreditCard, 
  Truck, 
  MapPin,
  Check,
  Lock,
  Sparkles,
  ArrowLeft
} from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Dados pessoais
    name: '',
    email: '',
    phone: '',
    cpf: '',
    // Endereço
    cep: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    // Pagamento
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvv: '',
    installments: '1'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCepSearch = async () => {
    if (formData.cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${formData.cep}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setFormData(prev => ({
            ...prev,
            street: data.logradouro,
            neighborhood: data.bairro,
            city: data.localidade,
            state: data.uf
          }));
        }
      } catch (error) {
        console.error('Erro ao buscar CEP:', error);
      }
    }
  };

  const handleFinishOrder = () => {
    // Validação básica
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    // Simular processamento
    const orderId = 'PED' + Math.random().toString(36).substr(2, 9).toUpperCase();
    
    // Limpar carrinho
    localStorage.removeItem('cart');
    
    // Redirecionar para página de sucesso
    router.push(`/pedido-confirmado?id=${orderId}`);
  };

  const cart = typeof window !== 'undefined' 
    ? JSON.parse(localStorage.getItem('cart') || '[]') 
    : [];
  
  const subtotal = cart.reduce((sum: number, item: any) => sum + item.price, 0);
  const shipping = subtotal > 200 ? 0 : 15;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-cyan-600 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </button>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Finalizar Pedido
          </h1>
          <p className="text-gray-600">
            Preencha seus dados para concluir a compra
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                  step >= s 
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {step > s ? <Check className="w-5 h-5" /> : s}
                </div>
                {s < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    step > s ? 'bg-gradient-to-r from-cyan-500 to-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-16 mt-2">
            <span className={`text-sm ${step >= 1 ? 'text-cyan-600 font-semibold' : 'text-gray-500'}`}>
              Dados
            </span>
            <span className={`text-sm ${step >= 2 ? 'text-cyan-600 font-semibold' : 'text-gray-500'}`}>
              Entrega
            </span>
            <span className={`text-sm ${step >= 3 ? 'text-cyan-600 font-semibold' : 'text-gray-500'}`}>
              Pagamento
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Formulário */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-6 sm:p-8 shadow-lg border border-gray-200">
              {/* Step 1: Dados Pessoais */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Dados Pessoais
                    </h2>
                    <p className="text-gray-600">
                      Informe seus dados para identificação
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <Label>Nome Completo *</Label>
                      <Input
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Seu nome completo"
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label>E-mail *</Label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="seu@email.com"
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label>Telefone *</Label>
                      <Input
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="(00) 00000-0000"
                        className="mt-2"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <Label>CPF/CNPJ *</Label>
                      <Input
                        value={formData.cpf}
                        onChange={(e) => handleInputChange('cpf', e.target.value)}
                        placeholder="000.000.000-00"
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <Button 
                    size="lg" 
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                    onClick={() => setStep(2)}
                  >
                    Continuar para Entrega
                  </Button>
                </div>
              )}

              {/* Step 2: Endereço de Entrega */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Endereço de Entrega
                    </h2>
                    <p className="text-gray-600">
                      Onde você quer receber seu pedido?
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <Label>CEP *</Label>
                      <div className="flex gap-2 mt-2">
                        <Input
                          value={formData.cep}
                          onChange={(e) => handleInputChange('cep', e.target.value)}
                          placeholder="00000-000"
                          maxLength={8}
                          className="flex-1"
                        />
                        <Button 
                          variant="outline"
                          onClick={handleCepSearch}
                        >
                          Buscar
                        </Button>
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <Label>Endereço *</Label>
                      <Input
                        value={formData.street}
                        onChange={(e) => handleInputChange('street', e.target.value)}
                        placeholder="Rua, Avenida..."
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label>Número *</Label>
                      <Input
                        value={formData.number}
                        onChange={(e) => handleInputChange('number', e.target.value)}
                        placeholder="123"
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label>Complemento</Label>
                      <Input
                        value={formData.complement}
                        onChange={(e) => handleInputChange('complement', e.target.value)}
                        placeholder="Apto, Bloco..."
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label>Bairro *</Label>
                      <Input
                        value={formData.neighborhood}
                        onChange={(e) => handleInputChange('neighborhood', e.target.value)}
                        placeholder="Seu bairro"
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label>Cidade *</Label>
                      <Input
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        placeholder="Sua cidade"
                        className="mt-2"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <Label>Estado *</Label>
                      <Input
                        value={formData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        placeholder="UF"
                        maxLength={2}
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => setStep(1)}
                    >
                      Voltar
                    </Button>
                    <Button 
                      size="lg" 
                      className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                      onClick={() => setStep(3)}
                    >
                      Continuar para Pagamento
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Pagamento */}
              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Pagamento
                    </h2>
                    <p className="text-gray-600">
                      Escolha a forma de pagamento
                    </p>
                  </div>

                  <Tabs defaultValue="credit" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="credit">
                        <CreditCard className="w-4 h-4 mr-2" />
                        Cartão de Crédito
                      </TabsTrigger>
                      <TabsTrigger value="pix">
                        <Sparkles className="w-4 h-4 mr-2" />
                        PIX
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="credit" className="space-y-4 mt-6">
                      <div>
                        <Label>Número do Cartão *</Label>
                        <Input
                          value={formData.cardNumber}
                          onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                          placeholder="0000 0000 0000 0000"
                          maxLength={19}
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label>Nome no Cartão *</Label>
                        <Input
                          value={formData.cardName}
                          onChange={(e) => handleInputChange('cardName', e.target.value)}
                          placeholder="Como está no cartão"
                          className="mt-2"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Validade *</Label>
                          <Input
                            value={formData.cardExpiry}
                            onChange={(e) => handleInputChange('cardExpiry', e.target.value)}
                            placeholder="MM/AA"
                            maxLength={5}
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label>CVV *</Label>
                          <Input
                            value={formData.cardCvv}
                            onChange={(e) => handleInputChange('cardCvv', e.target.value)}
                            placeholder="123"
                            maxLength={4}
                            className="mt-2"
                          />
                        </div>
                      </div>

                      <div>
                        <Label>Parcelas</Label>
                        <select
                          className="w-full mt-2 px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-cyan-500 focus:outline-none"
                          value={formData.installments}
                          onChange={(e) => handleInputChange('installments', e.target.value)}
                        >
                          <option value="1">1x de R$ {total.toFixed(2)} sem juros</option>
                          <option value="2">2x de R$ {(total / 2).toFixed(2)} sem juros</option>
                          <option value="3">3x de R$ {(total / 3).toFixed(2)} sem juros</option>
                          <option value="4">4x de R$ {(total / 4).toFixed(2)} sem juros</option>
                        </select>
                      </div>
                    </TabsContent>

                    <TabsContent value="pix" className="mt-6">
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200 text-center">
                        <Sparkles className="w-12 h-12 text-green-600 mx-auto mb-4" />
                        <h3 className="font-bold text-lg text-gray-900 mb-2">
                          Pagamento via PIX
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                          Após confirmar o pedido, você receberá o QR Code para pagamento
                        </p>
                        <Badge className="bg-green-500">
                          5% de desconto no PIX
                        </Badge>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => setStep(2)}
                    >
                      Voltar
                    </Button>
                    <Button 
                      size="lg" 
                      className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                      onClick={handleFinishOrder}
                    >
                      <Lock className="w-5 h-5 mr-2" />
                      Finalizar Pedido
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Resumo */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Resumo do Pedido
              </h3>

              <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                {cart.map((item: any, index: number) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-gray-600">{item.quantity}x Produto</span>
                    <span className="font-semibold">R$ {item.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>R$ {subtotal.toFixed(2)}</span>
                </div>
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
              </div>

              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-cyan-600">
                  R$ {total.toFixed(2)}
                </span>
              </div>

              {/* Benefícios */}
              <div className="space-y-3 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>Compra 100% segura</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Truck className="w-5 h-5 text-cyan-500" />
                  <span>Entrega rápida garantida</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Sparkles className="w-5 h-5 text-purple-500" />
                  <span>Ganhe 5% de cashback</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
