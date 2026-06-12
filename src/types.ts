export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  benefits: string[];
}

export interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  date: string;
  avatarUrl: string;
  projectPhotoUrl?: string;
  projectType?: string;
  verified: boolean;
}

export interface Project {
  id: string;
  title: string;
  type: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  location: string;
  completedDate: string;
  specs: {
    duration: string;
    warranty: string;
    material: string;
  };
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface ServiceArea {
  city: string;
  state: string;
  slug: string;
  zipCodes: string[];
}
