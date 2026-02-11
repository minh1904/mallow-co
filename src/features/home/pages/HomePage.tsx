import {
  BlogSection,
  BrandSection,
  ButtonSection,
  HeroSection,
  ProcessSection,
  ProjectSection,
  StudioSection,
} from '../components';

const HomePage = () => {
  return (
    <div className="space-y-10 overflow-x-hidden">
      <HeroSection />
      <ProjectSection />
      <ButtonSection />
      <StudioSection />
      <BrandSection />
      <ProcessSection />
      <BlogSection />
    </div>
  );
};

export default HomePage;
