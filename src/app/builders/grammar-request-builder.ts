import { Resume } from "../interfaces/resume";

export const getGrammarTextRequest = (resume: Resume) => {
  const text = "Nome: " + resume.name + 
  ". Profissão: " + resume.occupation + 
  ". Resumo: " + resume.summary + 
  ". Experiência: " + resume.experience.map(x => x.description).join(",") +
  ". Educação: " + resume.education.map(x => x.description).join(",") + ".";

  return text;
}