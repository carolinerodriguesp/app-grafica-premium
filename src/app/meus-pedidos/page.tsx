'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/custom/navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Package, 
  Clock,
  CheckCircle2,
  Truck,
  Eye,
  Download,
  Star,
  TrendingUp,
  Heart,
  Settings,
  LogOut,
  User,
  MapPin,
  CreditCard,
  Bell,
  Sparkles,
  Gift
} from 'lucide-react';

// Mock data de pedidos
const mockOrders = [
  {
    id: 'PED001',
    date: '2025-01-15',
    status: 'delivered',
    total: 289.90,
    items: 3,
    trackingCode: 'BR123456789'
  },
  {
    id: 'PED002',
    date: '2025-01-20',
    status: 'shipping',
    total: 156.50,
    items: 2,
    trackingCode: 'BR987654321'
  },
  {
    id: 'PED003',
    date: '2025-01-22',
    status: 'processing',
    total: 445.00,
    items: 5,
    trackingCode: null
  }
];

const statusConfig = {
  pending: { label: 'Pendente', color: 'bg-yellow-500', icon: Clock },
  processing: { label: 'Em Produção', color: 'bg-blue-500', icon: Package },
  shipping: { label: 'Em Transporte', color: 'bg-purple-500', icon: Truck },
  delivered: { label: 'Entregue', color: 'bg-green-500', icon: CheckCircle2 }
};

export default function MeusPedidosPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('pedidos');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Minha Conta
          </h1>
          <p className="text-gray-600">
            Gerencie seus pedidos, dados e preferências
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 sticky top-24">
              {/* User Info */}
              <div className="text-center mb-6 pb-6 border-b border-gray-200">
                <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                  <User className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">João Silva</h3>
                <p className="text-sm text-gray-600">joao@email.com</p>
                
                {/* Loyalty Points */}
                <div className="mt-4 p-3 rounded-lg bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Sparkles className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-semibold text-gray-900">Cashback</span>
                  </div>
                  <p className="text-2xl font-bold text-purple-600">R$ 45,00</p>
                </div>
              </div>

              {/* Menu */}
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('pedidos')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'pedidos'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Package className="w-5 h-5" />
                  <span className="font-medium">Meus Pedidos</span>
                </button>

                <button
                  onClick={() => setActiveTab('favoritos')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'favoritos'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Heart className="w-5 h-5" />
                  <span className="font-medium">Favoritos</span>
                </button>

                <button
                  onClick={() => setActiveTab('dados')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'dados'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Settings className="w-5 h-5" />
                  <span className="font-medium">Meus Dados</span>
                </button>

                <button
                  onClick={() => setActiveTab('enderecos')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'enderecos'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <MapPin className="w-5 h-5" />
                  <span className="font-medium">Endereços</span>
                </button>

                <button
                  onClick={() => setActiveTab('pagamento')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'pagamento'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  <span className="font-medium">Pagamento</span>
                </button>

                <button
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Sair</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {/* Meus Pedidos */}
            {activeTab === 'pedidos' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Meus Pedidos
                  </h2>
                  <Badge className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-0">
                    {mockOrders.length} pedidos
                  </Badge>
                </div>

                {mockOrders.map((order) => {
                  const StatusIcon = statusConfig[order.status as keyof typeof statusConfig].icon;
                  
                  return (
                    <div key={order.id} className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-bold text-lg text-gray-900 mb-1">
                            Pedido #{order.id}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {new Date(order.date).toLocaleDateString('pt-BR')} • {order.items} itens
                          </p>
                        </div>
                        <Badge className={`${statusConfig[order.status as keyof typeof statusConfig].color} text-white border-0`}>
                          <StatusIcon className="w-4 h-4 mr-1" />
                          {statusConfig[order.status as keyof typeof statusConfig].label}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Valor Total</p>
                          <p className="text-2xl font-bold text-cyan-600">
                            R$ {order.total.toFixed(2)}
                          </p>
                        </div>

                        <div className="flex gap-2">
                          {order.trackingCode && (
                            <Button variant="outline" className="border-2">
                              <Truck className="w-4 h-4 mr-2" />
                              Rastrear
                            </Button>
                          )}
                          <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
                            <Eye className="w-4 h-4 mr-2" />
                            Ver Detalhes
                          </Button>
                        </div>
                      </div>

                      {order.status === 'delivered' && (
                        <div className="mt-4 p-4 rounded-lg bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200">
                          <div className="flex items-center gap-3">
                            <Star className="w-5 h-5 text-yellow-600" />
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-gray-900">
                                Avalie este pedido
                              </p>
                              <p className="text-xs text-gray-600">
                                Sua opinião nos ajuda a melhorar
                              </p>
                            </div>
                            <Button size="sm" variant="outline" className="border-yellow-500 text-yellow-600 hover:bg-yellow-50">
                              Avaliar
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Favoritos */}
            {activeTab === 'favoritos' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Produtos Favoritos
                </h2>
                <div className="bg-white rounded-xl p-12 shadow-lg border border-gray-200 text-center">
                  <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Nenhum favorito ainda
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Adicione produtos aos favoritos para acessá-los rapidamente
                  </p>
                  <Button 
                    onClick={() => router.push('/')}
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                  >
                    Explorar Produtos
                  </Button>
                </div>
              </div>
            )}

            {/* Meus Dados */}
            {activeTab === 'dados' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Meus Dados
                </h2>
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-2 block">
                        Nome Completo
                      </label>
                      <input
                        type="text"
                        defaultValue="João Silva"
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-cyan-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-2 block">
                        E-mail
                      </label>
                      <input
                        type="email"
                        defaultValue="joao@email.com"
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-cyan-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-2 block">
                        Telefone
                      </label>
                      <input
                        type="tel"
                        defaultValue="(11) 99999-9999"
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-cyan-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-2 block">
                        CPF
                      </label>
                      <input
                        type="text"
                        defaultValue="123.456.789-00"
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-cyan-500 focus:outline-none"
                      />
                    </div>
                  </div>
                  <Button className="mt-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
                    Salvar Alterações
                  </Button>
                </div>

                {/* Programa de Fidelidade */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                      <Gift className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Programa de Fidelidade
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Você tem <strong className="text-purple-600">R$ 45,00</strong> em cashback disponível.
                        Continue comprando e acumule mais!
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="flex-1 bg-white rounded-full h-3 overflow-hidden">
                          <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-full" style={{ width: '65%' }} />
                        </div>
                        <span className="text-sm font-semibold text-purple-600">65%</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        Faltam R$ 155,00 para o próximo nível
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Endereços */}
            {activeTab === 'enderecos' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Meus Endereços
                  </h2>
                  <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
                    Adicionar Endereço
                  </Button>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-cyan-600 mt-1" />
                      <div>
                        <Badge className="mb-2 bg-green-500">Principal</Badge>
                        <p className="font-bold text-gray-900 mb-1">Casa</p>
                        <p className="text-sm text-gray-600">
                          Rua Exemplo, 123 - Apto 45<br />
                          Bairro Centro - São Paulo, SP<br />
                          CEP: 01234-567
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Pagamento */}
            {activeTab === 'pagamento' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Formas de Pagamento
                  </h2>
                  <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
                    Adicionar Cartão
                  </Button>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">•••• •••• •••• 1234</p>
                        <p className="text-sm text-gray-600">Visa - Válido até 12/26</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Remover
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
