#!/bin/bash

# 🎯 Quick Progress Update Script
# Run this after completing a task to update memory files

echo "🔄 FinFlow Progress Update"
echo "=========================="
echo ""

# Get current date
CURRENT_DATE=$(date "+%B %d, %Y")

# Get machine name
echo "Which machine are you on?"
echo "1) Personal Laptop"
echo "2) Office"
read -p "Enter choice (1-2): " machine_choice

case $machine_choice in
  1) MACHINE="Personal Laptop" ;;
  2) MACHINE="Office" ;;
  *) MACHINE="Unknown" ;;
esac

# Get task info
echo ""
read -p "What did you just complete? (e.g., Button component): " TASK_COMPLETED
read -p "What's next? (e.g., Input component): " NEXT_TASK
read -p "How many hours did you work?: " HOURS_WORKED

# Get optional learning
echo ""
read -p "Did you learn something new? (y/n): " HAS_LEARNING
if [ "$HAS_LEARNING" = "y" ]; then
  read -p "What did you learn?: " LEARNING
fi

echo ""
echo "📝 Updating memory files..."

# Update current-task.md header
sed -i '' "s/> \*\*Last Updated:\*\* .*/> **Last Updated:** $CURRENT_DATE - $MACHINE  /" memories/repo/current-task.md

echo "✅ Updated current-task.md"

# Add session to progress.md
SESSION_ENTRY="### $CURRENT_DATE ($MACHINE) - $HOURS_WORKED hours\n- ✅ Completed $TASK_COMPLETED"
if [ "$HAS_LEARNING" = "y" ]; then
  SESSION_ENTRY="$SESSION_ENTRY\n- 📝 Learned: $LEARNING"
fi

# This is a placeholder - you'll need to manually add to progress.md
echo "$SESSION_ENTRY" >> memories/repo/session-temp.md

echo "✅ Session entry saved to session-temp.md (copy to progress.md)"

# Prepare commit message
COMMIT_MSG="feat: $TASK_COMPLETED

✅ Completed $TASK_COMPLETED"

if [ "$HAS_LEARNING" = "y" ]; then
  COMMIT_MSG="$COMMIT_MSG
📝 Learned: $LEARNING"
fi

COMMIT_MSG="$COMMIT_MSG
🎯 Next: $NEXT_TASK

Machine: $MACHINE
Time: $HOURS_WORKED hours"

echo ""
echo "📋 Suggested commit message:"
echo "=============================="
echo "$COMMIT_MSG"
echo "=============================="
echo ""

# Save commit message to temp file
echo "$COMMIT_MSG" > .git-commit-msg-temp

echo "💡 Next steps:"
echo "1. Manually update memories/repo/current-task.md (mark task complete, update next task)"
echo "2. Manually update memories/repo/progress.md (add session entry from session-temp.md)"
echo "3. Run: git add ."
echo "4. Run: git commit -F .git-commit-msg-temp"
echo "5. Run: git push origin develop"
echo ""
echo "🚀 Done! Happy coding!"
