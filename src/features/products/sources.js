// Mapping of product categories to Google Drive direct-download JSON URLs
// To add more categories later, extend this object with: key -> drive UC link

export const productSources = {
  // Prefer Drive first (proxied via /gdrive), then fall back to local JSON if Drive fails.
  cookies: [
    { type: 'drive', id: '1SKYLsLJUirUXFgxbEws0ugazAOQU7zAL' },
    { type: 'local', path: '/data/cookies.json' },
  ],
  ghee: [
    { type: 'drive', id: '10y8R_F1R0UhAzko8Cwy69JHVEqroamwY' },
    { type: 'local', path: '/data/ghee.json' },
  ],
  honey: [
    { type: 'drive', id: '1Bnbvsp5caEYoF6H41VtX1w316T73yOM4' },
    { type: 'local', path: '/data/honey.json' },
  ],
};


