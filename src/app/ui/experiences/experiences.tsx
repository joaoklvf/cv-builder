import { useState } from "react";
import { Experience } from "../../interfaces/resume";
import { useResumeContext } from "../../providers/resume-provider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Container } from "./styles";
import { HOJE } from "@/app/lib/constants";

interface ExperienceComponentProps {
  closeModal: () => void
}

export default function ExperienceComponent({ closeModal }: ExperienceComponentProps) {
  const { setResume } = useResumeContext();
  const [experience, setExperience] = useState<Experience>({ company: '', description: '', title: '' });

  const addExperience = () => {
    setResume(resume => ({ ...resume, experience: [...resume.experience, experience] }));
    closeModal();
  }

  return (
    // <div className="p-6 bg-white rounded-md shadow-md max-w-lg mx-auto">
    <Container id='experience'>
      {/* Data de Início */}
      <div className="mb-4">
        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
          Data de início
        </label>
        <DatePicker
          name="startDate"
          id="startDate"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          value={experience.startDate?.toLocaleDateString('pt-BR')}
          onChange={(date) => setExperience(x => ({ ...x, startDate: date! }))}
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
          value={experience.endDate?.toLocaleDateString('pt-BR')}
          onChange={(date) => setExperience(x => ({ ...x, endDate: date! }))}
          placeholderText="DD/MM/YYYY"
          popperPlacement='bottom-start'
          minDate={experience.startDate}
          maxDate={HOJE}
        />
      </div>

      {/* Título */}
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Título
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          value={experience.title!}
          onChange={(e) => setExperience(x => ({ ...x, title: e.target.value }))}
        />
      </div>

      {/* Empresa/Instituição */}
      <div className="mb-4">
        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
          Empresa
        </label>
        <input
          type="text"
          id="company"
          name="company"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          value={experience.company!}
          onChange={(e) => setExperience(x => ({ ...x, company: e.target.value }))}
        />
      </div>

      {/* Descrição */}
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Descrição
        </label>
        <textarea
          id="description"
          name="description"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          rows={4}
          value={experience.description!}
          onChange={(e) => setExperience(x => ({ ...x, description: e.target.value }))}
        ></textarea>
      </div>
      <button type="button" onClick={addExperience} className="bg-sky-500 hover:bg-sky-700 transition rounded-full button w-full h-8 block text-sm font-medium text-white mb-1">Adicionar</button>
    </Container>
  );
}
