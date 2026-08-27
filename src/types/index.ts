export type EnquiryStatus = 'New' | 'Contacted' | 'In Progress' | 'Quoted' | 'Converted' | 'Closed';

export type SolarCapacityOption = '1 KW' | '2 KW' | '3 KW' | '5 KW' | '10 KW+' | 'Not sure';

export interface SolarEnquiry {
  id: string;
  name: string;
  mobile: string;
  district: string;
  city: string;
  pinCode: string;
  capacity: SolarCapacityOption;
  message?: string;
  createdAt: string;
  status: EnquiryStatus;
  adminNotes?: string;
}

export interface SolarCapacityPlan {
  id: string;
  capacity: SolarCapacityOption;
  numericKw: number;
  title: string;
  subtitle: string;
  dailyGeneration: string;
  idealFor: string;
  roofAreaSqFt: string;
  applianceSupport: string[];
  keyBenefits: string[];
  isPopular?: boolean;
}

export interface ServiceDetail {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  icon: string;
  image: string;
  defaultCapacity: SolarCapacityOption;
}

export interface GalleryProject {
  id: string;
  title: string;
  category: 'residential' | 'commercial' | 'rooftop' | 'inverter' | 'before_after';
  location: string;
  capacityTag: string;
  imageUrl: string;
  beforeImageUrl?: string;
  description: string;
  isBeforeAfter?: boolean;
}

export interface TrustFactor {
  id: string;
  title: string;
  description: string;
  metricLabel: string;
  icon: string;
}
