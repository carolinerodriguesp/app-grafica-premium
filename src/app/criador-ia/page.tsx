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
  Sparkles, 
  Upload, 
  Wand2,
  Palette,
  Type,
  Image as ImageIcon,
  Download,
  Share2,
  ArrowRight,
  Check,
  Zap,
  Star
} from 'lucide-react';

export default function CriadorIAPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    productType: '',
    businessName: '',
    businessType: '',
    colors: '',
    style: '',
    description: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDesign, setGeneratedDesign] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    // Simular geração de design com IA
    setTimeout(() => {
      setGeneratedDesign('https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&h=600&fit=crop');
      setIsGenerating(false);
      setStep(3);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-200 mb-4">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-semibold text-purple-900">Powered by AI</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Criador Inteligente de Designs
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Nossa IA cria designs profissionais personalizados para seu negócio em minutos
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
                  step >= s 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {step > s ? <Check className="w-6 h-6" /> : s}
                </div>
                {s < 3 && (
                  <div className={`w-20 h-1 mx-2 ${
                    step > s ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-24 mt-3">
            <span className={`text-sm ${step >= 1 ? 'text-purple-600 font-semibold' : 'text-gray-500'}`}>
              Informações
            </span>
            <span className={`text-sm ${step >= 2 ? 'text-purple-600 font-semibold' : 'text-gray-500'}`}>
              Geração
            </span>
            <span className={`text-sm ${step >= 3 ? 'text-purple-600 font-semibold' : 'text-gray-500'}`}>
              Resultado
            </span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Step 1: Informações */}
          {step === 1 && (
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Conte-nos sobre seu negócio
                </h2>
                <p className="text-gray-600">
                  Quanto mais detalhes, melhor será o resultado
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <Label className="text-base font-semibold mb-3 block">
                    Tipo de Produto *
                  </Label>
                  <select
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-purple-500 focus:outline-none"
                    value={formData.productType}
                    onChange={(e) => setFormData({...formData, productType: e.target.value})}
                  >
                    <option value="">Selecione o produto</option>
                    <option value="cartao">Cartão de Visita</option>
                    <option value="logo">Logo</option>
                    <option value="banner">Banner</option>
                    <option value="folder">Folder</option>
                    <option value="adesivo">Adesivo</option>
                  </select>
                </div>

                <div>
                  <Label className="text-base font-semibold mb-3 block">
                    Nome do Negócio *
                  </Label>
                  <Input
                    placeholder="Ex: Padrão Color Gráfica"
                    value={formData.businessName}
                    onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                    className="text-base"
                  />
                </div>

                <div>
                  <Label className="text-base font-semibold mb-3 block">
                    Tipo de Negócio *
                  </Label>
                  <Input
                    placeholder="Ex: Gráfica, Restaurante, Loja de Roupas..."
                    value={formData.businessType}
                    onChange={(e) => setFormData({...formData, businessType: e.target.value})}
                    className="text-base"
                  />
                </div>

                <div>
                  <Label className="text-base font-semibold mb-3 block">
                    Cores Preferidas
                  </Label>
                  <Input
                    placeholder="Ex: Azul, Verde, Vermelho..."
                    value={formData.colors}
                    onChange={(e) => setFormData({...formData, colors: e.target.value})}
                    className="text-base"
                  />
                </div>

                <div>
                  <Label className="text-base font-semibold mb-3 block">
                    Estilo Desejado
                  </Label>
                  <select
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-purple-500 focus:outline-none"
                    value={formData.style}
                    onChange={(e) => setFormData({...formData, style: e.target.value})}
                  >
                    <option value="">Selecione o estilo</option>
                    <option value="moderno">Moderno e Minimalista</option>
                    <option value="elegante">Elegante e Sofisticado</option>
                    <option value="divertido">Divertido e Colorido</option>
                    <option value="profissional">Profissional e Corporativo</option>
                    <option value="criativo">Criativo e Artístico</option>
                  </select>
                </div>

                <div>
                  <Label className="text-base font-semibold mb-3 block">
                    Descrição Adicional
                  </Label>
                  <textarea
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-purple-500 focus:outline-none min-h-[120px]"
                    placeholder="Descreva qualquer detalhe específico que gostaria no design..."
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </div>
              </div>

              <Button 
                size="lg" 
                className="w-full mt-8 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg"
                onClick={() => setStep(2)}
                disabled={!formData.productType || !formData.businessName || !formData.businessType}
              >
                Continuar
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          )}

          {/* Step 2: Geração */}
          {step === 2 && (
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Pronto para criar?
                </h2>
                <p className="text-gray-600">
                  Nossa IA vai analisar suas informações e criar um design único
                </p>
              </div>

              {/* Resumo */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200 mb-8">
                <h3 className="font-bold text-gray-900 mb-4">Resumo do Projeto</h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Produto:</strong> {formData.productType}</p>
                  <p><strong>Negócio:</strong> {formData.businessName}</p>
                  <p><strong>Tipo:</strong> {formData.businessType}</p>
                  {formData.colors && <p><strong>Cores:</strong> {formData.colors}</p>}
                  {formData.style && <p><strong>Estilo:</strong> {formData.style}</p>}
                </div>
              </div>

              {/* Features */}
              <div className="grid sm:grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 rounded-lg bg-gray-50">
                  <Zap className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-gray-900">Rápido</p>
                  <p className="text-xs text-gray-600">Em segundos</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-gray-50">
                  <Star className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-gray-900">Profissional</p>
                  <p className="text-xs text-gray-600">Qualidade premium</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-gray-50">
                  <Wand2 className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-gray-900">Único</p>
                  <p className="text-xs text-gray-600">100% personalizado</p>
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
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  onClick={handleGenerate}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                      Gerando...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-5 h-5 mr-2" />
                      Gerar Design
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Resultado */}
          {step === 3 && generatedDesign && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg animate-bounce">
                    <Check className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Design Criado com Sucesso! 🎉
                  </h2>
                  <p className="text-gray-600">
                    Seu design personalizado está pronto
                  </p>
                </div>

                {/* Design Preview */}
                <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100 mb-6">
                  <img 
                    src={generatedDesign} 
                    alt="Design gerado"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Actions */}
                <div className="grid sm:grid-cols-3 gap-3">
                  <Button 
                    variant="outline"
                    className="border-2"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Baixar
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-2"
                  >
                    <Share2 className="w-5 h-5 mr-2" />
                    Compartilhar
                  </Button>
                  <Button 
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                    onClick={() => router.push('/carrinho')}
                  >
                    Usar no Pedido
                  </Button>
                </div>
              </div>

              {/* Variations */}
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Gostou? Crie Mais Variações
                </h3>
                <p className="text-gray-600 mb-6">
                  Nossa IA pode criar designs diferentes mantendo o mesmo estilo
                </p>
                <Button 
                  variant="outline"
                  className="border-2 border-purple-500 text-purple-600 hover:bg-purple-50"
                  onClick={() => setStep(2)}
                >
                  <Wand2 className="w-5 h-5 mr-2" />
                  Gerar Nova Variação
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
