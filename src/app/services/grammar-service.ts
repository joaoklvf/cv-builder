import { Correction } from "../interfaces/correction";

export const getRevisedText = async (text: string) => {
  let texto: string | null = null;

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

    texto = text;
    matches.forEach(({ context, replacements }) => {
      const indexFinal = context.offset + context.length;
      const elementoParaCorrigir = context.text.substring(context.offset, indexFinal);
      texto = texto!.replace(elementoParaCorrigir, replacements[0].value);
    });
  }
  catch (error) {
    console.error('Erro ao chamar a API:', error);
  }

  return texto;
}