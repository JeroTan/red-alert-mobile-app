export type ResponderStatus = 'available' | 'en-route' | 'on-scene';

export interface Incident {
  id: string;
  type: 'police' | 'ambulance' | 'fire';
  location: string;
  landmark?: string;
  reporter: string;
  phone: string;
  description: string;
  distance: number;
  timestamp: string;
}
