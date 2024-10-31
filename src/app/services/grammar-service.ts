import { getGrammarTextRequest } from "../builders/grammar-request-builder";
import { Correction } from "../interfaces/correction";
import { Resume } from "../interfaces/resume";

export const getRevisedText = async (resume: Resume) => {
  console.log('request')
  let texto: string | null = null;
  const text = getGrammarTextRequest(resume);

  try {
    const response = await fetch('https://api.languagetoolplus.com/v2/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        text: text,
        language: 'pt-BR',
      }),
    });

    if (!response.ok) {
      console.error('Erro na API de correção:', response.statusText);
      return null;
    }

    const data = await response.json();
    const matches = data.matches as Correction[];
    return matches.filter(x => x.shortMessage === "Erro ortográfico");
  }
  catch (error) {
    console.error('Erro ao chamar a API:', error);
  }

  return texto;
}