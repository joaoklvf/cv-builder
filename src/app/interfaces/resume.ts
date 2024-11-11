export interface Resume {
  name: string,
  email: string,
  phone: string,
  summary: string,
  experience: Experience[],
  education: Experience[],
  skills: string,
  occupation: string,
  picture: string | null
}

export interface Experience {
  startDate?: Date;
  endDate?: Date;
  title: string;
  description: string;
  company: string;
  id: number;
}