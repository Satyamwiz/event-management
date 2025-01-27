export interface Event {
  id: string;
  name: string;
  description: string;
  organizingBody: string;
  facultyInCharge: string;
  facultyMembers: string[];
  targetAudience: string[];
  department: string;
  venue: string;
  capacity: number;
  registrationDeadline: string;
  startDate: string;
  endDate: string;
  bannerUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEventData {
  name: string;
  description: string;
  organizingBody: string;
  facultyInCharge: string;
  facultyMembers: string[];
  targetAudience: string[];
  department: string;
  venue: string;
  capacity: number;
  registrationDeadline: string;
  startDate: string;
  endDate: string;
  bannerUrl?: string;
}