import { ProcessItem } from './ProcessItem';

export const ProcessSection = () => {
  return (
    <div>
      {Array.from({ length: 3 }).map((_, index) => (
        <ProcessItem key={index} />
      ))}
    </div>
  );
};
