import { projects } from '@/features/home/constants/constant';
import { ProjectItem } from './ProjectItem';

export const ProjectMain = () => {
  return (
    <div>
      <ProjectItem data={projects} />
    </div>
  );
};
