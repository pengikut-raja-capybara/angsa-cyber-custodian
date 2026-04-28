export interface ServiceItem {
  id: string;
  name: string;
  price: string;
  description: string;
  note?: string;
  requirements?: string;
  details?: string;
}

export interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  services: ServiceItem[];
  disclaimer?: string;
}

export interface NavItem {
  label: string;
  href: string;
}
