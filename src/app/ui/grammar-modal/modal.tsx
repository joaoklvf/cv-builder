'use client'

import { useResumeContext } from "@/app/providers/resume-provider";
import { getRevisedText } from "@/app/services/grammar-service";
import { Container } from "./styles";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { CorrectionDto } from "@/app/interfaces/correction";
import { SuggestionsComponent } from "./suggestions";
import { Experience } from "@/app/interfaces/resume";

interface GrammarCorrectionsModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

export const GrammarCorrectionsModal = ({ closeModal, isOpen }: GrammarCorrectionsModalProps) => {
  const { resume, setResume } = useResumeContext();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [grammarCorrections, setGrammarCorrections] = useState<CorrectionDto[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getGrammars = async () => {
      setLoading(true);
      const corrections = await getRevisedText(resume);

      if (corrections)
        setGrammarCorrections(corrections.map(x => ({ ...x, replacements: x.replacements.map(y => ({ ...y, selected: false })) })));

      else
        redirect('/resume')

      setLoading(false);
    };

    if (isOpen && !grammarCorrections)
      getGrammars();

  }, [resume, isOpen]);

  if (!isOpen) return <></>;

  if (loading || !grammarCorrections) {
    return (
      <Container>
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md w-96 max-h-full overflow-auto">
            <span className="loader"></span>
          </div>
        </div>
      </Container>
    );
  }

  const currentGrammar = grammarCorrections[currentIndex];
  const indexFinal = currentGrammar.context.offset + currentGrammar.context.length;
  const elementoParaCorrigir = currentGrammar.context.text.substring(currentGrammar.context.offset, indexFinal);
  const isLastElement = currentIndex === grammarCorrections.length - 1;
  const saveButtonLabel = isLastElement ? 'Salvar' : 'Próximo';

  const saveCorrectionSelected = () => {
    const sugestaoAceita = (document.querySelector(`input[name="sugestao${currentIndex}"]:checked`) as HTMLInputElement)?.value;
    const newGrammars = grammarCorrections.map((x, index) => {
      if (index === currentIndex)
        x.replacements = x.replacements.map(y => {
          y.selected = sugestaoAceita === y.value;
          return y;
        });

      return x;
    });

    setGrammarCorrections(newGrammars);
  }

  const onPreviousButtonClick = () => {
    saveCorrectionSelected();
    setCurrentIndex(ix => ix - 1);
  }

  const onSaveClick = async () => {
    saveCorrectionSelected();

    if (!isLastElement) {
      setCurrentIndex(ix => ix + 1);
      return;
    }

    let jsonText = JSON.stringify(resume);
    grammarCorrections.forEach(x => {
      x.replacements.forEach(y => {
        if (y.selected) {
          const ii = x.context.offset + x.context.length;
          const ec = x.context.text.substring(x.context.offset, ii);
          jsonText = jsonText.replace(ec, y.value);
        }
      })
    });
    const parsedResume = await JSON.parse(jsonText);
    const newResume = {
      ...parsedResume,
      education: parsedResume.education.map((x: Experience) => ({ ...x, endDate: new Date(x.endDate!), startDate: new Date(x.startDate!) })),
      experience: parsedResume.experience.map((x: Experience) => ({ ...x, endDate: new Date(x.endDate!), startDate: new Date(x.startDate!) })),
    };

    setLoading(true);
    setResume(newResume);
    redirect('/resume')
  };

  return (
    <Container>
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-md w-96 max-h-full overflow-auto">
          <div onClick={closeModal} role='button' className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 8L8 16M8 8L16 16" stroke="#FF0000" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <SuggestionsComponent
            currentIndex={currentIndex}
            error={elementoParaCorrigir}
            suggestions={currentGrammar}
            suggestionsTotal={grammarCorrections.length}
          />
          <div className="mt-4 flex justify-between">
            <button type="button" onClick={onPreviousButtonClick}>Anterior</button>
            <button type="button" onClick={onSaveClick}>{saveButtonLabel}</button>
          </div>
        </div>
      </div>
    </Container>
  );
}
