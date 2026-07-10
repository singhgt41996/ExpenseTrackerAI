# Current Task

> **Last Updated:** July 10, 2026 - Personal Laptop  
> **Status:** Supabase + React Query data layer COMPLETE ✅

---

## 🎯 What I Just Finished

**Feature:** Transactions data layer (Supabase + React Query)  
**Location:** `src/services/transactionService.ts`, `src/hooks/useTransactions.ts`  
**Status:** ✅ COMPLETE (read + add wired into UI; delete hook built but not wired)

### Files Created/Modified:

- ✅ `src/services/transactionService.ts` - `fetchTransactions`, `insertTransaction`, `deleteTransactionById` + `mapRow` (DB row → app shape)
- ✅ `src/hooks/useTransactions.ts` - `useTransactions` (query), `useAddTransaction`, `useDeleteTransaction` (mutations) + `transactionKeys` key factory
- ✅ `App.tsx` - `QueryClientProvider` wrapping the tree; `queryClient` at **module scope** (was a bug: recreated every render)
- ✅ `src/screens/appScreen/dashboard/index.tsx` - reads from `useTransactions()` (was Zustand store); loading spinner guard added
- ✅ `src/screens/appScreen/addExpense/index.tsx` - submits via `useAddTransaction` mutation; `reset()` + navigate in per-call `onSuccess`; button `loadingState={isPending}`

### Supabase side (done earlier this stretch):

- ✅ `transactions` table created (id, user_id default `auth.uid()`, title, category, amount, occurred_at, created_at)
- ✅ RLS enabled with select/insert/delete policies scoped to `auth.uid()`

### Key concepts locked in:

- Server state (React Query cache) vs client state (Zustand) — transactions are server state
- `queryKey` MUST be an array; prefix matching is why (`invalidateQueries(['transactions'])` hits all sub-keys)
- Two `onSuccess` layers: hook-level (`useMutation` config → cache invalidation, always) vs call-level (`mutate(vars, { onSuccess })` → screen-specific UI like reset/navigate)
- `async` functions always return a Promise (language rule); Supabase query builders are thenable

---

## 🚀 Next Task: Wire up Delete on Dashboard

**Priority:** HIGH  
**Estimated Time:** 1-1.5 hours  
**Location:** `src/screens/appScreen/dashboard/index.tsx`

### What to Build:

`useDeleteTransaction` already exists in `src/hooks/useTransactions.ts` — it's wired to nothing. Add a delete gesture to the recent-transactions list.

### Key Steps:

1. Pick a gesture: swipe-to-delete (`react-native-gesture-handler` `Swipeable`) OR long-press + confirm `Alert` (simpler, start here)
2. Call `deleteTransaction(id)` from the gesture handler
3. Confirm dialog before deleting (destructive action)
4. Cache invalidation already handled by the hook's `onSuccess`
5. Optional stretch: optimistic update via `onMutate` + rollback in `onError`

### Known cleanup debt (do soon, low effort):

- [ ] Delete `src/store/transactionStore.ts` (dead code) — first move `Transaction` type into `transactionService.ts` and fix the 2 imports (dashboard + service)
- [ ] `Transaction.date` is a lossy display string (`'MMM dd'`) — keep raw `occurred_at` too when Stats/sorting is needed
- [ ] Rename `src/navigation/types.d.ts` → `types.ts`
- [ ] BlogsTabNavigator: all icons are 'home', Home tab wrongly uses DashboardScreen, redundant headerLefts
