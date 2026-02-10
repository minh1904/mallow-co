export interface PhysicsItem {
  id: string | number;
  label?: string;
  src?: string;
  type: 'button' | 'photo';
  className?: string;
  dropX?: number;
  dropY?: number;
}

export type ProjectTag =
  | 'Branding'
  | 'Architecture'
  | 'Digital Product'
  | 'SaaS'
  | 'Food & Beverage'
  | 'Finance'
  | 'Campaign'
  | 'Digital'
  | 'E-commerce'
  | 'Development Tool'
  | 'AI'
  | 'Real Estate'
  | 'Interactive'
  | 'Experimental'
  | 'Animation'
  | 'Art'
  | 'Web Design';

export interface Project {
  id: number | string;
  title: string;
  description: string;
  tags: {
    id: number | string;
    label: ProjectTag;
    dropX: number;
    dropY: number;
  }[];
  image: string;
  hoverImage: string;
  link?: string;
}
