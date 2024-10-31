"use client";

import { useResumeContext } from '@/app/providers/resume-provider';

export default function ResumeComponent() {
  const { resume } = useResumeContext();

  return (
    <div className="max-w-3xl mx-auto p-8">
      {/* Nome e Contato */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold">{resume.name?.toUpperCase()}</h1>
        <p className="text-xl">{resume.occupation}</p>
        <div className="flex justify-center items-center mt-4">
          <p className="mr-4">
            <span role="img" aria-label="phone">📞</span> {resume.phone}
          </p>
          <p>
            <span role="img" aria-label="email">📧</span> {resume.email}
          </p>
        </div>
      </header>

      {/* Objetivos */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2">OBJETIVOS</h2>
        <p>
          {resume.summary}
        </p>
      </section>

      {/* Formação */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2">FORMAÇÃO</h2>
        <ul>
          {resume.education.map((x, index) => (
            <li className="mb-4" key={index}>
              <strong>{x.startDate!.getFullYear()} - {x.endDate!.getFullYear()} | {x.company}</strong>
              <p>{x.title}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Experiências */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2">EXPERIÊNCIAS</h2>
        <ul>
          {resume.experience.map((x, index) => (
            <li className="mb-4" key={index}>
              <strong>{x.startDate!.getFullYear()} - {x.endDate!.getFullYear()} | {x.company}</strong>
              <p>{x.title}</p>
              <p>{x.description}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
