export interface Correction {
  context: {
    text: string;
    offset: number;
    length: number;
  };
  replacements: { value: string }[];
  sentence: string;
}