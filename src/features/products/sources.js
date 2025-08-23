// Mapping of product categories to Google Drive direct-download JSON URLs
// To add more categories later, extend this object with: key -> drive UC link

export const productSources = {
  // Prefer GitHub raw JSON first, then fall back to bundled local JSON
  // GitHub raw endpoints:
  // cookies: https://raw.githubusercontent.com/anurickster/pintexim-react/main/public/data/cookies.json
  // ghee:    https://raw.githubusercontent.com/anurickster/pintexim-react/main/public/data/ghee.json
  // honey:   https://raw.githubusercontent.com/anurickster/pintexim-react/main/public/data/honey.json
  cookies: [
    { type: 'local', path: 'https://raw.githubusercontent.com/anurickster/pintexim-react/main/public/data/cookies.json' },
    { type: 'local', path: '/data/cookies.json' },
  ],
  ghee: [
    { type: 'local', path: 'https://raw.githubusercontent.com/anurickster/pintexim-react/main/public/data/ghee.json' },
    { type: 'local', path: '/data/ghee.json' },
  ],
  honey: [
    { type: 'local', path: 'https://raw.githubusercontent.com/anurickster/pintexim-react/main/public/data/honey.json' },
    { type: 'local', path: '/data/honey.json' },
  ],
};


