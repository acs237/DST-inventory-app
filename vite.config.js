import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',  // Automatically update Service Worker
      /* includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],  // Files to cache */
      includeAssets: ['vite.svg'],  // Files to cache
      workbox: {
        // Workbox is Google's Service Worker library
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        // Specifies file patterns to cache
        // ** means all directories, * means all files
        
        runtimeCaching: [
          {
            // API request caching
            urlPattern: /^https:\/\/api\.example\.com\/.*/i,
            // Caches API requests matching this pattern
            
            handler: 'NetworkFirst',
            // NetworkFirst: Try network first, use cache if it fails
            // CacheFirst: Check cache first, make network request if not found
            // StaleWhileRevalidate: Show cache first, update in background
            
            options: {
              cacheName: 'api-cache',
              // Name for this cache
              
              expiration: {
                maxEntries: 50,
                // Store maximum of 50 items in cache
                maxAgeSeconds: 60 * 60 * 24,
                // Cache expires after 24 hours (86400 seconds)
              },
              
              cacheableResponse: {
                statuses: [0, 200],
                // Only cache status codes 0 (CORS) and 200 (success)
              }
            }
          },
          {
            // Image caching
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
            // Cache requests for image file extensions
            
            handler: 'CacheFirst',
            // Images don't change often, so prioritize cache
            
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60,
                // 30 days
              }
            }
          }
        ]
      },
      manifest: {
        name: 'dst-inventory-app',  // Full app name
        short_name: 'dst-inventory',  // Short name displayed on home screen
        description: 'Inventory Management System for DST',
        start_url: '/', // The URL the app is opened to by default
        theme_color: '#ffffff',  // Color of the top bar
        background_color: '#ffffff',  // Splash screen background color
        display: 'standalone',  // Makes it look like a native app (hides browser UI)
        // How the app should be displayed
        // standalone: Like a native app (recommended)
        // fullscreen: Full screen mode (default)
        // minimal-ui: Minimal browser UI (default)
        // browser: Regular browser mode (default)
        
        icons: [
          {
            src: 'vite.svg',
            /* src: 'pwa-192x192.png',  // Small icon */
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'vite.svg',
            /* src: 'pwa-512x512.png',  // Large icon */
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'  // Works in various environments
          }
        ]
      }
    })
  ]
})