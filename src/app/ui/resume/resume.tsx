"use client";

import {
  ArrowLeftCircleIcon,
  PrinterIcon
} from '@heroicons/react/24/outline';
import { useResumeContext } from '@/app/providers/resume-provider';
import { redirect } from 'next/navigation';
import { Container } from './styles';

export default function ResumeComponent() {
  const { resume } = useResumeContext();

  return (
    <Container>
      <div className="max-w-3xl mx-auto p-8">
        <div className='flex justify-between unprintable'>
          <button type="button" className='w-8' onClick={() => redirect('/')}>{<ArrowLeftCircleIcon />}</button>
          <button type="button" className='w-8' onClick={() => window.print()}>{<PrinterIcon />}</button>
        </div>

        {/* Conteúdo imprimível */}
        <div className="printable-area">
          <header className="text-center mb-12">
            {resume.picture && (
              <div className="text-center mb-4">
                <img src={resume.picture} alt="Imagem do usuário" className="absolute mx-auto rounded-full w-32 h-32 object-cover" />
              </div>
            )}
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

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-2">OBJETIVOS</h2>
            <p>{resume.summary}</p>
          </section>

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
      </div>
    </Container>
  );
}
