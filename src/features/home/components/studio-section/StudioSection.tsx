import { MoveRight } from 'lucide-react';
import Link from 'next/link';

export const StudioSection = () => {
  return (
    <>
      <h3 className="mx-auto max-w-5xl pt-30 text-center font-medium text-5xl">
        We specialise in design, strategy, campaigns and digital experiences
        that make people look, think and act. Where others zig, Wildish & Co.
        zags.
      </h3>
      <Link
        href="/"
        className="mt-10 flex items-center justify-center gap-2 text-center font-azeret-mono text-2xl uppercase"
      >
        <p>ABOUT THE STUDIO</p> <MoveRight size="20" />
      </Link>
    </>
  );
};
