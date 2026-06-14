import sharp from 'sharp';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const out = join(__dirname, '..', 'public');

// --- OG Image (1200x630) ---
// Academic paper aesthetic: off-white background, dark ink text, blue accent line
async function generateOgImage() {
  const svg = `
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <!-- Background -->
      <rect width="1200" height="630" fill="#fafaf8" />

      <!-- Accent line at top -->
      <rect x="0" y="0" width="1200" height="6" fill="#002FA7" />

      <!-- Bottom accent bar -->
      <rect x="0" y="624" width="1200" height="6" fill="#002FA7" opacity="0.3" />

      <!-- Name (heading) -->
      <text x="80" y="240" font-family="Georgia, 'Times New Roman', serif" font-size="52" font-weight="bold" fill="#1a1a1a">Vansh Visariya</text>

      <!-- Subtitle -->
      <text x="80" y="300" font-family="monospace" font-size="24" fill="#666">AI/ML Engineer &amp; Researcher</text>

      <!-- Accent separator -->
      <line x1="80" y1="335" x2="340" y2="335" stroke="#002FA7" stroke-width="2" />

      <!-- Tagline -->
      <text x="80" y="380" font-family="'Courier New', monospace" font-size="18" fill="#999">Federated Learning · LLMs · Agentic Systems</text>

      <!-- URL at bottom right -->
      <text x="1120" y="570" text-anchor="end" font-family="'Courier New', monospace" font-size="16" fill="#999">vanshvisariya.is-a.dev</text>
    </svg>
  `;

  await sharp(Buffer.from(svg))
    .resize(1200, 630)
    .png()
    .toFile(join(out, 'og-image.png'));

  console.log('Created public/og-image.png');
}

// --- Favicon (SVG) ---
const faviconSvg = `
  <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="6" fill="#002FA7" />
    <text x="16" y="22" text-anchor="middle" font-family="Georgia, serif" font-size="18" font-weight="bold" fill="#fafaf8">V</text>
  </svg>
`;

writeFileSync(join(out, 'favicon.svg'), faviconSvg);
console.log('Created public/favicon.svg');

// Create a minimal ICO from the SVG (SVG as PNG inside ICO)
generateOgImage().then(() => console.log('All assets generated.'));
