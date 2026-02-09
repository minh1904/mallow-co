import { ProjectHeader } from './components/ProjectHeader';
import { ProjectMain } from './components/ProjectMain';

export const ProjectSection = () => {
  return (
    <section className="w-full space-y-5 p-10">
      <ProjectHeader />
      <ProjectMain />
    </section>
  );
};
