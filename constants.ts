
import { ModelSpec, TickerData, TechnicalDoc } from './types';

export const STANDARD_CHEST_SPECS = [
  { label: 'Voltage Architecture', value: '12V-48V DC / 115V-240V AC' },
  { label: 'Ambient Tolerance', value: 'Up to +50°C (Extreme Class)' },
  { label: 'Energy Savings', value: '40% vs Conventional Compressors' },
  { label: 'Thermal Stability', value: 'PCM Thermal Battery (24h Buffer)' },
  { label: 'Design Life', value: '15+ Years Engineered' },
  { label: 'Refrigerant', value: 'Eco-Friendly R600a / R290' },
  { label: 'Accuracy', value: '±0.5°C Precision Control' }
];

export const MODELS: ModelSpec[] = [
  {
    id: 'z-50l',
    name: 'Tectonic 50L Compact',
    capacity: '50 Liters',
    description: 'Perfect for limited spaces. Ideal for small apartments, offices, medical facilities, and mobile applications where space is at a premium.',
    specs: [
      'Use: Medical / Mobile / Home Office',
      'Solar Potential: Direct 12V/24V Link',
      'Portability: Auto-Grade Chassis',
      'Control: Smartphone Monitoring'
    ],
    imagePrompt: 'Small sleek white industrial chest freezer, ZaZen logo, 50L compact size, clean medical office background, professional photography',
    vertical: 'freezer'
  },
  {
    id: 'z-250l',
    name: 'Tectonic 250L Family',
    capacity: '250 Liters',
    description: 'Ideal capacity for medium households and small businesses needing reliable cold storage for bulk purchases and meal prep.',
    specs: [
      'Cooling: Forced Air Circulation',
      'Temp: -18°C to -25°C Stable',
      'Lining: PCM Thermal Retention',
      'Efficiency: 40% Rapid Cooling'
    ],
    imagePrompt: 'Medium sized industrial chest freezer, obsidian finish, 250L capacity, modern kitchen or restaurant setting, realistic lighting',
    vertical: 'freezer'
  },
  {
    id: 'z-550l',
    name: 'Tectonic 550L Industrial',
    capacity: '550 Liters',
    description: 'Maximum capacity for demanding industrial applications, hospitality resorts, and major medical distribution installations.',
    specs: [
      'Backup: 6-12 Hours Battery Link',
      'Grid: Continuous Charging Mode',
      'Uplink: Multi-Language IoT',
      'Design: 15+ Years Service Life'
    ],
    imagePrompt: 'Massive industrial chest freezer, 550L capacity, warehouse or logistics hub background, high-end finish, technical detail',
    vertical: 'freezer'
  }
];

export const CHILLER_MODELS: ModelSpec[] = [
  {
    id: 'bmc-500',
    name: 'ZaZen BMC-500',
    capacity: '500 Liters',
    description: 'Processing center powerhouse. Features Air-Based evaporation for rapid cooling and frost prevention on internal coils.',
    specs: [
      'Evaporator: Forced Air System',
      'Frost: Auto Prevention Cycle',
      'Safety: Voltage Guard Included',
      'Savings: 40% Energy Reduction'
    ],
    imagePrompt: 'Industrial horizontal bulk milk cooling tank, 500L, stainless steel, dairy processing facility background, copper pipe accents, professional photography',
    vertical: 'chiller'
  },
  {
    id: 'bmc-2000',
    name: 'ZaZen BMC-2000 Giga Chiller',
    capacity: '2000 Liters',
    description: 'Large-scale industrial milk cooling infrastructure for regional cooperatives. Engineered for massive thermal inertia.',
    specs: [
      'Cooling: Centralized Water-Medium Loop',
      'Redundancy: Quad-BLDC Compressor Array',
      'Structure: Heavy-Duty Reinforced Frame',
      'Uplink: Satellite Link Telemetry'
    ],
    imagePrompt: 'Colossal stainless steel bulk milk chiller array, 2000L capacity, industrial steampunk design, polished brass pipes, copper cooling fins, cinematic lighting, photorealistic',
    vertical: 'chiller'
  }
];

export const INITIAL_TICKER_DATA: TickerData[] = [
  { label: 'SYS_VOLTAGE', value: '24.2V', sub: 'SOLAR_PRIORITY', status: 'good' },
  { label: 'ANNUAL_SAVINGS', value: '₹18,400', sub: 'EST_UNIT', status: 'good' },
  { label: 'ROI_TIMER', value: '2.3 YRS', sub: 'PAYBACK', status: 'good' },
  { label: 'CORE_TEMP', value: '-22.1°C', sub: 'STABLE', status: 'good' },
  { label: 'AMB_LOAD', value: '48.5°C', sub: 'EXTREME', status: 'normal' },
  { label: 'PCM_BUFFER', value: '24.0H', sub: 'CHARGED', status: 'good' }
];

export const FOUNDRY_LOGS = [
  "UPLINK: SATELLITE_LINK_04_ACTIVE",
  "THERMAL: CORE_DRIFT_0.02C_DETECTED",
  "POWER: SWITCHING_TO_SOLAR_PRIORITY",
  "FOUNDRY: MAHARASHTRA_SECTOR_SYNCED",
  "METRICS: ZERO_SPOILAGE_PROTOCOL_ON",
  "LOG: FIRMWARE_UPDATE_V4.2_READY",
  "IOT: 1,402_NODES_REPORTING_NORMAL"
];

export const TECHNICAL_DOCS: TechnicalDoc[] = [
  {
    id: 'bldc-40',
    title: 'Advanced BLDC Core Technology',
    category: 'Engineering',
    content: `Our brushless DC motors deliver up to 40% energy savings. 12V-48V DC versatility allows for direct solar panel coupling, eliminating inverter losses.`
  },
  {
    id: 'pcm-thermal',
    title: 'PCM Lining: Thermal Battery',
    category: 'Architecture',
    content: `Phase Change Material (PCM) integrated into units acts as a thermal battery, maintaining stable temperatures for up to 24 hours during outages.`
  }
];

export const CASE_STUDIES = [
  {
    title: 'Village Dairy Cooperative',
    location: 'Rural Maharashtra',
    challenge: 'Milk spoilage due to 8-hour daily power cuts.',
    solution: 'ZaZen Solar-Powered Chillers with PCM Buffer.',
    results: '23% reduction in spoilage, 40% energy savings.'
  },
  {
    title: 'Urban Supermarket Chain',
    location: 'Delhi NCR',
    challenge: 'High AC costs and inventory loss.',
    solution: '24 ZaZen Freezers with Ducted Split Condenser arrays.',
    results: '37% energy reduction, zero inventory loss.'
  }
];

export const TESTIMONIALS = [
  {
    name: 'Rajesh Kumar',
    role: 'Dairy Farmer',
    quote: "The solar-powered ZaZen chiller has transformed our village milk collection. Our milk stays fresh even during outages."
  }
];

export const GLOBAL_FOUNDRIES = [
  { location: 'Zhejiang Sector', focus: 'Heavy Metallurgy & EHFR Assembly', status: 'Active' },
  { location: 'Maharashtra Hub', focus: 'Dairy Field Deployment', status: 'Active' },
  { location: 'Singapore Hub', focus: 'AI Control & Smart Monitoring', status: 'Active' }
];
