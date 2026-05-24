# 📜 Project Scripts

> Helper scripts for development workflow

---

## 🚀 Available Scripts

### 1. `sync-start.sh` - Start Your Coding Session
**When to use:** Every time you start coding on any machine

```bash
./scripts/sync-start.sh
```

**What it does:**
- ✅ Pulls latest code from git
- ✅ Shows your current task
- ✅ Shows recent progress
- ✅ Shows next steps
- ✅ Ensures you're synced

---

### 2. `update-progress.sh` - Log Your Work
**When to use:** After completing any task/feature

```bash
./scripts/update-progress.sh
```

**What it does:**
- ✅ Prompts for task details
- ✅ Updates memory files
- ✅ Generates commit message
- ✅ Guides you through git push

---

## 💡 Recommended Workflow

### Starting Work
```bash
# 1. Run sync script
./scripts/sync-start.sh

# 2. Code your feature
# ... code code code ...

# 3. When done, run update script
./scripts/update-progress.sh

# 4. Follow prompts and push
```

---

## 🔧 Other Useful Commands

### Quick Status Check
```bash
# See what you last worked on
cat memories/repo/current-task.md | head -40

# See your progress
cat memories/repo/progress.md | tail -30
```

### Manual Git Workflow
```bash
# If you prefer manual workflow
git add .
git commit -m "feat: your feature name

✅ What you did
🎯 Next: what's next

Machine: [Office/Personal]
Time: X hours"

git push origin develop
```

---

## 🎯 Quick Reference Card

```
START SESSION:      ./scripts/sync-start.sh
END SESSION:        ./scripts/update-progress.sh
CHECK STATUS:       cat memories/repo/current-task.md
SEE PROGRESS:       cat memories/repo/progress.md
```

---

**Tip:** Add these to your shell aliases for even faster access!

```bash
# Add to ~/.zshrc or ~/.bashrc
alias finflow-start="cd ~/Documents/Projects/ExpenseTrackerAI && ./scripts/sync-start.sh"
alias finflow-update="cd ~/Documents/Projects/ExpenseTrackerAI && ./scripts/update-progress.sh"
```
