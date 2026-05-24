# Next Steps

> **Last Updated:** May 24, 2026 - Personal Laptop

---

## 🎯 Immediate Next Task (This Session)

### Build Button Component
**Priority:** HIGH  
**Time:** 1.5-2 hours  
**Status:** 🔄 READY TO START

**Quick Start:**
1. Create `src/components/atoms/button/` folder
2. Copy structure from `text/` component
3. Start with `types.d.ts` - define ButtonProps interface
4. Move to `styles.ts` - create getButtonStyles function
5. Implement `index.tsx` - use TouchableOpacity
6. Document in `README.md`

**Key Decisions to Make:**
- TouchableOpacity or Pressable? (Start with TouchableOpacity - simpler)
- Icon support - should it be required? (No, make it optional)
- Loading state - replace text or show alongside? (Show spinner only)

---

## 📅 This Week's Plan (Week 1)

### Day 1-2: Atomic Components ✅ (In Progress)
- [x] Text component ✅
- [ ] Button component (Today)
- [ ] Input component (Next)
- [ ] Icon component

### Day 3-4: Navigation Setup
- [ ] Create `src/navigation/` files
- [ ] RootNavigator (app entry point)
- [ ] AuthNavigator (Login/Signup stack)
- [ ] MainNavigator (Bottom tabs: Dashboard, Feed, Workspace, Profile)
- [ ] Navigation types & type safety

### Day 5-6: State & Screens
- [ ] Zustand store setup (authStore, appStore)
- [ ] React Query provider
- [ ] Splash screen
- [ ] Login screen UI
- [ ] Dashboard placeholder

### Day 7: Polish & Test
- [ ] Connect navigation flow
- [ ] Test hot reload
- [ ] Update documentation
- [ ] Commit and sync

---

## 🚀 Next Week Preview (Week 2)

### Module 1: Expense Tracker Begins
- [ ] Supabase Google Sign-In integration
- [ ] Protected routes logic
- [ ] Auth state management
- [ ] Session persistence
- [ ] First authenticated screen

---

## 📝 Components Backlog

### Atoms (High Priority)
1. Button ← NEXT
2. Input (TextInput wrapper)
3. Icon (Vector Icons wrapper)
4. Card (container with shadow)
5. Badge (notification badge)
6. Chip (category tag)
7. Avatar (user profile picture)
8. Divider (horizontal line)

### Molecules (Medium Priority)
1. ExpenseCard (expense list item)
2. CategoryPicker (dropdown/modal)
3. DateRangePicker (date selection)
4. SearchBar (input with icon)
5. FormField (label + input + error)

### Organisms (Later)
1. ExpenseForm (complete form)
2. ExpenseList (list with sections)
3. ChartSection (chart + legend)
4. BottomSheet (modal from bottom)
5. Header (navigation header)

---

## 🎯 Learning Goals

### This Week
- [x] Component architecture (atoms)
- [x] TypeScript in React Native
- [ ] Navigation patterns
- [ ] State management basics (Zustand)
- [ ] Server state (React Query basics)

### Next Week
- [ ] Authentication flows
- [ ] Protected routes
- [ ] Form validation (React Hook Form + Zod)
- [ ] API integration (Supabase)
- [ ] Error handling

---

## 🤔 Open Questions

1. **Button Component:**
   - Should button show both spinner and text when loading? (Decide: spinner only)
   - How to handle icon-only buttons? (Allow children to be empty if icon present)

2. **Navigation:**
   - Nested navigators vs single navigator? (Use nested - better organization)
   - Drawer navigation needed in Phase 0? (Yes, add for Settings)

3. **State Management:**
   - Split stores by feature or single store? (Split - better organization)
   - Where to put auth logic - store or hook? (Store for state, hook for actions)

4. **Forms:**
   - Controlled vs uncontrolled inputs? (Use React Hook Form - uncontrolled)
   - Where to validate - frontend only or backend too? (Both)

---

## 🔗 Resources to Read

### Button Component
- [ ] TouchableOpacity docs
- [ ] Pressable docs (compare)
- [ ] ActivityIndicator docs
- [ ] Haptic feedback library

### Navigation (Next)
- [ ] React Navigation v7 docs
- [ ] Stack Navigator guide
- [ ] Bottom Tabs guide
- [ ] Drawer Navigator guide
- [ ] TypeScript with React Navigation

### State Management (Next)
- [ ] Zustand docs
- [ ] React Query v5 docs
- [ ] MMKV usage examples

---

## 💾 Don't Forget

Before ending session:
- [ ] Update CURRENT_SESSION.md
- [ ] Update progress.md with completed tasks
- [ ] Add learnings to learnings.md
- [ ] Update this file with new questions
- [ ] Commit and push:
  ```bash
  git add .
  git commit -m "Session: [What you did]"
  git push origin main
  ```

---

## 🎯 Success Metrics

**Week 1 Goal:** Complete Phase 0 (Foundation) - 100%
**Current:** 60%
**On Track:** Yes ✅

**Daily Target:** 1-2 components or 1 major feature
**Weekly Target:** Complete atomic components + navigation

Keep up the momentum! 🚀
