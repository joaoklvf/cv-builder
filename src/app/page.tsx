"use client";

import { FormEvent, KeyboardEvent, useState } from 'react';
import { getRevisedText } from './services/grammar-service';
import { getPhoneMask } from './utils/masks';
import Example from './ui/resume/modal-example';
import { Resume } from './interfaces/resume';
// import { cookies } from 'next/headers';
import ExperienceComponent from './ui/experiences/experiences';
import { useResumeContext } from './providers/resume-provider';
import { redirect } from 'next/navigation';
import Modal from './ui/modals/modal';
import EducationComponent from './ui/experiences/education';
import Link from 'next/link';

const getTextRevisedByForm = async (target: HTMLFormElement) => {
  const formData = Object.fromEntries(new FormData(target).entries()) as any as Resume;

  const textToCheck = `
    Nome: ${formData.name}. 
    Profissão: ${formData.occupation}. 
    Resumo: ${formData.summary}. 
    Experiência: ${formData.experience}. 
    Educação: ${formData.education}. 
    Habilidades: ${formData.skills}`;

  // cookies().set('resume', JSON.stringify(formData));

  const revisedText = await getRevisedText(textToCheck);
  return revisedText;
};

export default function Home() {
  const [revisedText, setTextoCorrigido] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalExperienceOpen, setModalExperienceOpen] = useState(false);
  const { resume, setResume } = useResumeContext();

  const onSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // const revisedText = await getTextRevisedByForm(e.currentTarget);
    // setTextoCorrigido(revisedText);

    redirect('/resume')
  }

  const onPhoneInputKeyUp = ({ key, currentTarget }: KeyboardEvent<HTMLInputElement>) => {
    if (key === "Backspace" || key === "Delete" || Number.isNaN(key))
      return;

    const newPhone = getPhoneMask(currentTarget.value);
    currentTarget.value = newPhone;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <Example />
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-black text-3xl font-bold text-center mb-6">Gerador de Currículos</h1>
        <form onSubmit={onSubmitForm}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nome Completo
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="h-10 text-black mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg p-2"
              required
              value={resume.name}
              onChange={e => setResume(rs => ({ ...rs, name: e.target.value }))}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="occupation" className="block text-sm font-medium text-gray-700">
              Profissão
            </label>
            <input
              type="text"
              name="occupation"
              id="occupation"
              className="h-10 text-black mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg p-2"
              required
              value={resume.occupation}
              onChange={e => setResume(rs => ({ ...rs, occupation: e.target.value }))}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="h-10 text-black mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg p-2"
              required
              value={resume.email}
              onChange={e => setResume(rs => ({ ...rs, email: e.target.value }))}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Telefone
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              onKeyUp={onPhoneInputKeyUp}
              className="h-10 text-black mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg p-2"
              required
              maxLength={15}
              value={resume.phone}
              onChange={e => setResume(rs => ({ ...rs, phone: e.target.value }))}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="summary" className="block text-sm font-medium text-gray-700">
              Resumo Profissional
            </label>
            <textarea
              name="summary"
              id="summary"
              rows={4}
              className="text-black text-lg mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
              required
              value={resume.summary}
              onChange={e => setResume(rs => ({ ...rs, summary: e.target.value }))}
            />
          </div>
          <div className="mb-4">
            <section className="mb-8">
              <div className='flex gap-4'>
                <h2 className="text-2xl font-bold mb-2">EXPERIÊNCIA PROFISSIONAL</h2>
                <button type='button' className='bg-sky-500 hover:bg-sky-700 transition rounded-full button text-white w-24' onClick={() => setModalExperienceOpen(x => !x)}>Adicionar</button>
              </div>
              <ul>
                {resume.experience.map((x, index) => (
                  <li className="mb-4" key={index}>
                    <strong>{x.startDate!.getFullYear()} - {x.endDate!.getFullYear()} | {x.company}</strong>
                    <p><b>{x.title}</b></p>
                    <p>{x.description}</p>
                  </li>
                ))}
              </ul>
              <Modal
                open={modalExperienceOpen}
                setOpen={setModalExperienceOpen}
                children={
                  <ExperienceComponent
                    closeModal={() => setModalExperienceOpen(false)}
                  />
                }
              />
            </section>
          </div>
          <div className="mb-4">
            <section className="mb-8">
              <div className='flex gap-4'>
                <h2 className="text-2xl font-bold mb-2">FORMAÇÃO</h2>
                <button type='button' className='bg-sky-500 hover:bg-sky-700 transition rounded-full button text-white w-24' onClick={() => setModalOpen(x => !x)}>Adicionar</button>
              </div>
              <ul>
                {resume.education.map((x, index) => (
                  <li className="mb-4" key={index}>
                    <strong>{x.startDate!.getFullYear()} - {x.endDate!.getFullYear()} | {x.company}</strong>
                    <p>{x.title}</p>
                  </li>
                ))}
              </ul>
              <Modal
                open={modalOpen}
                setOpen={setModalOpen}
                children={
                  <EducationComponent
                    closeModal={() => setModalOpen(false)}
                  />
                }
              />
            </section>
          </div>
          <div className="mb-4">
            <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
              Habilidades
            </label>
            <textarea
              name="skills"
              id="skills"
              rows={3}
              className="text-black text-lg mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
              required
              value={resume.skills}
              onChange={e => setResume(rs => ({ ...rs, skills: e.target.value }))}
            />
          </div>
          <Link
          href='/resume'
          >
            <button
              type="button"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
            >
              Gerar Currículo
            </button>
          </Link>
        </form>
        Texto Corrigido: {revisedText}
      </div>
    </div>
  );
}
