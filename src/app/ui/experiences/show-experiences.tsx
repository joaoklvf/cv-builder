import { useResumeContext } from "@/app/providers/resume-provider"

export default function ShowExperiencesComponent() {
  const { resume } = useResumeContext();
  return <div>
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-2">FORMAÇÃO</h2>
      <ul>
        {resume.education.map((x, index) => (
          <li className="mb-4" key={index}>
            <strong>{x.startDate!.getFullYear()} - {x.endDate!.getFullYear()} | {x.title}</strong>
            <p>{x.description}</p>
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
}