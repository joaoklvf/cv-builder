"use client";

import { ChangeEvent, FormEvent, KeyboardEvent, useState } from 'react';
import { useResumeContext } from '../providers/resume-provider';
import { getPhoneMask } from '../utils/masks';
import EducationComponent from './experiences/education';
import ExperienceComponent from './experiences/experiences';
import { GrammarCorrectionsModal } from './grammar-modal/modal';
import Modal from './modals/modal';
import FakeJson from '@/app/lib/fake-resume.json';
import { Experience } from '../interfaces/resume';

const onPhoneInputKeyUp = ({ key, currentTarget }: KeyboardEvent<HTMLInputElement>) => {
  if (key === "Backspace" || key === "Delete" || Number.isNaN(key)) return;
  const newPhone = getPhoneMask(currentTarget.value);
  currentTarget.value = newPhone;
};

export default function HomeComponent() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalExperienceOpen, setModalExperienceOpen] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);

  const { resume, setResume } = useResumeContext();

  const onSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormModalOpen(true);
  };

  const fakeResume = async () => {
    const fakeResume = await JSON.parse(JSON.stringify(FakeJson));
    const newResume = {
      ...fakeResume,
      education: fakeResume.education.map((x: Experience) => ({ ...x, endDate: new Date(x.endDate!), startDate: new Date(x.startDate!) })),
      experience: fakeResume.experience.map((x: Experience) => ({ ...x, endDate: new Date(x.endDate!), startDate: new Date(x.startDate!) })),
    };

    setResume(newResume);
  };

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target?.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setResume({ ...resume, picture: url }); // Armazena a URL temporária da imagem no contexto
    }
  }

  return (
    <div className="min-h-screen pb-8 bg-gradient-to-b from-slate-600 to-slate-500">
      <button type="button" onClick={fakeResume}>Teste</button>
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 border border-gray-300">
        <h1 className="text-black text-3xl font-bold text-center mb-6">Gerador de Currículos</h1>
        <form onSubmit={onSubmitForm}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-lg font-medium text-black">
              Escolha a foto (opcional)
            </label>
            <label className="block">
              <span className="sr-only">Escolha a foto (opcional)</span>
              <input
                accept="image/*"
                type="file"
                className="block w-full text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-violet-50 file:text-violet-700
                hover:file:bg-violet-100"
                onChange={handleImageChange}
              />
            </label>
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-lg font-medium text-black">
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
            <label htmlFor="occupation" className="block text-lg font-medium text-black">
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
            <label htmlFor="email" className="block text-lg font-medium text-black">
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
            <label htmlFor="phone" className="block text-lg font-medium text-black">
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
            <label htmlFor="summary" className="block text-lg font-medium text-black">
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
              <div className="flex gap-4 items-center">
                <label className="block text-lg font-medium text-black">
                  Experiência Profissional
                </label>
                <button
                  type="button"
                  className="bg-sky-500 hover:bg-sky-700 transition-transform transform hover:scale-105 rounded-full text-white px-2 py-1"
                  onClick={() => setModalExperienceOpen(x => !x)}
                >
                  Adicionar
                </button>
              </div>
              <ul>
                {resume.experience.map((x, index) => (
                  <li className="mb-4" key={index}>
                    <p>{x.startDate!.getFullYear()} - {x.endDate!.getFullYear()} | {x.company}</p>
                    <p>{x.title}</p>
                    <p>{x.description}</p>
                  </li>
                ))}
              </ul>
              <Modal
                open={modalExperienceOpen}
                setOpen={setModalExperienceOpen}
              >
                <ExperienceComponent
                  closeModal={() => setModalExperienceOpen(false)}
                />
              </Modal>
            </section>
          </div>
          <div className="mb-4">
            <section className="mb-8">
              <div className="flex gap-4 items-center">
                <label className="block text-lg font-medium text-black">
                  Formação
                </label>
                <button
                  type="button"
                  className="bg-sky-500 hover:bg-sky-700 transition-transform transform hover:scale-105 rounded-full text-white px-2 py-1"
                  onClick={() => setModalOpen(x => !x)}
                >
                  Adicionar
                </button>
              </div>
              <ul>
                {resume.education.map((x, index) => (
                  <li className="mb-4" key={index}>
                    <p>{x.startDate!.getFullYear()} - {x.endDate!.getFullYear()} | {x.company}</p>
                    <p>{x.title}</p>
                  </li>
                ))}
              </ul>
              <Modal
                open={modalOpen}
                setOpen={setModalOpen}
              >
                <EducationComponent
                  closeModal={() => setModalOpen(false)}
                />
              </Modal>
            </section>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transform hover:scale-105 transition-all duration-200 ease-in-out"
          >
            Gerar Currículo
          </button>
          <GrammarCorrectionsModal
            closeModal={() => setFormModalOpen(false)}
            isOpen={formModalOpen}
          />
        </form>
      </div>
    </div>
  );
}
