# Capsule

React Native app (TypeScript) with a Hub that opens two modules: **Expense Tracker** and **Blogs**. Built as a portfolio / learning project with production-style architecture (typed navigation, React Query, Supabase, forms, optimistic updates).

> Product name: **Capsule**. The native project folder may still be named `ExpenseTrackerAI` historically.

This project was bootstrapped with [`@react-native-community/cli`](https://github.com/react-native-community/cli).

---

## Resume-safe summary

**Capsule** — React Native app with Supabase-backed expense tracking (CRUD, charts, optimistic updates, monthly income) and a blogs module (create posts, optional cover upload to Storage, feed UI), using React Query, Zustand, React Hook Form + Zod, and typed React Navigation.

Only list features under **Completed** below on a resume until pending items ship.

---

## Completed

### App shell & auth
- [x] Hub screen to switch modules
- [x] Typed React Navigation (native stack + bottom tabs)
- [x] Supabase email/password auth
- [x] Session restore with MMKV
- [x] Shared theme + atomic UI components

### Expense Tracker
- [x] Dashboard (income, spend, category breakdown, recent transactions)
- [x] Add / edit / delete transactions (RHF + Zod)
- [x] Month-scoped queries + month helpers
- [x] Dynamic monthly income (Profile + Dashboard edit)
- [x] All transactions list + category breakdown screens
- [x] Stats: category pie chart + daily bar chart (`react-native-gifted-charts`)
- [x] Optimistic update / delete + cache invalidation
- [x] Pull-to-refresh, loading / empty / error handling on Dashboard

### Blogs
- [x] Create blog (title, body)
- [x] Optional cover image (Image Picker → Supabase Storage → `cover_url`)
- [x] Home feed (list of blogs)
- [x] Blog detail route (stack)

### Backend (Supabase)
- [x] Tables with RLS: `transactions`, `monthly_income`, `blogs`
- [x] Storage bucket `blog-covers` for cover images

---

## Pending / not shipped yet

Do **not** describe Capsule as “AI-powered” until these exist and are demoable.

- [ ] AI expense categorization
- [ ] Receipt OCR / scanning
- [ ] AI financial assistant / chat
- [ ] Infinite scroll / pagination polish on blogs feed (`useInfiniteQuery`)
- [ ] FastImage / FlashList performance pass
- [ ] Blog detail polish (edit / delete / rich HTML body)
- [ ] Deep linking / universal links
- [ ] Firebase (Analytics / FCM) — planned learning, not in app yet
- [ ] Payments (Razorpay / Stripe) — not started
- [ ] Workspace / budget planner module — not started

---

## Tech stack (in use)

| Area | Choice |
|------|--------|
| App | React Native, TypeScript |
| Navigation | React Navigation (stack, tabs) |
| Client state | Zustand |
| Server state | TanStack React Query |
| Backend | Supabase (Auth, Postgres, Storage, RLS) |
| Forms | React Hook Form + Zod |
| Charts | react-native-gifted-charts |
| Images | react-native-image-picker |
| Local storage | react-native-mmkv |

---

## Project structure

```
src/
  components/   # atoms / molecules / templates
  screens/      # expense/, blogs/, auth/, hub/, profile/
  navigation/   # typed navigators
  hooks/        # React Query hooks
  services/     # Supabase API + cover upload
  store/        # Zustand (auth)
  theme/        # colors, spacing, typography
```

---

## Getting started

1. Install dependencies: `yarn install`
2. Set Supabase URL and anon key in `src/lib/supabase.ts`
3. Ensure Supabase schema + RLS + `blog-covers` bucket exist (see Completed → Backend)
4. iOS pods (first clone / after native dep changes):

```sh
bundle install
cd ios && bundle exec pod install && cd ..
```

5. Run:

```sh
yarn start
yarn ios      # or yarn android
```

See the [React Native environment setup](https://reactnative.dev/docs/set-up-your-environment) guide if the toolchain is not installed yet.

---

## Multi-machine notes

If you use the sync scripts in this repo:

```sh
./scripts/sync-start.sh          # start of session
# work…
# update memories/repo/*.md then commit & push
```

Details: [`memories/repo/UPDATE_GUIDE.md`](./memories/repo/UPDATE_GUIDE.md), [`SYNC_WORKFLOW.txt`](./SYNC_WORKFLOW.txt).

---

## Troubleshooting

If Metro / build fails, see the [React Native troubleshooting](https://reactnative.dev/docs/troubleshooting) page.
