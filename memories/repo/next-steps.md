# Next Steps

> **Last Updated:** July 10, 2026 - Personal Laptop

---

## 🎯 Immediate Next Task

### Wire up Delete on Dashboard

**Priority:** HIGH  
**Time:** 1-1.5 hours  
**Status:** `useDeleteTransaction` hook already exists — just needs UI

**Plan:**

1. Start simple: long-press on a transaction row → `Alert.alert` confirm → `deleteTransaction(id)`
2. Upgrade to swipe-to-delete with `react-native-gesture-handler` `Swipeable` (new RN skill)
3. Cache invalidation is already handled inside the hook — no extra work
4. Stretch: optimistic update (`onMutate` remove from cache, rollback in `onError`) — top React Query interview topic

---

## 📅 Expense Tracker — remaining work (in order)

### 1. Delete (above) ← NEXT

### 2. ExpenseDetail screen (real)

- [ ] Tap transaction row → navigate with `id` param (route already typed & registered)
- [ ] Decide: pass data via params vs read from React Query cache (`queryClient.getQueryData` / seed with `initialData`) — learn the tradeoff
- [ ] Show full details + Edit / Delete buttons

### 3. EditExpense screen (real)

- [ ] New service fn `updateTransaction` + `useUpdateTransaction` hook (the missing "U" in CRUD)
- [ ] Reuse AddExpense form pattern, pre-filled via RHF `defaultValues`/`reset(data)`
- [ ] Supabase `update` RLS policy may be needed (only select/insert/delete exist)

### 4. Cleanup pass

- [ ] Move `Transaction` type into `transactionService.ts`; delete dead `src/store/transactionStore.ts`
- [ ] Keep raw `occurred_at` in mapped Transaction (currently lossy `'MMM dd'` string)
- [ ] Rename `src/navigation/types.d.ts` → `types.ts`
- [ ] Fix BlogsTabNavigator (icons all 'home', Home uses DashboardScreen, redundant headerLefts)

### 5. Stats tab

- [ ] Charting lib: `victory-native` or `react-native-gifted-charts`
- [ ] Spending by category (pie/bar) + by month (needs raw dates → cleanup #4 first)

### 6. Profile tab

- [ ] User info, logout w/ confirm, maybe theme toggle

### 7. Dashboard polish

- [ ] Pull-to-refresh (`RefreshControl` + `refetch`)
- [ ] Empty state ("no transactions yet") and error state (currently only loading handled)

---

## 🚀 After Expense Tracker

- [ ] **Blogs vertical slice — build solo, no hand-holding** (nav done; table + service + hooks + screens). Real test of React Query/RHF knowledge.
- [ ] Optimistic updates on add/delete
- [ ] `useInfiniteQuery` pagination on transaction list
- [ ] Testing: Jest + RNTL (dashboard useMemo derivations, one hook)
- [ ] Auth polish: react-native-keychain for tokens, biometrics

---

## 🎯 Learning Goals

### Done

- [x] Zustand vs React Query (client vs server state)
- [x] React Query queries + mutations + invalidation + key factories
- [x] RHF + Zod end-to-end
- [x] Axios interceptor pattern (theory + practice file)

### Up next

- [ ] Gestures (Swipeable / gesture-handler)
- [ ] Optimistic updates + rollback
- [ ] Charts in RN
- [ ] Cache seeding for detail screens (list → detail without refetch)

---

## 🤔 Open Questions

1. ExpenseDetail data: route params vs cache read? (lean: cache read by id — teaches more)
2. Stats needs real dates — do cleanup #4 (keep `occurred_at`) before or with Stats? (before)
3. Delete UX: swipe vs long-press? (start long-press+Alert, upgrade to swipe)

---

## 💾 Don't Forget (end of session)

- [ ] Update current-task.md + progress.md (+ learnings.md if new insight)
- [ ] Commit & push (see UPDATE_GUIDE.md format)
