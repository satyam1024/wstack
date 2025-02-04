# Under Construction!

# W-Stack

## Core Technologies

- **Framework:** Next.js
- **UI:** ShadCN + TailwindCSS
- **Database:** MongoDB (with Drizzle ORM)

## Additional Essential Choices

1. **Query Management**  
   - *TanStack Query (React Query)* – Best for API data fetching, caching, and synchronization.

2. **State Management**  
   - *Zustand* – Simple, scalable, and lightweight. (Lightweight global state)

3. **Caching**  
   - **Client-Side:** TanStack Query – Caching for API requests. (Automatic query caching)  
   - **Server-Side:** Redis – For backend caching (Rate limiting + session storage).

4. **Performance Optimizations**  
   - **Lodash debounce:** API middleware using `lodash.throttle`  
   - **React-use:** Custom `useDebounce` hook. (UI Interactions)

5. **API Management**  
   - *Hono.dev* – Lightweight, fast, works well with Edge and Serverless environments.  
   - **Validation:** Zod  
   - **Documentation:** Swagger UI auto-generation

6. **Authentication & Authorization**  
   - *BetterAuth* – Better Auth Alternate (`npm add better-auth`)  
   - *Helmet.js* – Adds security headers.

7. **File Uploads & Storage**  
   - **AWS S3**  
   - *UploadThing* – Easy file uploads for Next.js  
   - *Sharp.js* – For image processing and optimization

8. **CI/CD Pipelines**  
   - **GitHub Actions** – Automate testing, linting, and deployment  
   - **Docker** – For containerization (if needed)

9. **Logging & Monitoring**  
   - *Pino* / *Winston* – Fast logging for backend  
   - *Sentry* – Error tracking for both frontend and backend  
   - *Logtail* – Cloud-based logging

10. **Documentation & Developer Experience**  
    - *just-the-docs* – For project structure documentation  
    - *Swagger* (for Hono) – API documentation  
    - *ESLint + Prettier + Husky* – Code linting and formatting

11. **Testing Setup**  
    - *Jest + React Testing Library* – For unit and integration tests  
    - *Cypress / Playwright* – For end-to-end testing


# Documentation for Starter Kit Strcuture
being done parallely at [wstack-docs](https://github.com/MambaCodes/wstack-docs)