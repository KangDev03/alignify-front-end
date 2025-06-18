export interface Application {
  id: string;
  title: string;
  brand: string;
  brandAvatar: string;
  description: string;
  budget: string;
  status: string;
  appliedDate: string; // ISO date string
  // expectedResponse: string; // ISO date string
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  category: string[];
  requirements: string[];
  deliverables: string[];
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
}
