import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  :root {
    --brand-primary: #DA7527;
    --brand-accent: #FF8C00;
    --brand-accent-dark: #B85E1F;
    --text-dark: #333333;
    --text-light: #E5E7EB;
    --footer-bg: #46355b;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body, #root { height: 100%; }
  body {
    font-family: 'Open Sans', sans-serif;
    line-height: 1.6;
    color: var(--text-dark);
    background: #fff;
  }

  a { color: inherit; text-decoration: none; }
  ul { list-style: none; }
  .sr-only { position: absolute !important; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
`


