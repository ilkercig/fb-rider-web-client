# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Next.js dev server
npm run build     # Build for production
npm run start     # Start production server
npm run lint      # Run ESLint
npm run test      # Run Jest test suite
```

To run a single test file:
```bash
npx jest src/lib/api/__tests__/authUtils.test.ts
```

## Architecture

**Stack**: Next.js 15 (App Router), React 18, TypeScript, Material UI v6, React Query (TanStack), Axios, Zod

This is a fantasy basketball dashboard that authenticates via Yahoo OAuth2 and displays league/standings data from a backend API.

### App Router Structure

- `src/app/(protected)/` — routes requiring authentication; `layout.tsx` checks auth status via React Query before rendering
- `src/app/login/` — unauthenticated login page
- `src/app/callback/` — OAuth2 callback handler
- `src/components/` — all React components
- `src/lib/` — business logic, API layer, hooks, context, utilities

### Authentication Flow

Yahoo OAuth2 OpenID Connect, session-based (cookie):
1. `YahooLoginButton` generates a random `state` + `nonce`, stores them in `sessionStorage`, then redirects to Yahoo
2. Yahoo redirects to `/callback`; `useAuthCallback` hook validates `state` (CSRF), then POSTs `code` + `nonce` to `/api/yahooauth/callback` on the backend
3. Backend exchanges code for tokens and sets a session cookie
4. Protected layout checks `/api/yahooauth/status` via React Query; unauthenticated users are redirected to `/login`
5. All Axios calls use `withCredentials: true` for the session cookie

### API Layer (`src/lib/api/`)

- `yahooAuthService.ts` — all API calls; generic `performRequest<T>()` wraps Axios with Zod validation
- `types.ts` — Zod schemas that double as TypeScript types via `z.infer`
- `constants.ts` — API endpoint paths
- `setupAxiosInterceptors.ts` — 401 response → redirect to `/login`
- Backend base URL from env: `NEXT_PUBLIC_BACKEND_URI`

### State Management

- **React Query**: all server/async state (user info, leagues, standings)
- **SnackbarContext** (`src/lib/snackbarContext.tsx`): app-wide toast notifications via `useSnackbar()` hook
- **sessionStorage**: OAuth `state` and `nonce` tokens only (cleared after callback)

### Testing

Jest + ts-jest + jsdom. Tests live in `__tests__/` directories alongside the code they test. Module alias `@/*` → `src/*` is configured in `jest.config.ts`. CSS imports are mocked via `__mocks__/fileMock.js`.

### Path Alias

`@/*` maps to `src/*` (configured in both `tsconfig.json` and `jest.config.ts`).
