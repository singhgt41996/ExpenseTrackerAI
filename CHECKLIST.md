# ✅ FinFlow Development Checklist

> Print this or keep it open while coding

---

## 📝 BEFORE EVERY SESSION

- [ ] Run `./scripts/sync-start.sh`
- [ ] Read `memories/repo/current-task.md`
- [ ] Know what you're building today

---

## 💻 WHILE CODING

- [ ] Focus on ONE task at a time
- [ ] Test as you build
- [ ] Note any learnings/gotchas
- [ ] Take breaks every hour

---

## ✅ AFTER COMPLETING A TASK

- [ ] Test the feature works
- [ ] Run `./scripts/update-progress.sh`
- [ ] Update `memories/repo/current-task.md`:
  - [ ] Mark task complete ✅
  - [ ] Update "What I Just Finished"
  - [ ] Update "Next Task"
  - [ ] Change "Last Updated" date + machine
- [ ] Update `memories/repo/progress.md`:
  - [ ] Add to "Completed This Week"
  - [ ] Add session entry at bottom
  - [ ] Update progress % if needed
- [ ] Update `memories/repo/learnings.md` (if learned something new)
- [ ] Git commit & push:
  ```bash
  git add .
  git commit -F .git-commit-msg-temp
  git push origin develop
  ```

---

## 🔚 END OF SESSION (BEFORE CLOSING LAPTOP)

- [ ] All changes committed
- [ ] All changes pushed to GitHub
- [ ] Memory files updated
- [ ] No uncommitted files (`git status` clean)

---

## 🎯 GOLDEN RULES

1. **ALWAYS** pull before starting
2. **ALWAYS** update memories before pushing
3. **ALWAYS** push before closing laptop
4. **NEVER** work on both machines simultaneously
5. **COMMIT** after every component/feature

---

## ⚡ QUICK COMMANDS

```bash
# Start session
./scripts/sync-start.sh

# Check current task
cat memories/repo/current-task.md | head -40

# Update progress
./scripts/update-progress.sh

# Git status
git status

# Git commit
git add .
git commit -F .git-commit-msg-temp
git push origin develop
```

---

## 🚨 IF SOMETHING GOES WRONG

### Forgot what you were doing?
```bash
cat memories/repo/current-task.md
git log -1
```

### Branch behind?
```bash
git pull origin develop
```

### Merge conflict?
```bash
# Usually in memory files - keep latest timestamp
git add .
git commit -m "merge: resolve conflict"
git push origin develop
```

### Forgot to push last night?
```bash
# Just push now, other machine will sync
git push origin develop
```

---

## 📊 WEEKLY CHECKLIST

### Sunday Evening (Planning)
- [ ] Review last week's progress
- [ ] Update `PROJECT_ROADMAP.md` if needed
- [ ] Plan this week's tasks in `next-steps.md`

### Friday/Weekend (Review)
- [ ] Update `progress.md` with week summary
- [ ] Note overall progress %
- [ ] Celebrate wins! 🎉

---

**Remember:** Progress over perfection. One task at a time! 🚀
