export interface Correction {
  context: {
    text: string;
  };
  replacements: { value: string }[];
}