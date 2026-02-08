export interface PhysicsItem {
  id: string | number;
  label?: string;
  src?: string;
  type: 'button' | 'photo';
  className?: string;
  dropX?: number;
  dropY?: number;
}
