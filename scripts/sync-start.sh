#!/bin/bash

# 🚀 Start Session Script
# Run this when you start coding on any machine

echo "🚀 FinFlow - Starting Session"
echo "=============================="
echo ""

# Check current branch
BRANCH=$(git branch --show-current)
echo "📍 Current branch: $BRANCH"

if [ "$BRANCH" != "develop" ]; then
  echo "⚠️  Warning: You're not on develop branch!"
  read -p "Switch to develop? (y/n): " SWITCH
  if [ "$SWITCH" = "y" ]; then
    git checkout develop
  fi
fi

echo ""
echo "⬇️  Pulling latest changes..."
git pull origin develop

if [ $? -eq 0 ]; then
  echo "✅ Successfully pulled latest code"
else
  echo "❌ Pull failed! Check for conflicts."
  exit 1
fi

echo ""
echo "📖 Current Status:"
echo "===================="
echo ""

# Show current task
echo "📌 CURRENT TASK:"
head -20 memories/repo/current-task.md
echo ""

echo "📊 RECENT PROGRESS:"
tail -15 memories/repo/progress.md
echo ""

echo "🎯 NEXT STEPS:"
head -30 memories/repo/next-steps.md
echo ""

echo "=============================="
echo "🔥 You're all synced and ready to code!"
echo "=============================="
