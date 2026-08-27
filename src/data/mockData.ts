import type { SolarCapacityPlan, ServiceDetail, GalleryProject, TrustFactor, SolarEnquiry } from '../types';

export const BUSINESS_INFO = {
  name: 'RADHE ELECTRICAL',
  tagline: 'Complete Solar Panel Installation Solutions',
  location: 'Near Giriraj Dharan Temple, Agra Road, Dausa, Rajasthan',
  phone: '9982861558',
  phoneDisplay: '+91 9982861558',
  phoneTel: 'tel:9982861558',
  whatsappUrl: 'https://wa.me/919982861558?text=Hello%20RADHE%20ELECTRICAL%2C%20I%20would%20like%20to%20enquire%20about%20solar%20panel%20installation%20in%20Dausa.',
  googleMapsUrl: 'https://www.google.com/maps/place/RADHE+ELECTRICAL/@26.9065718,76.3740671,17z/data=!4m10!1m2!2m1!1sGiriraj+Dharan+Mandir+DAUSA,+radhe+electrical!3m6!1s0x396d8bbd90d048bd:0x87540d033c6c2edb!8m2!3d26.9065717!4d76.3788313!15sCi1HaXJpcmFqIERoYXJhbiBNYW5kaXIgREFVU0EsIHJhZGhlIGVsZWN0cmljYWySARdzb2xhcl9lbmVyZ3lfY29udHJhY3RvcuABAA!16s%2Fg%2F11nvbc18f7?entry=ttu&g_ep=EgoyMDI2MDgyNS4wIKXMDSoASAFQAw%3D%3D',
  pincode: '303303',
  serviceDistricts: ['Dausa', 'Bandikui', 'Lalsot', 'Mahwa', 'Sikrai', 'Nearby Rajasthan Areas']
};

export const SOLAR_CAPACITIES: SolarCapacityPlan[] = [
  {
    id: 'cap-1kw',
    capacity: '1 KW',
    numericKw: 1,
    title: '1 Kilowatt Solar System',
    subtitle: 'Suitable for small households and small retail shops',
    dailyGeneration: 'approx. 4 to 5 Units / day',
    idealFor: '1-2 BHK Homes, Small Shops',
    roofAreaSqFt: 'approx. 90 - 100 sq. ft.',
    applianceSupport: ['LED Lights & Ceiling Fans', '1 Television', 'Mobile & Laptop Charging'],
    keyBenefits: [
      'Reduces baseline daytime electricity bills',
      'Requires minimal rooftop space',
      'Straightforward installation setup'
    ]
  },
  {
    id: 'cap-2kw',
    capacity: '2 KW',
    numericKw: 2,
    title: '2 Kilowatt Solar System',
    subtitle: 'Balanced daily power for medium independent houses',
    dailyGeneration: 'approx. 8 to 10 Units / day',
    idealFor: '2-3 BHK Homes, Small Offices',
    roofAreaSqFt: 'approx. 180 - 200 sq. ft.',
    applianceSupport: ['Lights & Fans', '1 Refrigerator', '1 Air Cooler / Small Inverter AC', 'TV & Electronics'],
    keyBenefits: [
      'Powers daytime refrigeration and cooling',
      'Lowers higher billing tariff slabs',
      'Compatible with on-grid net metering'
    ]
  },
  {
    id: 'cap-3kw',
    capacity: '3 KW',
    numericKw: 3,
    title: '3 Kilowatt Solar System',
    subtitle: 'Most preferred capacity for residential homes in Rajasthan',
    dailyGeneration: 'approx. 12 to 15 Units / day',
    idealFor: '3-4 BHK Homes, Joint Families, Offices',
    roofAreaSqFt: 'approx. 270 - 300 sq. ft.',
    applianceSupport: ['1 to 2 Inverter ACs (Daytime)', 'Refrigerator', 'Water Pump (0.5 to 1 HP)', 'All Home Lighting & Appliances'],
    keyBenefits: [
      'Ideal for summer air conditioning load',
      'Significant reduction in monthly electricity bills',
      'Elevated structure options available'
    ],
    isPopular: true
  },
  {
    id: 'cap-5kw',
    capacity: '5 KW',
    numericKw: 5,
    title: '5 Kilowatt Solar System',
    subtitle: 'High capacity for large independent homes and small businesses',
    dailyGeneration: 'approx. 20 to 25 Units / day',
    idealFor: 'Large Residences, Villas, Workshops, Clinics',
    roofAreaSqFt: 'approx. 450 - 500 sq. ft.',
    applianceSupport: ['2 to 3 Inverter ACs', '1 to 2 HP Water Pump', 'Refrigerators & Freezers', 'Full Office Equipment'],
    keyBenefits: [
      'Substantial energy generation during peak daylight',
      'Single-phase or 3-phase inverter configuration',
      'Custom rooftop structure options'
    ]
  },
  {
    id: 'cap-10kw',
    capacity: '10 KW+',
    numericKw: 10,
    title: '10 Kilowatt+ Solar System',
    subtitle: 'High-yield commercial and institutional solar systems',
    dailyGeneration: 'approx. 40 to 50+ Units / day',
    idealFor: 'Commercial Properties, Showrooms, Schools, Hospitals, Warehouses',
    roofAreaSqFt: 'approx. 900+ sq. ft.',
    applianceSupport: ['Multiple Air Conditioners', 'Commercial Motors & Pumps', 'Heavy Refrigeration', 'Full Facility Power'],
    keyBenefits: [
      'Cuts heavy commercial electricity tariffs',
      'Durable galvanized iron mounting frames',
      'Optimized for large roof surfaces'
    ]
  }
];

export const SERVICES: ServiceDetail[] = [
  {
    id: 'srv-residential',
    slug: 'residential-solar',
    title: 'Residential Solar',
    tagline: 'Solar solutions designed for homes seeking lower electricity costs',
    description: 'Custom rooftop solar installations for independent houses and villas in Dausa. Designed to power your daily household appliances and reduce grid electricity bills.',
    features: [
      'Designed around your household power consumption',
      'Monocrystalline solar panel modules',
      'Neat electrical wiring and conduit protection',
      'On-grid net metering coordination support'
    ],
    icon: 'Home',
    image: '/images/residential-villa.jpg',
    defaultCapacity: '3 KW'
  },
  {
    id: 'srv-commercial',
    slug: 'commercial-solar',
    title: 'Commercial Solar',
    tagline: 'Solar solutions for shops, offices, and commercial properties',
    description: 'High-capacity solar systems for showrooms, workshops, hospitals, schools, and business establishments in Dausa to reduce daytime commercial electricity tariffs.',
    features: [
      'High-yield generation during business operating hours',
      'Single-phase and 3-phase inverter setups',
      'Dedicated surge protection and earthing pits',
      'Long-term operational cost reduction'
    ],
    icon: 'Building2',
    image: '/images/commercial-solar.jpg',
    defaultCapacity: '10 KW+'
  },
  {
    id: 'srv-rooftop',
    slug: 'rooftop-solar',
    title: 'Rooftop Solar',
    tagline: 'Efficient rooftop installations that make productive use of available space',
    description: 'Elevated galvanized iron mounting structures that keep your terrace usable for family activities while capturing maximum sunlight for electricity generation.',
    features: [
      'Elevated frames preserving usable roof area below',
      'Hot-dip galvanized corrosion-resistant structures',
      'Secure anchoring designed for wind stability',
      'Optimal tilt angle aligned for Dausa latitude'
    ],
    icon: 'Sun',
    image: '/images/hero-solar.jpg',
    defaultCapacity: '5 KW'
  },
  {
    id: 'srv-inverter',
    slug: 'solar-inverters',
    title: 'Solar Inverter Solutions',
    tagline: 'Efficient power conversion and system performance',
    description: 'Quality On-Grid, Off-Grid, and Hybrid solar inverters. Ensures smooth electricity conversion with built-in safety protection and status monitoring.',
    features: [
      'High power conversion efficiency',
      'Built-in AC and DC circuit breakers',
      'Digital display for power generation metrics',
      'Options for battery storage connectivity'
    ],
    icon: 'Cpu',
    image: '/images/inverter-system.jpg',
    defaultCapacity: '3 KW'
  },
  {
    id: 'srv-installation',
    slug: 'solar-installation',
    title: 'Solar Panel Installation',
    tagline: 'Professional installation with attention to placement, wiring, and safety',
    description: 'Complete end-to-end installation by experienced solar technicians. We ensure correct panel orientation, secure structure mounting, and safe electrical earthing.',
    features: [
      'South-facing azimuth and tilt angle alignment',
      'Dedicated AC and DC earthing protection',
      'UV-resistant DC solar cables with MC4 connectors',
      'Thorough pre-commissioning safety testing'
    ],
    icon: 'Wrench',
    image: '/images/structure-detail.jpg',
    defaultCapacity: '5 KW'
  },
  {
    id: 'srv-maintenance',
    slug: 'solar-maintenance',
    title: 'Solar Maintenance & Repair',
    tagline: 'Maintenance, troubleshooting, and repair support for solar systems',
    description: 'Prompt service and diagnostic support for new and existing solar systems in Dausa. Health checks, string voltage testing, inverter troubleshooting, and repairs.',
    features: [
      'Voltage and current string diagnostics',
      'Panel cleaning guidance and inspection',
      'Earthing and continuity resistance verification',
      'Prompt local support in Dausa'
    ],
    icon: 'ShieldCheck',
    image: '/images/technician-maintenance.jpg',
    defaultCapacity: '1 KW'
  }
];

export const TRUST_FACTORS: TrustFactor[] = [
  {
    id: 'tf-1',
    title: 'Professional Installation',
    description: 'Experienced attention to installation quality, secure roof anchoring, correct panel alignment, and neat electrical cabling.',
    metricLabel: 'Quality Workmanship',
    icon: 'Wrench'
  },
  {
    id: 'tf-2',
    title: 'Quality Products',
    description: 'Focus on reliable solar panels, efficient inverters, and hot-dip galvanized mounting structures built to last.',
    metricLabel: 'Reliable Equipment',
    icon: 'ShieldCheck'
  },
  {
    id: 'tf-3',
    title: 'Appropriate Price',
    description: 'Practical solar solutions designed around your actual power requirement without unnecessary oversizing.',
    metricLabel: 'Fair Pricing',
    icon: 'BadgeCheck'
  },
  {
    id: 'tf-4',
    title: 'After-Sales Support',
    description: 'Direct local support right here in Dausa. We assist with system maintenance, inverter checks, and troubleshooting.',
    metricLabel: 'Local Support',
    icon: 'Clock'
  },
  {
    id: 'tf-5',
    title: 'Free Consultation',
    description: 'Discuss your rooftop space and power requirements with our local team before deciding on a solar capacity.',
    metricLabel: 'Free Survey',
    icon: 'Headphones'
  }
];

export const INITIAL_GALLERY_PROJECTS: GalleryProject[] = [
  {
    id: 'gal-1',
    title: 'Terrace Transformation',
    category: 'before_after',
    location: 'Agra Road, Dausa',
    capacityTag: '5 KW Elevated Structure',
    imageUrl: '/images/after-terrace.jpg',
    beforeImageUrl: '/images/before-terrace.jpg',
    description: 'Elevated rooftop solar structure providing usable shade below while generating clean power for the home.',
    isBeforeAfter: true
  },
  {
    id: 'gal-2',
    title: 'Residential Rooftop Installation',
    category: 'residential',
    location: 'Near Giriraj Dharan, Dausa',
    capacityTag: '5 KW On-Grid System',
    imageUrl: '/images/residential-villa.jpg',
    description: 'Rooftop monocrystalline solar installation powering household appliances and daytime cooling.'
  },
  {
    id: 'gal-3',
    title: 'Commercial Rooftop System',
    category: 'commercial',
    location: 'Industrial Area, Dausa',
    capacityTag: '25 KW Commercial System',
    imageUrl: '/images/commercial-solar.jpg',
    description: 'Commercial solar installation designed to reduce peak daytime electricity bills for business operations.'
  },
  {
    id: 'gal-4',
    title: 'Solar Inverter Setup',
    category: 'inverter',
    location: 'Dausa City',
    capacityTag: '3 KW Inverter System',
    imageUrl: '/images/inverter-system.jpg',
    description: 'Wall-mounted solar inverter with AC/DC breaker box and digital power generation telemetry.'
  },
  {
    id: 'gal-5',
    title: 'Galvanized Mounting Frame',
    category: 'rooftop',
    location: 'Bandikui Road, Dausa',
    capacityTag: 'Hot-Dip GI Frame',
    imageUrl: '/images/structure-detail.jpg',
    description: 'Heavy-duty galvanized iron mounting structures anchored securely for high wind resistance.'
  },
  {
    id: 'gal-6',
    title: 'System Health Check & Inspection',
    category: 'residential',
    location: 'Lalsot Road, Dausa',
    capacityTag: 'Diagnostic Service',
    imageUrl: '/images/technician-maintenance.jpg',
    description: 'Technician checking string voltage, breaker connections, and earthing resistance.'
  },
  {
    id: 'gal-7',
    title: 'Rooftop Solar Array',
    category: 'rooftop',
    location: 'Somnath Nagar, Dausa',
    capacityTag: '3 KW Rooftop Array',
    imageUrl: '/images/hero-solar.jpg',
    description: 'South-facing rooftop solar array generating clean electricity for a residential household.'
  }
];

export const INITIAL_ENQUIRIES: SolarEnquiry[] = [
  {
    id: 'enq-101',
    name: 'Rajesh Sharma',
    mobile: '9829012345',
    district: 'Dausa',
    city: 'Dausa City',
    pinCode: '303303',
    capacity: '3 KW',
    message: 'Looking for 3KW solar for 2-floor house near Agra Road. Monthly bill is around ₹4,500.',
    createdAt: '2026-08-25T10:30:00.000Z',
    status: 'New',
    adminNotes: 'Requested rooftop visit on Sunday.'
  },
  {
    id: 'enq-102',
    name: 'Vikram Singh Gurjar',
    mobile: '9414087654',
    district: 'Dausa',
    city: 'Bandikui',
    pinCode: '303313',
    capacity: '5 KW',
    message: 'Need elevated rooftop structure so terrace space is usable. Please share quote.',
    createdAt: '2026-08-24T15:45:00.000Z',
    status: 'Contacted',
    adminNotes: 'Sent quotation details via WhatsApp.'
  },
  {
    id: 'enq-103',
    name: 'Manoj Kumar Meena',
    mobile: '9784011223',
    district: 'Dausa',
    city: 'Lalsot',
    pinCode: '303503',
    capacity: '10 KW+',
    message: 'Requirement for commercial showroom on main highway.',
    createdAt: '2026-08-23T11:15:00.000Z',
    status: 'In Progress',
    adminNotes: 'Site survey completed. Preparing structural layout.'
  },
  {
    id: 'enq-104',
    name: 'Sunil Verma',
    mobile: '9928155443',
    district: 'Dausa',
    city: 'Mahwa',
    pinCode: '321608',
    capacity: '2 KW',
    message: 'Need solar setup for 3 rooms and refrigerator in village area.',
    createdAt: '2026-08-22T09:20:00.000Z',
    status: 'Quoted',
    adminNotes: 'Quotation sent. Follow up next week.'
  }
];
