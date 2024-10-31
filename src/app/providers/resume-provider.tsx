'use client'

import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react'
import { Resume } from '../interfaces/resume';

interface ResumeContextProps{
  resume: Resume,
  setResume: Dispatch<SetStateAction<Resume>>
}

export const ResumeContext = createContext({} as ResumeContextProps)

export default function ResumeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [resume, setResume] = useState<Resume>({
    education: [],
    email: '',
    experience: [],
    name: '',
    occupation: '',
    phone: '',
    skills: '',
    summary: '',
    picture: null
  });

  return (
    <ResumeContext.Provider value={{
      resume,
      setResume
    }}>
      {children}
    </ResumeContext.Provider>
  );
}

export const useResumeContext = () => useContext(ResumeContext);