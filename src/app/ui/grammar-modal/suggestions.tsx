import { CorrectionDto } from "@/app/interfaces/correction";
import { Container } from "./styles";

interface SuggestionsComponentProps {
  suggestions: CorrectionDto;
  currentIndex: number;
  suggestionsTotal: number;
  error: string;
}

export const SuggestionsComponent = ({ suggestions, error, currentIndex, suggestionsTotal }: SuggestionsComponentProps) => {
  const suggestionIndex = currentIndex + 1;
  const suggestionsToShow = suggestions.replacements.filter((_, index) => index < 4);

  return (
    <Container>
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold mb-4">Correção de erros ortográficos</h2>
        <p>{suggestionIndex}/{suggestionsTotal}</p>
      </div>
      <p>Sugestão de correção: {error}</p>
      <div className="flex justify-evenly flex-col h-48">
        {
          suggestionsToShow.map((sugestao, i) => (
            <label className="suggestion-box" key={sugestao.value + i} role="button" htmlFor={`sugestao${i}`}>{sugestao.value}
              <input type="radio" id={`sugestao${i}`} name={`sugestao${currentIndex}`} value={sugestao.value} defaultChecked={sugestao.selected} />
            </label>
          ))
        }
      </div>
    </Container>
  );
}