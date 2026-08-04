# Progress Tracker

> **Last Updated:** July 20, 2026  
> **System:** Personal Laptop  
> **Phase:** Module 1 - Expense Tracker (CRUD + Profile/Income done, Stats next)

---

## ✅ Completed So Far

### Phase 0: Foundation — ✅ COMPLETE

- [x] React Native project init, TypeScript strict, absolute imports (@/), Babel/Metro config
- [x] Theme system (colors, typography, spacing, cross-platform shadows)
- [x] Atomic components: Text, Button, Input, Icon, Avatar, Badge, Chip, ProgressBar, Spacer
- [x] Molecules: SelectBox, LoaderOverlay, DatePicker (partial)
- [x] Templates: ScreenWrapper (safe-area handling)
- [x] iOS build fixed (MMKV v4 + nitro-modules, Reanimated v4 + worklets)

### Authentication — ✅ COMPLETE

- [x] Supabase project + auth (email/password)
- [x] `authStore` (Zustand): login, signup, logout, checkAuth, error handling
- [x] Login + Signup screens (react-hook-form + zod validation)
- [x] RootNavigator switches Auth stack ↔ App stack on session
- [x] Cold-start session restore with loading screen, LoaderOverlay for in-app loading
- [x] Debugged: email verification flow, rate limits, project auto-pause (521 errors)

### Navigation ("super-app" shell) — ✅ COMPLETE

- [x] Typed param lists for all navigators (`src/navigation/types.ts`)
- [x] AppStack: Hub → ExpenseTracker stack / Blogs stack
- [x] ExpenseTracker stack: Tab navigator (Home/Stats/AddExpense/Profile) + non-tab screens (ExpenseDetail, EditExpense)
- [x] Blogs stack scaffolded (tabs + BlogDetail) — screens still placeholders
- [x] Hub screen with section cards

### Expense Tracker core — 🔄 ~90%

- [x] Dashboard UI: summary card, quick stats, category breakdown w/ ProgressBar, recent transactions, FAB
- [x] Category constants (`CATEGORY_META`, `EXPENSE_CATEGORIES`)
- [x] AddExpense form: RHF + zod, category chips, keyboard handling — now via shared `ExpenseForm`
- [x] **Supabase `transactions` table + RLS policies (auth.uid() scoped)**
- [x] **`transactionService.ts`: fetch / insert / update / delete + row mapping (month-scoped fetch)**
- [x] **React Query: `useTransactions`, `useAddTransaction`, `useUpdateTransaction`, `useDeleteTransaction` + key factory**
- [x] **Dashboard reads live data (loading state); AddExpense/EditExpense write via mutation (isPending on button)**
- [x] QueryClient at module scope, provider in App.tsx
- [x] Delete wired into Dashboard UI (long-press + Alert confirm)
- [x] ExpenseDetail / EditExpense real screens, shared `ExpenseForm` component
- [x] Month-scoped transactions + `src/utils/date.ts` helpers
- [x] Profile tab (real): user info, editable Monthly Income, Log Out
- [x] Dynamic monthly income: Supabase `monthly_income` table + `incomeService.ts` + `useIncome.ts`, Dashboard reads it instead of a hardcoded constant
- [x] Cleanup: dead `transactionStore.ts` confirmed gone, `types.d.ts` → `types.ts`, BlogsTabNavigator bug fixed
- [x] Category breakdown screen (Dashboard's "See all" on category card) — assistant-built; extracted `deriveCategoryTotals` util + reusable `<MonthPicker />` molecule (also refactored into `AllTransactionsScreen`); tapping a category drills into `AllTransactions` filtered to it
- [ ] Stats tab (charts) ← NEXT
- [ ] Dashboard polish: pull-to-refresh, empty/error states

### Learning topics covered (interview prep)

- [x] Zustand (client state) vs React Query (server state) — when and why
- [x] React Query: queryKey arrays + prefix invalidation, hook-level vs call-level onSuccess, isLoading vs isFetching vs isPending
- [x] RHF + Zod: Controller, handleSubmit as HOF, z.infer, zodResolver
- [x] Axios interceptors theory (request auth header, 401 refresh queue) — practice file in `src/services/axios.interceptor.ts`, not integrated (no REST API to test)
- [x] async/await + Promise mechanics; Supabase thenable query builders
- [x] Nested navigation typing (NavigatorScreenParams, getParent)

---

## 📊 Module Progress

```
Phase 0: Foundation        [██████████] 100%
Module 1: Expense Tracker  [█████████░] ~90%
Module 2: Blogs/Feed       [█░░░░░░░░░] 10% (nav scaffold only)
Module 3: Workspace        [░░░░░░░░░░] 0%
Module 4: AI Chat          [░░░░░░░░░░] 0%
Production polish          [░░░░░░░░░░] 0%
```

---

## 🎯 Goals

**Now:** Stats tab (charts), then dashboard polish (pull-to-refresh, empty/error states).
**Next:** Blogs vertical slice built solo (test of what's been internalized), then optimistic updates + testing.

---

## 📅 Session History

### July 21, 2026 (Personal Laptop)

- ✅ DatePicker molecule upgraded from day-stepper to a full calendar grid (month nav + tap-a-day), used in `AddExpense`/`ExpenseForm` and indirectly benefiting `AllTransactionsScreen`
- ✅ Category breakdown screen built (assistant-built, "nothing new to learn" call): `src/screens/expense/categoryBreakdown/`, wired as `CategoryBreakdown` stack route, reachable from Dashboard's "Spending by category → See all"
- ✅ Extracted `deriveCategoryTotals` (`src/utils/categoryTotals.ts`) out of Dashboard's inline `useMemo` — now shared by Dashboard and the new breakdown screen
- ✅ Extracted `<MonthPicker />` molecule (`src/components/molecules/monthPicker/`) out of `AllTransactionsScreen`'s inline modal code — now shared by `AllTransactionsScreen` and the new breakdown screen
- ✅ `AllTransactions` route gained an optional `category` param — tapping a category row drills into the filtered transaction list (small banner + client-side filter)
- 📝 Decided next step: Stats tab (charts) — only remaining piece of Module 1

### July 20, 2026 (Personal Laptop)

- ✅ ExpenseDetail + EditExpense made real; extracted shared `ExpenseForm` (RHF + zod) used by Add and Edit
- ✅ Added `updateTransactionById` + `useUpdateTransaction` (fixed 3 bugs: missing `.eq(id)`, missing `.select().single()`, wrong column casing)
- ✅ Month-scoped transactions: `src/utils/date.ts`, `fetchTransactions(month)`, `transactionKeys.byMonth`
- ✅ Fixed DatePicker (`ButtonComponent` import/variant bugs), added dependency-free day-stepper UI
- ✅ Cleanup debt cleared: dead `transactionStore.ts` confirmed gone, `types.d.ts` → `types.ts`, BlogsTabNavigator bug fixed
- ✅ Real Profile screen + dynamic Monthly Income: `monthly_income` table (user-created), `incomeService.ts`, `useIncome.ts`; Dashboard now reads real income instead of a hardcoded constant
- 📝 TODO for user in Supabase SQL editor: confirm unique constraint on `monthly_income(user_id, month)` + RLS policies (see `current-task.md`)
- 📝 Decided next step: Stats tab (charts)

### July 10, 2026 (Personal Laptop)

- ✅ Finished React Query integration: query keys fixed (array + key factory), all 3 hooks working
- ✅ Deep-dive Q&A: mapRow purpose, Promise/async mechanics, dual onSuccess, queryKey typing error
- 🐛 Supabase 521 (Cloudflare origin down = project paused) — infra, not code
- 📝 Decided next step: wire delete on dashboard

### July 8-9, 2026 (Personal Laptop)

- ✅ transactionService (fetch/insert/delete + mapRow), useTransactions hooks
- ✅ Dashboard → live data w/ loading state; AddExpense → mutation w/ isPending
- ✅ Fixed queryClient recreated-per-render bug (module scope now)
- ✅ Supabase `transactions` table + RLS created
- 📝 Learned server vs client state, invalidateQueries flow

### Early July 2026

- ✅ AddExpense form (RHF + zod), category chips, form → store → dashboard flow
- ✅ Zustand transactionStore (now superseded by React Query)
- ✅ Babel fix for zod v4 (`@babel/plugin-transform-export-namespace-from`)

### Late June 2026

- ✅ Super-app navigation: Hub + nested Expense/Blogs stacks with typed params
- ✅ Dashboard UI built (mock data), ProgressBar atom
- ✅ Placeholder screens for all unbuilt routes

### June 2026

- ✅ Auth flow complete (Supabase + Zustand + RHF/zod screens)
- ✅ Debugged signup verification, rate limits, session restore

### May 22-30, 2026

- ✅ Project setup, theme system, Text/Button/Input atoms, iOS build fixes
