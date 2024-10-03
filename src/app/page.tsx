"use client";

import { FormEvent, KeyboardEvent, useState } from 'react';
import { getRevisedText } from './services/grammar-service';
import { getPhoneMask } from './utils/masks';
import Example from './components/modal-example';

const getTextRevisedByForm = async (target: HTMLFormElement) => {
  const formData = Object.fromEntries(new FormData(target).entries());

  const textToCheck = `
    Nome: ${formData.name}. 
    Email: ${formData.email}. 
    Telefone: ${formData.phone}. 
    Resumo: ${formData.summary}. 
    Experiência: ${formData.experience}. 
    Educação: ${formData.education}. 
    Habilidades: ${formData.skills}`;

  const revisedText = await getRevisedText(textToCheck);
  return revisedText;
};

export default function Home() {
  const [revisedText, setTextoCorrigido] = useState<string | null>(null);

  const onSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const revisedText = await getTextRevisedByForm(e.currentTarget);
    setTextoCorrigido(revisedText);
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
            />
          </div>
          <div className="mb-4">
            <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
              Experiência Profissional
            </label>
            <textarea
              name="experience"
              id="experience"
              rows={4}
              className="text-black text-lg mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="education" className="block text-sm font-medium text-gray-700">
              Educação
            </label>
            <textarea
              name="education"
              id="education"
              rows={4}
              className="text-black text-lg mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
              required
            />
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
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
          >
            Gerar Currículo
          </button>
        </form>
        Texto Corrigido: {revisedText}
      </div>
    </div>
  );
}
