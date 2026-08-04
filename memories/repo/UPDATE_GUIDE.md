# 🔄 How to Update Progress (Cross-Machine Sync)

> **Use this guide every time you finish a task on any machine**

---

## 📝 Quick Update Workflow

### After Completing ANY Task:

1. **Update current-task.md**

   ```bash
   # Mark what you just finished
   # Update "What I Just Finished" section
   # Update "Next Task" section
   # Change "Last Updated" with date + machine name
   ```

2. **Update progress.md**

   ```bash
   # Add to "Completed This Week" section
   # Update session history at bottom
   # Update progress percentage if needed
   ```

3. **Add to learnings.md** (if you learned something new)

   ```bash
   # Document any gotchas, tricks, or insights
   ```

4. **Git commit with standard format**

   ```bash
   git add .
   git commit -m "feat: [component/feature name]

   ✅ What was completed
   📝 Key learnings (if any)
   🎯 Next: [next task]

   Machine: [Office/Personal Laptop]
   Time: [X hours]"

   git push origin ayush-dev
   ```

---

## 🚀 Starting Work on Any Machine

### When you sit down to code:

1. **Pull latest changes**

   ```bash
   git pull origin ayush-dev
   ```

2. **Read memory files** (in this order)

   - `current-task.md` - What was last done, what's next
   - `progress.md` - Overall status
   - `next-steps.md` - Week plan

3. **Start coding** based on "Next Task" in current-task.md

---

## 🎯 Git Commands Quick Reference

```bash
# Start work
git pull origin ayush-dev
cat memories/repo/current-task.md

# Commit work
git add .
git commit -m "feat: your task name"
git push origin ayush-dev

# Check status
git status
git log --oneline -5
```

---

## 📋 Update Templates

### Template: current-task.md

```markdown
# Current Task

> **Last Updated:** [Date] - [Office/Personal Laptop]  
> **Status:** [Component/Feature] Complete ✅ / In Progress 🔄

---

## 🎯 What I Just Finished

**Component:** [Name]  
**Location:** `[path]`  
**Status:** ✅ COMPLETE / 🔄 IN PROGRESS

### Files Created/Modified:

- ✅ File 1
- ✅ File 2

### Features Implemented:

- ✅ Feature 1
- ✅ Feature 2

---

## 🚀 Next Task: [Task Name]

**Priority:** HIGH/MEDIUM/LOW  
**Estimated Time:** [X hours]  
**Location:** `[path]`

### What to Build:

[Brief description]

### Key Steps:

1. Step 1
2. Step 2
```

### Template: progress.md Session Entry

```markdown
### [Date] ([Machine]) - [X hours]

- ✅ Completed [task]
- ✅ Completed [task]
- 📝 Learned [key insight]
```

---

## 🎯 Git Commit Message Format

### Feature Complete

```
feat: button atom component

✅ All button variants (primary, secondary, outline, text, danger)
✅ Loading state with spinner
✅ Icon support (left/right)
✅ Disabled state
✅ Full TypeScript + README

📝 Learned: ActivityIndicator color prop behavior
🎯 Next: Input atom component

Machine: Personal Laptop
Time: 2 hours
```

### Work in Progress

```
wip: input atom component (partial)

✅ Basic input structure
✅ Label and helper text
🔄 Validation states (in progress)

Machine: Office
Time: 1.5 hours
```

### Bug Fix

```
fix: text component alignment on Android

🐛 Fixed center alignment not working on Android
📝 Learned: Need textAlignVertical for Android

Machine: Office
Time: 30 min
```

### Documentation

```
docs: update progress for week 1

📊 Updated progress.md - 60% Phase 0 complete
📝 Added learnings for rest parameters

Machine: Personal Laptop
```

---

## ⚡ Quick Commands

### End of Session Checklist

```bash
# 1. Stage all changes
git add .

# 2. Commit with template
git commit -m "feat: [what you built]

✅ Completed items
📝 Learnings (optional)
🎯 Next: [next task]

Machine: [Office/Personal]
Time: [X hours]"

# 3. Push
git push origin ayush-dev

# 4. Updated memories/repo/ files?
# ✅ current-task.md
# ✅ progress.md
# ✅ learnings.md (if applicable)
```

### Start of Session Checklist

```bash
# 1. Pull latest
git pull origin ayush-dev

# 2. Read these files (in order):
cat memories/repo/current-task.md
cat memories/repo/progress.md

# 3. Start coding! 🚀
```

---

## 🔄 Sync States

### ✅ Perfect Sync

- Both machines have latest code
- Memory files are up to date
- No merge conflicts

### ⚠️ Out of Sync

**If you see:**

- Outdated "Last Updated" date in current-task.md
- Git says "Your branch is behind"

**Solution:**

```bash
git pull origin ayush-dev
# Read memory files
# Continue from "Next Task"
```

### 🔥 Conflict!

**If you worked on both machines without pulling:**

```bash
# 1. Stash your changes
git stash

# 2. Pull latest
git pull origin ayush-dev

# 3. Apply your changes
git stash pop

# 4. Resolve conflicts in memory files
# (Usually just keep the latest timestamps)

# 5. Commit
git add .
git commit -m "merge: sync between machines"
git push origin ayush-dev
```

---

## 📱 Machine Identifiers

Use consistent names in "Last Updated" fields:

- **Personal Laptop** - Your MacBook at home
- **Office** - Your work machine
- **iPad** - If coding on iPad

This helps you remember context when switching.

---

## 🎯 Weekly Workflow

### Sunday Evening (Planning)

```bash
# Update next-steps.md for the week
# Set weekly goals in progress.md
# Commit: "docs: weekly plan for week X"
```

### Friday/Weekend (Review)

```bash
# Update progress.md with week summary
# Check off completed items in PROJECT_ROADMAP.md
# Commit: "docs: week X summary"
```

---

## 💡 Pro Tips

1. **Commit often** - After every component/feature
2. **Update memories before pushing** - Don't forget!
3. **Read current-task.md first** - Always know where you left off
4. **Use emojis in commits** - Easy visual scanning in git log
5. **Push before closing laptop** - Don't lose work!

---

## ⚡ Emergency: "Where was I?"

If you forget what you were doing:

```bash
# 1. Check last commit
git log -1 --pretty=format:"%B"

# 2. Check current-task.md
cat memories/repo/current-task.md

# 3. Check git status
git status

# 4. Check your last changes
git diff
```

---

**Remember:** The goal is to make switching machines seamless. Always leave breadcrumbs for future you! 🍞
