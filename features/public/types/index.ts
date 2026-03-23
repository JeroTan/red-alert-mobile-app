export type PublicStep = 'sos' | 'select-type' | 'report-form' | 'tracking' | 'resolved';
export type EmergencyType = 'police' | 'ambulance' | 'fire';

export interface EmergencyReport {
  type: EmergencyType;
  location: string;
  photo?: string;
  description?: string;
}
