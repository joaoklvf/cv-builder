import { Metadata } from "next";
import ResumeComponent from "../ui/resume/resume";

export const metadata: Metadata = {
  title: 'Currículo',
};

export default function ResumePage() {
  return (
    <ResumeComponent />
  );
};
