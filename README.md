# RADHE ELECTRICAL — Complete Solar Panel Installation Solutions

[![Production Build](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com/MohdSajidJafri/RadheElectrical)
[![React](https://img.shields.io/badge/React-19.x-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC.svg)](https://tailwindcss.com/)

A premium, production-grade solar energy website and operations workspace for **RADHE ELECTRICAL**, a trusted rooftop and commercial solar installation provider based in **Dausa, Rajasthan**.

---

## ☀️ About the Business

- **Business Name:** RADHE ELECTRICAL
- **Tagline:** Complete Solar Panel Installation Solutions
- **Physical Depot:** Near Giriraj Dharan Temple, Agra Road, Dausa, Rajasthan (PIN: 303303)
- **Direct Phone:** [+91 9982861558](tel:9982861558)
- **Consultation Hours:** Monday – Sunday: 8:00 AM – 8:00 PM
- **Service Area:** Dausa, Bandikui, Lalsot, Sikrai, Mahwa, Bassi, and Eastern Rajasthan

---

## 🎨 Creative Direction & Design System

The platform is designed around the visual philosophy of **"Industrial Solar Architecture & Rajasthan Rooftops"**:

- **Tonal Rhythm:** Alternating between **sun-baked mineral stone canvases (`#F6F5EE`)** and **deep graphite night fields (`#080B11`)** for dynamic visual pacing.
- **Typography:** Display headlines set in **Plus Jakarta Sans**, technical and reading text set in **Inter**, and operational metrics/telemetry set in **Monospace**.
- **Restrained Solar Accent:** Warm solar saffron / amber (`#D97706` / `#F59E0B`) used strictly at points of conversion.
- **Architectural Layout:** Overlapping compositions, variable photographic scales, and horizontal technical ledgers instead of generic stacked SaaS cards.

---

## 🚀 Key Features

### 1. Consumer Experience (Public Website)
- **Cinematic Solar Hero:** Architectural opening with wide Rajasthan rooftop photography, oversized typography, and a 1-click capacity pre-fill bar.
- **Engineering Philosophy:** Detailed showcase of hot-dip galvanized mounting structures, dual chemical earthing, and high wind-load engineering.
- **Capabilities & Applications:** 3 distinct tiers covering Residential Rooftops & Shaded Pergolas, Commercial 3-Phase Arrays, and Maintenance Diagnostics.
- **Solar Sizing & Scale Guide:** Progression comparison for **1 KW**, **2 KW**, **3 KW (Standard)**, **5 KW**, and **10 KW+** systems with appliance load telemetry.
- **Interactive Savings Estimator:** Dynamic monthly bill calculator with residential/commercial tariff modes and realistic Rajasthan solar generation estimates.
- **Quality Standards:** 5 authentic craft pillars paired with real physical hardware imagery.
- **Case Study Portfolio:** Interactive Before/After terrace transformation slider, categorized project grid, and full-screen lightbox modal.
- **Unified Consultation & Depot Hub:** Validated quote request form with confetti animation, 1-click WhatsApp sync, and live Google Maps location embed.
- **Floating Conversion Triggers:** Sticky mobile action bar and desktop WhatsApp consultation launcher.

### 2. Operations Workspace (Admin Portal)
- **Operations Overview:** Real-time KPI ledger (*Total Leads*, *New / Uncontacted*, *Active Pipeline*, *Converted*), lead conversion pipeline progression, and capacity demand analytics.
- **Leads Management:** High-density operations table with search, status filtering (*New*, *Contacted*, *In Progress*, *Quoted*, *Converted*, *Closed*), customer detail drawer, internal depot notes, direct Call/WhatsApp triggers, and CSV export.
- **Portfolio Media Manager:** Project case study management with local file uploads (`FileReader`), stock library selector, Before/After image pairing, and `localStorage` persistence.
- **Discoverable Access:** Secondary entry point located in the main footer navigation and mobile drawer.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| **Build Tool** | [Vite 8](https://vitejs.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) + Custom CSS Design Tokens |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Effects** | [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti) |
| **Linter** | [Oxlint](https://oxc.rs/) |
| **Design Framework** | [Impeccable Design System](https://github.com/shadcn) |

---

## 📂 Project Structure

```
RadheElectrical/
├── public/
│   ├── _redirects                  # Netlify SPA routing fallback
│   ├── favicon.svg                 # Brand SVG icon
│   └── images/                     # High-resolution architectural photography
│       ├── hero-solar.jpg
│       ├── structure-detail.jpg
│       ├── commercial-solar.jpg
│       ├── residential-villa.jpg
│       ├── inverter-system.jpg
│       ├── technician-maintenance.jpg
│       ├── before-terrace.jpg
│       └── after-terrace.jpg
├── src/
│   ├── assets/                     # Static SVG assets
│   ├── components/
│   │   ├── Header.tsx              # Architectural sticky header & mobile drawer
│   │   ├── Hero.tsx                # Cinematic opening & capacity quick-select
│   │   ├── About.tsx               # Mineral stone engineering manifesto
│   │   ├── Services.tsx            # 3 application scope panels
│   │   ├── SolarCapacity.tsx       # System scale selector & technical ledger
│   │   ├── SavingsCalculator.tsx   # Solar savings & rooftop estimator
│   │   ├── WhyChooseUs.tsx         # 5 quality standards & hardware visual
│   │   ├── ProjectGallery.tsx      # Case studies, Before/After slider & lightbox
│   │   ├── SolarEnquiryForm.tsx    # Consultation form & Google Maps depot hub
│   │   ├── Footer.tsx              # Brand coordinates & staff portal link
│   │   ├── FloatingActions.tsx     # Mobile bottom bar & desktop WhatsApp button
│   │   └── admin/
│   │       ├── AdminLayout.tsx     # Operations workspace shell & sidebar
│   │       ├── AdminOverview.tsx   # Pipeline metrics & demand breakdown
│   │       ├── EnquiryManager.tsx  # Customer leads table & detail drawer
│   │       └── GalleryManager.tsx  # Portfolio media upload & management
│   ├── data/
│   │   └── mockData.ts             # Business info, capacities, services, gallery items
│   ├── services/
│   │   ├── enquiryService.ts       # Lead persistence & CSV export
│   │   └── galleryService.ts       # Portfolio persistence & storage
│   ├── types/
│   │   └── index.ts                # TypeScript interfaces
│   ├── App.tsx                     # Master app coordinator & routing
│   ├── index.css                   # Design tokens, typography & button primitives
│   └── main.tsx                    # Application mount point
├── index.html                      # SEO metadata, OpenGraph & JSON-LD Schema
├── package.json                    # Project dependencies & scripts
├── tsconfig.json                   # TypeScript configuration
└── vite.config.ts                  # Vite build configuration
```

---

## 💻 Local Development

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/MohdSajidJafri/RadheElectrical.git

# Navigate to project directory
cd RadheElectrical

# Install dependencies
npm install
```

### Running Locally
```bash
# Start development server
npm run dev
```
Open `http://localhost:5173/` in your browser.

### Building for Production
```bash
# Typecheck and compile production bundle
npm run build

# Preview production build locally
npm run preview
```

### Running Linter
```bash
# Fast Oxlint code analysis
npm run lint
```

---

## 🌐 Deployment (Netlify Ready)

This repository includes a `public/_redirects` file (`/* /index.html 200`) configured for single-page applications.

To deploy on [Netlify](https://www.netlify.com/):
1. Connect your GitHub repository `MohdSajidJafri/RadheElectrical`.
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Deploy!

---

## 📞 Contact

**RADHE ELECTRICAL**  
Near Giriraj Dharan Temple, Agra Road, Dausa, Rajasthan — 303303  
Phone: [+91 9982861558](tel:9982861558)  
WhatsApp: [Chat Directly](https://wa.me/919982861558)  
Location: [Google Maps](https://maps.google.com/maps?q=26.9065717,76.3788313)

---

© 2026 RADHE ELECTRICAL. All rights reserved.
