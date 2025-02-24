import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import  staticAdapter from '@astrojs/static-adapter';

export default defineConfig({
  integrations: [tailwind()],
  output: 'static', // Asegúrate de que el output sea estático
  adapter: staticAdapter()
});