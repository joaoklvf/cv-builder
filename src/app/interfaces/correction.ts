export interface Correction {
  context: {
    text: string;
    offset: number;
    length: number;
  };
  shortMessage: string;
  replacements: { value: string }[];
  sentence: string;
}

export interface CorrectionDto extends Correction {
  replacements: {
    value: string;
    selected: boolean;
  }[];
}
