/// <reference types="vite/client" />

declare module 'react/jsx-runtime';

interface Window {
  PLAYWRIGHT?: boolean;
}

interface ImportMetaEnv {
  readonly DEV: boolean;
  readonly VITE_APP_TITLE: string;
  // Add other env variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
} 