# Current Task

> **Last Updated:** July 20, 2026
> **Status:** Expense Tracker CRUD + cleanup + Profile/Income ✅ — Stats tab is next

---

## 🎯 What I Just Finished

**Feature 1:** ExpenseDetail + EditExpense made real
**Location:** `src/screens/expense/expenseDetail`, `src/screens/expense/editExpense`, `src/components/molecules/ExpenseForm`
**Status:** ✅ COMPLETE

- ✅ Extracted shared `ExpenseForm` (title/amount/date/category chips/description + zod schema) used by both Add and Edit
- ✅ `AddExpenseScreen` uses a `formKey` remount trick to reset the form after a successful add
- ✅ `EditExpenseScreen` finds the txn from the already-cached `useTransactions(month)` list, pre-fills `ExpenseForm`, calls new `useUpdateTransaction`
- ✅ `updateTransactionById` added to `transactionService.ts` (had 3 bugs on the way: missing `.eq('id')`, missing `.select().single()`, camelCase key sent instead of `occurred_at` — all fixed)
- ✅ `ExpenseDetailScreen` shows real title/amount/category/date/description + Edit/Delete icon actions
- ✅ Fixed lossy date: `Transaction.occurredAt: Date` added alongside the display string, so Edit can round-trip the real date
- ✅ DatePicker component fixed (`ButtonComponent` import/variant bugs) and given a working dependency-free day-stepper UI

**Feature 2:** Month-scoped data
**Status:** ✅ COMPLETE

- ✅ `src/utils/date.ts`: `monthKey`, `monthLabel`, `getMonthRange`, `parseMonthKey`
- ✅ `fetchTransactions(month)` filters by `occurred_at` half-open range; `useTransactions(month)` + `transactionKeys.byMonth(month)`
- ✅ Dashboard now shows/queries the actual current month, not a hardcoded label

**Feature 3:** Cleanup debt — all 3 items done
**Status:** ✅ COMPLETE

- ✅ `src/store/transactionStore.ts` — was already gone, nothing referenced it (dead code had already been removed)
- ✅ `src/navigation/types.d.ts` → renamed to `types.ts`
- ✅ `BlogsTabNavigator` fixed: "Home" tab now renders `PlaceholderScreen` instead of the expense `DashboardScreen`; `AddBlog` icon fixed (`home` → `add-circle`); hoisted the repeated `headerShown`/`headerLeft` into the navigator's `screenOptions` instead of copy-pasting on every `Tab.Screen`

**Feature 4:** Profile screen + dynamic Monthly Income
**Status:** ✅ COMPLETE

- ✅ Supabase `monthly_income` table created by user (`id`, `user_id` FK, `month date`, `income numeric`, `created_at`)
- ✅ `src/services/incomeService.ts`: `fetchIncomeForMonth` (exact month, falls back to most recent earlier month if unset) + `upsertMonthlyIncome` (upsert on `user_id, month`)
- ✅ `src/hooks/useIncome.ts`: `useMonthlyIncome(monthDate)`, `useUpdateMonthlyIncome()` — same key-factory pattern as transactions
- ✅ `src/screens/profile/index.tsx` — real screen: avatar/name/email, inline-editable Monthly Income card, Log Out button
- ✅ Wired into both `ExpenseTabNavigator` and `BlogsTabNavigator`'s "Profile" tab (shared screen, not expense-specific)
- ✅ `DashboardScreen` now reads real income via `useMonthlyIncome` instead of a hardcoded `MONTHLY_INCOME = 100000` constant; shows "Not set" + a nudge to Profile when there's no income yet

### ⚠️ One thing to verify in Supabase (not done by the assistant — needs the SQL editor)

The `upsert(..., { onConflict: 'user_id,month' })` call in `incomeService.ts` requires an actual **unique constraint/index on `(user_id, month)`** in Postgres — column existence alone isn't enough. Run this once (idempotent, safe to re-run):

```sql
alter table monthly_income
  add constraint monthly_income_user_month_key unique (user_id, month);

alter table monthly_income enable row level security;

create policy "select own income" on monthly_income
  for select using (auth.uid() = user_id);
create policy "insert own income" on monthly_income
  for insert with check (auth.uid() = user_id);
create policy "update own income" on monthly_income
  for update using (auth.uid() = user_id);
```

If the constraint already exists, the `alter table ... add constraint` line will error ("already exists") — that's fine, it just means you're already covered; skip it and run the RLS policies if those are missing instead.

### Key concepts locked in this session:

- Upsert needs a real DB unique constraint matching `onConflict`, not just "the columns exist"
- Fallback reads (`lt('month', x).order(...).limit(1)`) are a clean way to model "carry forward last known value" without a cron job or duplicating rows every month
- Shared screens that don't belong to one feature (Profile) get their own top-level `src/screens/<name>/` folder, same as `hub` — not nested under `expense/`

---

**Feature 5:** Back-button consistency + inline income edit on Dashboard
**Status:** ✅ COMPLETE

- ✅ `AddExpense` tab now gets `headerShown: true` + back arrow (it's reached via the FAB, so it earned one despite being a tab); `EditExpense`/`ExpenseDetail` stack screens got proper `title`s so the header reads as a real header, not a floating icon
- ✅ Removed the now-redundant in-body "Add Expense"/"Edit Expense" headings (title lives in the native header now)
- ✅ Dashboard summary card: pencil icon next to "Income" opens an inline edit card (same `useUpdateMonthlyIncome` mutation as Profile — one source of truth)

**Feature 6:** "See all" — AllTransactionsScreen
**Status:** ✅ COMPLETE

- ✅ New `src/screens/expense/allTransactions/index.tsx`: month picker (prev/next via `addMonths`, next disabled once you're back at the current month), `SectionList` grouped by day, long-press to delete, tap to open `ExpenseDetail`
- ✅ Registered as `AllTransactions` in `ExpenseTrackerParamList` + `ExpenseTracker.tsx` (back button + title)
- ✅ Dashboard's "Recent transactions → See all" now navigates there (category section's "See all" is still inert — not part of this task)
- 🐛 **Fixed a latent bug found while doing this:** `ExpenseDetail`/`EditExpense` used to hardcode `useTransactions(monthKey(new Date()))` — fine by coincidence when only reachable from the current month's Dashboard, but broken once AllTransactions can open a *past* month's transaction (the detail screen would query the wrong month's cache and show "not found"). Fixed by adding `month: string` to both routes' params; whoever navigates there (Dashboard or AllTransactions) now passes the month explicitly.

### ⚠️ Found but NOT fixed — needs your call

`DashboardScreen`'s `handleLogout` currently does `navigation.navigate('Hub')` instead of calling `logout()` from `useAuthStore` — looks like it was mid-edit. This is a real TS error (`'Hub'` isn't a screen on this navigator, it's one level up) and at runtime it wouldn't actually sign you out either. Left as-is since it looked like your own WIP; revert to `await logout()` (see git history / earlier version) or finish whatever you were trying instead.

---

**Feature 6:** Category breakdown screen ("See all" on Dashboard's category card) — built by assistant, no new concepts.

- `src/utils/categoryTotals.ts` — extracted `deriveCategoryTotals(transactions)` from the Dashboard's inline `useMemo` (now also sorts categories by amount desc). Dashboard was refactored to call this instead of duplicating the reduce/entries logic, so the two screens' numbers can't drift apart.
- `src/components/molecules/monthPicker/` — new reusable `<MonthPicker value onChange maximumDate />` molecule. This is the exact "‹ month label ›" + tap-to-open modal pattern that was built inline inside `AllTransactionsScreen`, pulled out so it's not copy-pasted a third time. `AllTransactionsScreen` was refactored to use it (net code reduction there).
- `src/screens/expense/categoryBreakdown/index.tsx` (new) — month-scoped list of every category with amount, % of total spend, and a progress bar. Tapping a row navigates to `AllTransactions` pre-filtered to that category.
- Navigation: added `CategoryBreakdown: undefined` and changed `AllTransactions: undefined` → `AllTransactions: { category?: string } | undefined` in `src/navigation/types.ts`. Registered `CategoryBreakdownScreen` in `ExpenseTracker.tsx` with a back button, same pattern as the other stack screens. Dashboard's "Spending by category → See all" text is now wrapped in a `Pressable` that navigates there.
- `AllTransactionsScreen` now reads `route.params?.category`: if present, shows a small banner ("Showing only Food") and filters the month's transactions client-side before grouping into sections.

### Key concepts locked in this session:

- When the same derivation (category totals) or the same interactive pattern (month picker) is about to be needed a second time, extract it — a shared util/component means the two screens can never silently disagree, and future screens (Stats) get it for free.
- Optional route params (`{ category?: string } | undefined`) let one screen serve two purposes (full list vs. filtered drill-down) without a second route/screen.

---

## 🚀 Next Task: Stats tab

**Priority:** HIGH
**Location:** `src/screens/expense/stats/` (new), `src/navigation/ExpenseTabNavigator.tsx`

### What to build (blueprint — implement yourself, ask if stuck):

1. New screen `src/screens/expense/stats/index.tsx`, wire into `ExpenseTabNavigator`'s "Stats" tab (replace `PlaceholderScreen`)
2. Data: reuse `useTransactions(monthKey(currentMonth))` — no new fetching needed, everything's already in cache
3. Pick a charting lib: `react-native-gifted-charts` (lighter) or `victory-native` — install one
4. Two views to start:
   - Spending by category (pie or bar) — reuse `deriveCategoryTotals` from `src/utils/categoryTotals.ts` (already extracted, don't recompute it inline again)
   - Spending by day/week within the month (bar chart) — group `Transactions` by `format(t.occurredAt, 'yyyy-MM-dd')`
5. Month picker to compare months: reuse `<MonthPicker />` from `src/components/molecules/monthPicker/` (already built — prev/next arrows + tap-to-open modal) instead of writing a new one.

NOT part of this task: cross-month trends (needs fetching multiple months' worth of transactions — bigger change, do later if you want it).
