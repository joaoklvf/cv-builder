import { cookies } from "next/headers";
import { FormEvent, useState } from "react";
import { Experience, Resume } from "../../interfaces/resume";
import { useResumeContext } from "../../providers/resume-provider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Container } from "./styles";
import { HOJE } from "@/app/lib/constants";

interface EducationComponentProps {
  closeModal: () => void
}

export default function EducationComponent({ closeModal }: EducationComponentProps) {
  const { setResume } = useResumeContext();
  const [education, setEducation] = useState<Experience>({ company: '', description: '', title: '' });

  const addEducation = () => {
    setResume(resume => ({ ...resume, education: [...resume.education, education] }));
    closeModal();
  }

  return (
    // <div className="p-6 bg-white rounded-md shadow-md max-w-lg mx-auto">
    <Container id='education'>
      {/* Data de Início */}
      <div className="mb-4">
        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
          Data de início
        </label>
        <DatePicker
          name="startDate"
          id="startDate"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          value={education.startDate?.toLocaleDateString('pt-BR')}
          onChange={(date) => setEducation(x => ({ ...x, startDate: date! }))}
          placeholderText="DD/MM/YYYY"
          popperPlacement='bottom-start'
          maxDate={HOJE}
        />
      </div>

      {/* Data de Término */}
      <div className="mb-4">
        <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
          Data de término
        </label>
        <DatePicker
          name="endDate"
          id="endDate"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          value={education.endDate?.toLocaleDateString('pt-BR')}
          onChange={(date) => setEducation(x => ({ ...x, endDate: date! }))}
          placeholderText="DD/MM/YYYY"
          popperPlacement='bottom-start'
          minDate={education.startDate}
          maxDate={HOJE}
        />
      </div>

      {/* Título */}
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Curso
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          value={education.title!}
          onChange={(e) => setEducation(x => ({ ...x, title: e.target.value }))}
        />
      </div>

      {/* Empresa/Instituição */}
      <div className="mb-4">
        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
          Instituição
        </label>
        <input
          type="text"
          id="company"
          name="company"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          value={education.company!}
          onChange={(e) => setEducation(x => ({ ...x, company: e.target.value }))}
        />
      </div>
      <button type="button" onClick={addEducation} className="bg-sky-500 hover:bg-sky-700 transition rounded-full button w-full h-8 block text-sm font-medium text-white mb-1">Adicionar</button>
    </Container>
  );
}
