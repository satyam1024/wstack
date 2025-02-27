# Under Construction!

# W-Stack

## Core Technologies

- **Framework:** Next.js
- **UI:** ShadCN + TailwindCSS
- **Database:** MongoDB (with Drizzle ORM)

## Additional Essential Choices

1. **Query Management**

   - _TanStack Query (React Query)_ – Best for API data fetching, caching, and synchronization.

2. **State Management**

   - _Zustand_ – Simple, scalable, and lightweight. (Lightweight global state)

3. **Caching**

   - **Client-Side:** TanStack Query – Caching for API requests. (Automatic query caching)
   - **Server-Side:** Redis – For backend caching (Rate limiting + session storage).

4. **Performance Optimizations**

   - **Lodash debounce:** API middleware using `lodash.throttle`
   - **React-use:** Custom `useDebounce` hook. (UI Interactions)

5. **API Management**

   - _Hono.dev_ – Lightweight, fast, works well with Edge and Serverless environments.
   - **Validation:** Zod
   - **Documentation:** Swagger UI auto-generation

6. **Authentication & Authorization**

   - _BetterAuth_ – Better Auth Alternate (`npm add better-auth`)
   - _Helmet.js_ – Adds security headers.

7. **File Uploads & Storage**

   - **AWS S3**
   - _UploadThing_ – Easy file uploads for Next.js
   - _Sharp.js_ – For image processing and optimization

8. **CI/CD Pipelines**

   - **GitHub Actions** – Automate testing, linting, and deployment
   - **Docker** – For containerization (if needed)

9. **Logging & Monitoring**

   - _Pino_ / _Winston_ – Fast logging for backend
   - _Sentry_ – Error tracking for both frontend and backend
   - _Logtail_ – Cloud-based logging

10. **Documentation & Developer Experience**

    - _just-the-docs_ – For project structure documentation
    - _Swagger_ (for Hono) – API documentation
    - _ESLint + Prettier + Husky_ – Code linting and formatting

11. **Testing Setup**
    - _Jest + React Testing Library_ – For unit and integration tests
    - _Cypress / Playwright_ – For end-to-end testing

# Documentation for Starter Kit Strcuture

being done parallely at [wstack-docs](https://github.com/MambaCodes/wstack-docs)
