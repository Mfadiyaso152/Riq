export type TemplateType = 'menu' | 'warranty' | 'return' | 'services' | 'custom';

export type PageStatus = 'draft' | 'published';

export interface BasePageContent {
  title: string;
  subtitle?: string;
  logoUrl?: string;
  coverUrl?: string;
  showContact?: boolean;
  phone?: string;
  whatsapp?: string;
  websiteUrl?: string;
  accentColor?: string;
  backgroundColor?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  available: boolean;
}

export interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

export interface RestaurantMenuContent extends BasePageContent {
  currency: string;
  categories: MenuCategory[];
}

export interface WarrantyPolicyContent extends BasePageContent {
  productName: string;
  warrantyPeriod: string;
  coverageScope: string;
  exclusions: string;
  claimProcess: string;
  effectiveDate: string;
}

export interface ReturnPolicyContent extends BasePageContent {
  returnPeriod: string;
  acceptanceConditions: string;
  excludedItems: string;
  refundMethod: string;
  contactEmail: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  price?: string;
  iconName?: string;
}

export interface ServicesContent extends BasePageContent {
  services: ServiceItem[];
}

export type CustomBlockType = 'heading' | 'paragraph' | 'image' | 'button' | 'list' | 'faq';

export interface CustomBlock {
  id: string;
  type: CustomBlockType;
  title?: string;
  content?: string;
  url?: string;
  items?: string[];
  faqs?: { question: string; answer: string }[];
}

export interface CustomPageContent extends BasePageContent {
  blocks: CustomBlock[];
}

export type PageContent = 
  | RestaurantMenuContent 
  | WarrantyPolicyContent 
  | ReturnPolicyContent 
  | ServicesContent 
  | CustomPageContent;

export interface PageDocument {
  id: string;
  ownerId: string;
  templateType: TemplateType;
  title: string;
  slug: string;
  status: PageStatus;
  draftContent: PageContent;
  publishedContent?: PageContent;
  theme: {
    accentColor: string;
    secondaryColor: string;
    fontStyle: string;
  };
  createdAt: any;
  updatedAt: any;
  publishedAt?: any;
  schemaVersion: number;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  emailVerified: boolean;
  createdAt: any;
}
