
import React from 'react';
import { Project, Service, Testimonial, Stat } from './types';

export const PROJECTS: Project[] = [
  { 
    id: '1', 
    title: 'Modern Logo Branding', 
    category: 'Logo Branding', 
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1000&auto=format&fit=crop', 
    description: 'A complete visual identity system for a fintech startup, focusing on trust, scalability, and modern minimalist aesthetics.', 
    year: '2024',
    additionalImages: [
      'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1541462608141-ad4d1f995502?q=80&w=1000&auto=format&fit=crop'
    ]
  },
  { 
    id: '2', 
    title: 'Gaming Social Media Suite', 
    category: 'Social Media Design', 
    image: 'https://images.unsplash.com/photo-1614332287897-cdc485fa562d?q=80&w=1000&auto=format&fit=crop', 
    description: 'High-engagement social media assets for an esports organization, including stream overlays, post templates, and event banners.', 
    year: '2024',
    additionalImages: [
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1000&auto=format&fit=crop'
    ]
  },
  { 
    id: '3', 
    title: 'Viral YouTube Thumbnails', 
    category: 'Thumbnails', 
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1000&auto=format&fit=crop', 
    description: 'Custom, high-click-through-rate thumbnails designed to grab attention and boost views for educational and lifestyle channels.', 
    year: '2023',
    additionalImages: [
      'https://images.unsplash.com/photo-1533750349088-cd871a92f312?q=80&w=1000&auto=format&fit=crop'
    ]
  },
  { 
    id: '4', 
    title: 'Corporate Event Banners', 
    category: 'Banners', 
    image: 'https://images.unsplash.com/photo-1531050171651-a3a4072f4477?q=80&w=1000&auto=format&fit=crop', 
    description: 'Large-scale promotional banners for international tech conferences, maintaining brand consistency across physical spaces.', 
    year: '2024',
    additionalImages: [
      'https://images.unsplash.com/photo-1505373630103-892744917ad5?q=80&w=1000&auto=format&fit=crop'
    ]
  },
  { 
    id: '5', 
    title: 'Luxury Product Packaging', 
    category: 'Print Design', 
    image: 'https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?q=80&w=1000&auto=format&fit=crop', 
    description: 'Premium print layouts for high-end beauty products, focusing on elegant typography and tactile finish specifications.', 
    year: '2023',
    additionalImages: [
      'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=1000&auto=format&fit=crop'
    ]
  },
  { 
    id: '6', 
    title: 'Instagram Engagement Pack', 
    category: 'Social Media Design', 
    image: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?q=80&w=1000&auto=format&fit=crop', 
    description: 'Strategically designed stories and grid posts for a lifestyle brand aimed at maximizing user interaction.', 
    year: '2024' 
  },
  { 
    id: '7', 
    title: 'Real Estate Branding', 
    category: 'Logo Branding', 
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop', 
    description: 'Sophisticated logo and identity kit for a luxury real estate agency, emphasizing exclusivity and property value.', 
    year: '2022' 
  },
  { 
    id: '8', 
    title: 'Educational YouTube Kit', 
    category: 'Thumbnails', 
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop', 
    description: 'A series of educational thumbnails designed with clear typography and engaging visuals for better knowledge retention.', 
    year: '2023' 
  },
  { 
    id: '9', 
    title: 'Creative Business Cards', 
    category: 'Print Design', 
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?q=80&w=1000&auto=format&fit=crop', 
    description: 'Bespoke business card designs for creative professionals, utilizing unique die-cuts and premium paper stocks.', 
    year: '2024' 
  },
  { 
    id: '10', 
    title: 'Digital Marketing Graphics', 
    category: 'Web Graphics', 
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop', 
    description: 'High-converting ad creatives for Facebook and Google Ads, optimized for brand visibility and conversions.', 
    year: '2023' 
  },
  { 
    id: '11', 
    title: 'Restaurant Visual Identity', 
    category: 'Logo Branding', 
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop', 
    description: 'Warm and inviting branding for a boutique bistro, including logo design, menu layouts, and signage.', 
    year: '2024' 
  },
  { 
    id: '12', 
    title: 'App Landing Page Graphics', 
    category: 'Web Graphics', 
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1000&auto=format&fit=crop', 
    description: 'Custom illustrations and hero sections for a mobile app landing page, focusing on user benefits and features.', 
    year: '2023' 
  }
];

export const SOFTWARE_STACK = [
  'Adobe Photoshop',
  'Adobe Illustrator',
  'Adobe InDesign',
  'Figma',
  'Adobe XD',
  'Corel Draw',
  'Adobe Lightroom'
];

export const SERVICES: Service[] = [
  { id: 's1', title: 'Brand Identity', description: 'Crafting powerful visual languages and guidelines that define your brand voice in the market.', icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01' },
  { id: 's2', title: 'Graphic Design', description: 'Expert print and digital graphic creation focusing on composition, color theory, and impact.', icon: 'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z' },
  { id: 's3', title: 'Thumbnails & Socials', description: 'Eye-catching social media assets and viral thumbnails designed for high click-through rates.', icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  { id: 's4', title: 'Print & Banners', description: 'High-quality print designs from large-scale banners to detailed marketing brochures.', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' }
];

export const CONTACT_EMAIL = "umair570726@gmail.com";
export const WHATSAPP_NUMBER = "923089689181";