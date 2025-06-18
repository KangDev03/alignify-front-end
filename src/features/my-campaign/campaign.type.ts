export interface Campaign {
  id: string;
  title: string;
  description: string;
  brand: string;
  brandAvatar: string;
  budget: string;
  goals: string[];
  status: "PENDING" | "IN PROGRESS" | "COMPLETED";
  createdDate: string; // ISO date string
  startDate: string; // ISO date string
  endDate: string;   // ISO date string
  category: string[];
  deliverables: string[];
  requirements: string[];
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
}