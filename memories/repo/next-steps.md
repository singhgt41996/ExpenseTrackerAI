# Next Steps

> **Last Updated:** July 20, 2026 - Personal Laptop

---

## 🎯 Immediate Next Task

### Stats tab

**Priority:** HIGH
**Status:** Blueprint given in `current-task.md` — build it yourself

**Plan:**

1. `src/screens/expense/stats/index.tsx`, wire into `ExpenseTabNavigator`'s "Stats" tab
2. Reuse `useTransactions(monthKey(currentMonth))` — data's already cached, no new fetch
3. Install a chart lib (`react-native-gifted-charts` or `victory-native`)
4. Spending by category (pie/bar) — reuse `deriveCategoryTotals` from `src/utils/categoryTotals.ts` (already extracted, don't recompute inline) + spending by day within the month
5. Month picker to compare months: reuse `<MonthPicker />` from `src/components/molecules/monthPicker/` (already built) instead of writing a new one

---

## 📅 Expense Tracker — remaining work (in order)

### 1. ~~Delete~~ ✅ done

### 2. ~~ExpenseDetail screen (real)~~ ✅ done

### 3. ~~EditExpense screen (real)~~ ✅ done — shared `ExpenseForm` extracted, `useUpdateTransaction` added

### 4. ~~Cleanup pass~~ ✅ done

- [x] Dead `src/store/transactionStore.ts` — was already gone, nothing referenced it
- [x] Raw `occurredAt: Date` kept alongside the lossy display string
- [x] `src/navigation/types.d.ts` → `types.ts`
- [x] Fixed BlogsTabNavigator (Home no longer renders DashboardScreen, icons fixed, headerLeft hoisted to `screenOptions`)

### 5. Stats tab ← NEXT (see above)

### 6. ~~Profile tab~~ ✅ done

- [x] User info (avatar/name/email), Log Out
- [x] Monthly income now dynamic: `monthly_income` table + `incomeService.ts` + `useIncome.ts`, editable inline on Profile, read on Dashboard
- [x] **TODO (Supabase SQL editor, not code):** confirm a real unique constraint exists on `monthly_income(user_id, month)` and that RLS select/insert/update policies are in place — see the SQL block in `current-task.md`. The upsert silently needs this; it's not enforced by the app.

### 7. ~~"See all" — AllTransactionsScreen~~ ✅ done

- [x] `src/screens/expense/allTransactions/index.tsx` — month picker + `SectionList` grouped by day + delete/detail
- [x] Fixed `ExpenseDetail`/`EditExpense` to take `month` as a route param instead of hardcoding "current month" (was silently broken for past months)
- [x] Category section's "See all" on Dashboard now opens `CategoryBreakdownScreen` (see item 7b)

### 7b. ~~Category breakdown screen~~ ✅ done

- [x] `src/screens/expense/categoryBreakdown/index.tsx` — month-scoped list of every category, amount + % of total + progress bar
- [x] Tapping a category navigates to `AllTransactions` pre-filtered to it (`route.params.category`)
- [x] Refactor along the way: `deriveCategoryTotals` util (shared with Dashboard) + `<MonthPicker />` molecule (shared with `AllTransactionsScreen`)

### 8. Dashboard polish

- [ ] Pull-to-refresh (`RefreshControl` + `refetch`)
- [ ] Empty state ("no transactions yet") and error state (currently only loading handled — `isError`/`error` are already destructured in `DashboardScreen` but unused)
- [ ] **Bug to fix:** `handleLogout` in `DashboardScreen` calls `navigation.navigate('Hub')` instead of `await logout()` — doesn't type-check and doesn't actually sign out. Looked like WIP, left untouched — revert or finish it.

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
