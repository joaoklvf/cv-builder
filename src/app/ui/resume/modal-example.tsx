import { useState, useRef, useEffect } from 'react';


const TextWithCorrection = ({ suggestions }: any) => {
  const [currentSuggestionIndex, setCurrentSuggestionIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const textRef = useRef<HTMLSpanElement>(null);

  const currentSuggestion = suggestions[currentSuggestionIndex];

  // Função para calcular a posição do modal
  const calculateModalPosition = () => {
    if (textRef.current) {
      const rect = textRef.current.getBoundingClientRect();
      setModalPosition({
        top: rect.top + window.scrollY + 20, // posição abaixo do texto
        left: rect.left + window.scrollX, // alinhado à esquerda
      });
    }
  };

  useEffect(() => {
    if (currentSuggestion) {
      calculateModalPosition();
    }
  }, [currentSuggestionIndex]);

  const handleNextSuggestion = () => {
    setCurrentSuggestionIndex((prev) =>
      prev < suggestions.length - 1 ? prev + 1 : prev
    );
  };

  const handlePreviousSuggestion = () => {
    setCurrentSuggestionIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const acceptSuggestion = () => {
    // Lógica para aceitar a sugestão
    console.log('Sugestão aceita:', currentSuggestion);
  };

  const rejectSuggestion = () => {
    // Lógica para rejeitar a sugestão
    console.log('Sugestão rejeitada:', currentSuggestion);
  };

  return (
    <div className="relative">
      <span
        ref={textRef}
        onClick={() => setShowModal(true)}
        className="cursor-pointer underline text-red-500"
      >
        {currentSuggestion ? currentSuggestion.text : 'Texto com erro'}
      </span>

      {showModal && (
        <div
          className="absolute bg-white shadow-lg p-4 rounded-md border border-gray-300"
          style={{ top: modalPosition.top, left: modalPosition.left }}
        >
          <p className="text-sm">{currentSuggestion.suggestion}</p>
          <div className="flex justify-between mt-2">
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
              onClick={acceptSuggestion}
            >
              Aceitar
            </button>
            <button
              className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-700"
              onClick={rejectSuggestion}
            >
              Rejeitar
            </button>
          </div>
          <div className="flex justify-between mt-2">
            <button
              className="text-blue-500 hover:underline"
              onClick={handlePreviousSuggestion}
            >
              ← Anterior
            </button>
            <button
              className="text-blue-500 hover:underline"
              onClick={handleNextSuggestion}
            >
              Próximo →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Exemplo de como usar este componente
const Example = () => {
  const exampleSuggestions = [
    { text: 'erro 1', suggestion: 'correção 1' },
    { text: 'erro 2', suggestion: 'correção 2' },
    { text: 'erro 3', suggestion: 'correção 3' },
  ];

  return (
    <div className="p-6">
      <TextWithCorrection suggestions={exampleSuggestions} />
    </div>
  );
};

export default Example;
