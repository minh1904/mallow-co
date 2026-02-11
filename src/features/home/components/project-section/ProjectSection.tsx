import { ProjectHeader } from './ProjectHeader';
import { ProjectMain } from './ProjectMain';

export const ProjectSection = () => {
  return (
    <section className="w-full space-y-5 p-10">
      <ProjectHeader />
      <ProjectMain />
    </section>
  );
};
