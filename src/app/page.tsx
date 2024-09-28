"use client";

import { ChangeEvent, FormEvent, useState } from 'react';
import { Correction } from './interfaces/correction';
import axios from 'axios';

export default function Home() {
  const [corrections, setCorrections] = useState<Correction[] | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    summary: '',
    experience: '',
    education: '',
    skills: '',
  });  

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const textToCheck = `
    Nome: ${formData.name}
    Email: ${formData.email}
    Telefone: ${formData.phone}
    Resumo: ${formData.summary}
    Experiência: ${formData.experience}
    Educação: ${formData.education}
    Habilidades: ${formData.skills}
  `;

  try {
    const apiKey = process.env.API_KEY;
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: `Corrija e melhore o seguinte texto: ${textToCheck}` }],
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    const suggestions = response.data.choices[0].message.content;
    console.log('Sugestões:', suggestions);
    // Aqui você pode armazenar e exibir as sugestões
  } catch (error) {
    console.error('Erro ao chamar a API:', error);
  }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-black text-3xl font-bold text-center mb-6">Gerador de Currículos</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nome Completo
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="h-10 text-black mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
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
              value={formData.email}
              onChange={handleChange}
              className="h-10 text-black mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
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
              value={formData.phone}
              onChange={handleChange}
              className="h-10 text-black mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
              required
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
              value={formData.summary}
              onChange={handleChange}
              className="text-black text-lg mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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
              value={formData.experience}
              onChange={handleChange}
              className="text-black text-lg mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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
              value={formData.education}
              onChange={handleChange}
              className="text-black text-lg mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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
              value={formData.skills}
              onChange={handleChange}
              className="text-black text-lg mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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

        {corrections && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Correções Sugeridas:</h2>
            <ul className="list-disc pl-5">
              {corrections.map((match, index) => (
                <li key={index}>
                  <strong>Erro:</strong> {match.context.text}<br />
                  <strong>Sugestão:</strong> {match.replacements.map(rep => rep.value).join(', ')}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
