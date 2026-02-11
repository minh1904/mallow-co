import { MoveRight } from 'lucide-react';
import Link from 'next/link';

export const ProjectHeader = () => {
  return (
    <>
      <h3 className="mx-auto max-w-5xl pt-30 text-center font-medium text-5xl">
        We look for brand partners who want to dream big, stand out and shake
        things up.
      </h3>
      <Link
        href="/"
        className="mt-10 flex items-center justify-center gap-2 text-center font-azeret-mono text-2xl uppercase"
      >
        <p> See Project</p> <MoveRight size="20" />
      </Link>
    </>
  );
};
