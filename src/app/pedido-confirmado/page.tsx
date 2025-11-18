'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/custom/navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle2, 
  Package, 
  Truck,
  Home,
  Download,
  Share2,
  Sparkles
} from 'lucide-react';

export default function PedidoConfirmadoPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      setOrderId(id);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Success Animation */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-2xl shadow-green-500/30 animate-bounce">
            <CheckCircle2 className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Pedido Confirmado! 🎉
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Seu pedido foi recebido e já está sendo processado
          </p>

          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-50 to-blue-50 border-2 border-cyan-200">
            <Package className="w-5 h-5 text-cyan-600" />
            <span className="font-bold text-gray-900">Pedido #{orderId}</span>
          </div>
        </div>

        {/* Order Timeline */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Acompanhe seu Pedido
          </h2>

          <div className="space-y-6">
            {/* Step 1 - Confirmado */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-gray-900">Pedido Confirmado</h3>
                  <Badge className="bg-green-500">Concluído</Badge>
                </div>
                <p className="text-sm text-gray-600">
                  Seu pedido foi recebido e está sendo preparado
                </p>
                <p className="text-xs text-gray-500 mt-1">Agora mesmo</p>
              </div>
            </div>

            {/* Step 2 - Em Produção */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-gray-900">Em Produção</h3>
                  <Badge variant="outline">Próximo</Badge>
                </div>
                <p className="text-sm text-gray-600">
                  Estamos imprimindo seu produto com qualidade premium
                </p>
                <p className="text-xs text-gray-500 mt-1">Previsão: 24h</p>
              </div>
            </div>

            {/* Step 3 - Em Transporte */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                <Truck className="w-6 h-6 text-gray-500" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-gray-500">Em Transporte</h3>
                  <Badge variant="outline" className="text-gray-500">Aguardando</Badge>
                </div>
                <p className="text-sm text-gray-500">
                  Seu pedido será enviado em breve
                </p>
              </div>
            </div>

            {/* Step 4 - Entregue */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                <Home className="w-6 h-6 text-gray-500" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-gray-500">Entregue</h3>
                  <Badge variant="outline" className="text-gray-500">Aguardando</Badge>
                </div>
                <p className="text-sm text-gray-500">
                  Produto chegará no endereço informado
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Detalhes do Pedido
          </h2>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">Número do Pedido</p>
              <p className="font-bold text-gray-900">#{orderId}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Data do Pedido</p>
              <p className="font-bold text-gray-900">
                {new Date().toLocaleDateString('pt-BR')}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Forma de Pagamento</p>
              <p className="font-bold text-gray-900">Cartão de Crédito</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Previsão de Entrega</p>
              <p className="font-bold text-cyan-600">3-5 dias úteis</p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-2">
              Enviamos um e-mail de confirmação com todos os detalhes do seu pedido.
            </p>
            <p className="text-sm text-gray-600">
              Você pode acompanhar o status na área <strong>Meus Pedidos</strong>.
            </p>
          </div>
        </div>

        {/* Cashback Info */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border-2 border-purple-200 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Você Ganhou Cashback! 🎁
              </h3>
              <p className="text-gray-600 mb-4">
                Parabéns! Você acumulou <strong className="text-purple-600">R$ 15,00</strong> em cashback nesta compra.
                Use em sua próxima compra!
              </p>
              <Button 
                variant="outline" 
                className="border-purple-500 text-purple-600 hover:bg-purple-50"
              >
                Ver Meu Saldo
              </Button>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="grid sm:grid-cols-3 gap-4">
          <Button 
            size="lg"
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
            onClick={() => router.push('/meus-pedidos')}
          >
            <Package className="w-5 h-5 mr-2" />
            Meus Pedidos
          </Button>

          <Button 
            size="lg"
            variant="outline"
            className="border-2"
            onClick={() => router.push('/')}
          >
            <Home className="w-5 h-5 mr-2" />
            Voltar ao Início
          </Button>

          <Button 
            size="lg"
            variant="outline"
            className="border-2"
          >
            <Share2 className="w-5 h-5 mr-2" />
            Compartilhar
          </Button>
        </div>

        {/* Recommendations */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Continue Comprando
          </h3>
          <p className="text-gray-600 mb-6">
            Aproveite nossas ofertas especiais
          </p>
          <Button 
            size="lg"
            variant="outline"
            className="border-2 border-cyan-500 text-cyan-600 hover:bg-cyan-50"
            onClick={() => router.push('/')}
          >
            Ver Produtos
          </Button>
        </div>
      </div>
    </div>
  );
}
