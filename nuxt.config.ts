import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  // ... other config
  runtimeConfig: {
    // Private keys that are exposed to the server
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
    // Public keys that are exposed to the client
    public: {
      // ...
    }
  }
}) 