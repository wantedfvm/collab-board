"use client";

import { useEffect, useState } from "react";
import { Sparkles, MousePointerClick, Share2 } from "lucide-react";

export default function TutorialOverlay() {
  const [step, setStep] = useState(0); 

  useEffect(() => {
    const seen = localStorage.getItem("collab_tutorial_seen");
    if (!seen) {
      setStep(1);
    }
  }, []);

  const finishTutorial = () => {
    localStorage.setItem("collab_tutorial_seen", "true");
    setStep(0);
  };

  if (step === 0) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center">
      
      {/* Step 1: Welcome Popup */}
      {step === 1 && (
        <div className="relative bg-white border border-zinc-200 p-10 rounded-[32px] shadow-2xl max-w-[420px] w-full text-center animate-in fade-in zoom-in duration-300 pointer-events-auto">
            <div className="w-14 h-14 bg-zinc-100 text-zinc-900 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-zinc-200">
              <Sparkles className="w-6 h-6" />
            </div>
          <h2 className="text-2xl font-extrabold text-zinc-900 mb-3 tracking-tight">Collab-Board</h2>
          <p className="text-zinc-500 text-sm mb-8 leading-relaxed font-medium px-4">
            Um ambiente de trabalho colaborativo em tempo real. Crie formas, arraste elementos e compartilhe sua tela com a equipe.
          </p>
          <button 
            onClick={() => setStep(2)}
            className="w-full bg-zinc-900 text-white font-semibold py-3.5 rounded-xl hover:bg-zinc-800 transition-colors shadow-md active:scale-[0.98]"
          >
          </button>
        </div>
      )}

      {/* Step 2: Toolbar Highlight */}
      {step === 2 && (
        <div className="absolute bottom-28 left-1/2 -translate-x-1/2 bg-white border border-zinc-200 p-6 rounded-[24px] shadow-2xl w-80 text-center animate-bounce pointer-events-auto">
          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <MousePointerClick className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-zinc-900 mb-2">Ferramentas Livres</h3>
          <p className="text-zinc-500 text-sm mb-5 leading-relaxed">
            Use a barra logo abaixo para criar formas e textos. Segure <strong>ALT</strong> e arraste o fundo para mover a câmera!
          </p>
          <button 
            onClick={() => setStep(3)}
            className="bg-blue-600 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-blue-700 transition-colors text-sm shadow-md"
          >
            Entendi
          </button>
          
          {/* Arrow pointing down to toolbar */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-white border-b border-r border-zinc-200 rotate-45" />
        </div>
      )}

      {/* Step 3: Share Highlight */}
      {step === 3 && (
        <div className="absolute top-24 right-5 bg-white border border-zinc-200 p-6 rounded-[24px] shadow-2xl w-72 text-center animate-bounce pointer-events-auto">
          <div className="w-10 h-10 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <Share2 className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-zinc-900 mb-2">Convide a Equipe</h3>
          <p className="text-zinc-500 text-sm mb-5 leading-relaxed">
            Sua sala é privada. Clique em <strong>Share</strong> logo acima para copiar o link e mande para a galera testar!
          </p>
          <button 
            onClick={finishTutorial}
            className="bg-zinc-900 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-zinc-800 transition-colors text-sm shadow-md w-full"
          >
            Começar a criar
          </button>

          {/* Arrow pointing up to Share button */}
          <div className="absolute -top-3 right-12 w-6 h-6 bg-white border-t border-l border-zinc-200 rotate-45" />
        </div>
      )}
    </div>
  );
}
