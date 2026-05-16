# FinFlow - React Native Mastery Project 🚀

## 🎯 Project Goal
Build a **production-grade React Native app** covering ALL skills required for **12-15 LPA senior RN developer roles**.

---

## 👨‍�💻 Developer Context
- **Current Level:** Intermediate RN (knows basics, Redux, built apps)
- **Work Schedule:** 10-7 job + 2hr commute
- **Coding Time:** 10-15 hours/week (1.5-2hrs weekdays, 4-5hrs weekends)
- **Target:** Master React Native from scratch with production-level confidence
- **Timeline:** 3-4 months (12-16 weeks)

---

## 📱 App Architecture: FinFlow

**The App:** AI-powered expense tracking + social feed + workspace + assistant

**Why This App?**
- Covers 95% of senior RN skills in ONE project
- Natural use cases for AI, real-time, payments, charts
- Portfolio-ready for interviews
- Demonstrates product thinking + technical depth

---

## 🏗️ Four Core Modules

### 📊 Module 1: Expense Tracker (CORE) - Weeks 1-5

**What You'll Build:**
- Complete expense CRUD with categories
- AI-powered auto-categorization (OpenAI)
- Receipt scanning (OCR)
- Interactive charts & analytics
- Offline-first architecture

**Primary Skills Learned:**

#### State Management
- ✅ Zustand (global state - simple & powerful)
- ✅ React Query (server state, caching, mutations)
- ✅ MMKV (high-performance offline storage)
- ✅ Global Cache Strategy (React Query + MMKV)

#### TypeScript
- ✅ Strict typing (ViewStyle, TextStyle, ImageStyle)
- ✅ Advanced types (generics, utility types)
- ✅ Type-safe Zustand stores & React Query

#### UI/UX
- ✅ Atomic Design Pattern (atoms → molecules → organisms → templates)
- ✅ React Hook Form (form validation)
- ✅ Custom Hooks
- ✅ Responsive UI (react-native-size-matters)
- ✅ Font Integration (custom fonts)
- ✅ Vector Icons
- ✅ SVG support

#### Backend Integration
- ✅ Supabase Auth (Google Sign-In, session management)
- ✅ Supabase Database (PostgreSQL)
- ✅ REST API integration
- ✅ Image upload to Supabase Storage

#### Performance
- ✅ Optimized re-renders
- ✅ Memoization strategies
- ✅ List virtualization basics

#### AI Integration
- ✅ OpenAI API integration
- ✅ Prompt engineering
- ✅ Receipt OCR (Tesseract or Cloud Vision API)

**Screens:**
1. Splash Screen (react-native-splash-screen)
2. Auth Flow (Login/Signup with Google)
3. Dashboard (Charts, Summary, Quick Stats)
4. Add/Edit Expense (with AI suggestions)
5. Expense List (categorized, filterable)
6. Expense Details (receipt viewer)
7. Categories Management
8. Settings

**Component Structure (Atomic Design):**
```
src/components/
├── atoms/
│   ├── Button/
│   ├── Input/
│   ├── Icon/
│   └── Text/
├── molecules/
│   ├── ExpenseCard/
│   ├── CategoryPicker/
│   └── DateRangePicker/
├── organisms/
│   ├── ExpenseForm/
│   ├── ChartSection/
│   └── ExpenseList/
└── templates/
    ├── DashboardTemplate/
    └── FormTemplate/
```

---

### 📰 Module 2: Feed (Social Layer) - Weeks 6-8

**What You'll Build:**
- Community feed for financial tips & expense sharing
- Real-time likes, comments, reactions
- Video posts support
- Infinite scroll with optimized performance
- Deep linking to specific posts

**Primary Skills Learned:**

#### Performance Optimization
- ✅ FlashList (ultra-fast lists)
- ✅ FastImage (image caching, optimization)
- ✅ React Native Video (optimized playback)
- ✅ Lazy loading & code splitting
- ✅ Memory leak prevention

#### Real-Time Features
- ✅ Supabase Realtime (real-time likes, comments, notifications)
- ✅ Optimistic updates
- ✅ Real-time subscriptions

#### REST API Integration
- ✅ Supabase REST API
- ✅ Custom API endpoints
- ✅ Pagination patterns
- ✅ Error handling
- ✅ Request/response interceptors

#### Advanced Interactions
- ✅ Reanimated (smooth animations)
- ✅ Gesture Handler (swipe actions, pull-to-refresh)
- ✅ Custom gestures

#### Deep Linking
- ✅ Universal Links (iOS)
- ✅ App Links (Android)
- ✅ Dynamic link handling
- ✅ Navigation from notifications

#### Sharing
- ✅ React Native Share
- ✅ Screenshot sharing
- ✅ Deep link generation

**Screens:**
1. Feed (infinite scroll, real-time updates)
2. Create Post (text, image, video)
3. Post Details (comments, likes)
4. User Profile (public profiles)
5. Notifications (real-time)

**Tech Decisions:**
- Use REST API for all data operations (Supabase REST API)
- Use Supabase Realtime for live updates (likes, comments, new posts)
- Focus on mastering one approach well rather than spreading thin

---

### 📝 Module 3: Workspace (Planning Tools) - Weeks 9-11

**What You'll Build:**
- Budget planning workspace
- Financial goals tracker
- Markdown notes for financial planning
- Collaborative budget sharing (real-time)
- Offline-first with sync conflict resolution

**Primary Skills Learned:**

#### Offline-First Architecture
- ✅ NetInfo (connectivity detection)
- ✅ Basic sync queue management
- ✅ Optimistic UI updates
- ✅ Background sync (when online)
- ✅ Last-write-wins strategy (simple conflict handling)

#### Advanced Data Management
- ✅ Complex state structures
- ✅ Data normalization
- ✅ Relational data handling
- ✅ Data migration strategies

#### Document Management
- ✅ Markdown rendering
- ✅ Rich text editing (optional)
- ✅ File management
- ✅ Version control concepts

#### Real-Time Collaboration
- ✅ Supabase Realtime (real-time budget updates)
- ✅ Multi-user presence indicators
- ✅ Live collaboration notifications

#### Advanced Caching
- ✅ Multi-layer cache strategy
- ✅ Cache invalidation patterns
- ✅ Stale-while-revalidate
- ✅ Global cache middleware

**Screens:**
1. Budget Planner (drag-drop categories)
2. Financial Goals (progress tracking)
3. Notes (markdown support)
4. Reports Generator (PDF export)
5. Collaborative Budgets

---

### 🤖 Module 4: AI Chat Assistant - Weeks 12-13

**What You'll Build:**
- Intelligent financial assistant
- Context-aware expense insights
- Voice input support
- Streaming AI responses
- Integration with all app data

**Primary Skills Learned:**

#### AI/ML Integration
- ✅ OpenAI Chat API (GPT-4)
- ✅ Streaming responses (real-time typing effect)
- ✅ Context window management
- ✅ Prompt engineering for finance
- ✅ Function calling (AI triggers app actions)

#### Real-Time Communication
- ✅ Supabase Realtime (for chat messages)
- ✅ Message queuing
- ✅ Retry logic
- ✅ Connection state management

#### Voice & Permissions
- ✅ Speech-to-Text
- ✅ Text-to-Speech
- ✅ Microphone permissions
- ✅ Audio recording

#### Smart Features
- ✅ Auto-suggestions
- ✅ Expense predictions
- ✅ Budget recommendations
- ✅ Trend analysis

**Screens:**
1. AI Chat Interface (ChatGPT-like)
2. Expense Insights Dashboard
3. Financial Recommendations
4. Ask AI (contextual help)

**Integration Points:**
- AI can read expenses, budgets, goals
- AI can create expenses via function calling
- AI provides personalized financial advice
- Voice commands for hands-free expense entry

---

### 🚀 Module 5: Production Polish - Weeks 14-16

**What You'll Add:**

#### Payment Integration
- ✅ Razorpay SDK (Indian payments)
- ✅ Stripe SDK (international payments)
- ✅ Subscription management
- ✅ Payment webhooks
- ✅ Receipt generation

**Premium Features:**
- Unlimited AI queries
- Advanced analytics
- Export to Excel/PDF
- Ad-free experience
- Priority support

#### OTA Updates
- ✅ CodePush (Microsoft AppCenter)
- ✅ Staged rollouts
- ✅ Rollback strategies
- ✅ Update prompts

#### Analytics & Monitoring
- ✅ Firebase Analytics (user behavior)
- ✅ Firebase Crashlytics (crash reporting)
- ✅ Sentry (error tracking)
- ✅ Performance monitoring
- ✅ Custom event tracking
- ✅ User funnels

#### Notifications
- ✅ Firebase Cloud Messaging (FCM)
- ✅ Local notifications
- ✅ Push notification handling
- ✅ Deep linking from notifications
- ✅ Notification scheduling

#### Maps Integration
- ✅ Google Maps SDK
- ✅ Expense location tagging
- ✅ Nearby expense visualization
- ✅ Location-based insights

#### Permissions
- ✅ Camera (receipt scanning)
- ✅ Photo Library (receipt upload)
- ✅ Location (expense locations)
- ✅ Notifications
- ✅ Permission request flows

#### Device Integration
- ✅ React Native Device Info
- ✅ Platform-specific features
- ✅ Dark mode support
- ✅ Haptic feedback

#### Testing
- ✅ Jest configuration
- ✅ React Native Testing Library
- ✅ Unit tests (utils, hooks)
- ✅ Component tests
- ✅ Integration tests
- ✅ E2E tests basics (optional: Detox/Maestro)

#### Build Generation
- ✅ Android APK/AAB generation
- ✅ iOS IPA generation
- ✅ Signing & certificates
- ✅ Build optimization
- ✅ ProGuard/R8 (Android)
- ✅ Bitcode (iOS)

#### New Architecture (Fabric) - PRIORITY
- ✅ Understanding Fabric vs Old Architecture
- ✅ Enabling New Architecture in project
- ✅ TurboModules concepts
- ✅ JSI (JavaScript Interface)
- ✅ Benefits & migration considerations
- ✅ Testing with new architecture enabled

**Additional Polish:**
- App icon & splash screen
- App Store screenshots
- Privacy policy & terms
- Onboarding flow
- Empty states
- Error boundaries
- Loading states
- Skeleton screens

---

## 🛠️ Complete Tech Stack

### Core Framework
```json
{
  "react-native": "^0.74.0",
  "react": "^18.2.0",
  "typescript": "^5.0.0"
}
```

### Navigation
```json
{
  "@react-navigation/native": "^6.1.0",
  "@react-navigation/native-stack": "^6.9.0",
  "@react-navigation/bottom-tabs": "^6.5.0",
  "@react-navigation/drawer": "^6.6.0"
}
```

### State Management
```json
{
  "zustand": "^4.4.0",
  "@tanstack/react-query": "^5.0.0"
}
```

### Data & Backend
```json
{
  "@supabase/supabase-js": "^2.38.0",
  "axios": "^1.6.0"
}
```

### Storage
```json
{
  "react-native-mmkv": "^2.11.0",
  "@react-native-async-storage/async-storage": "^1.21.0"
}
```

### UI/UX Libraries
```json
{
  "react-native-reanimated": "^3.6.0",
  "react-native-gesture-handler": "^2.14.0",
  "react-native-svg": "^14.1.0",
  "react-native-vector-icons": "^10.0.0",
  "@shopify/flash-list": "^1.6.0",
  "react-native-fast-image": "^8.6.0",
  "react-native-video": "^6.0.0"
}
```

### Forms & Validation
```json
{
  "react-hook-form": "^7.48.0",
  "zod": "^3.22.0",
  "@hookform/resolvers": "^3.3.0"
}
```

### AI & ML
```json
{
  "openai": "^4.20.0"
}
```

### Charts & Visualization
```json
{
  "victory-native": "^36.9.0",
  "react-native-chart-kit": "^6.12.0"
}
```

### Media & Files
```json
{
  "react-native-image-picker": "^7.1.0",
  "react-native-document-picker": "^9.1.0",
  "react-native-fs": "^2.20.0"
}
```

### Utilities
```json
{
  "@react-native-community/netinfo": "^11.2.0",
  "react-native-device-info": "^10.12.0",
  "date-fns": "^3.0.0",
  "react-native-toast-message": "^2.2.0"
}
```

### Payments
```json
{
  "react-native-razorpay": "^2.3.0",
  "@stripe/stripe-react-native": "^0.35.0"
}
```

### Firebase & Analytics
```json
{
  "@react-native-firebase/app": "^19.0.0",
  "@react-native-firebase/analytics": "^19.0.0",
  "@react-native-firebase/crashlytics": "^19.0.0",
  "@react-native-firebase/messaging": "^19.0.0"
}
```

### Maps
```json
{
  "react-native-maps": "^1.10.0"
}
```

### Permissions
```json
{
  "react-native-permissions": "^4.0.0"
}
```

### OTA Updates
```json
{
  "react-native-code-push": "^8.2.0"
}
```

### Testing
```json
{
  "@testing-library/react-native": "^12.4.0",
  "@testing-library/jest-native": "^5.4.0",
  "jest": "^29.7.0"
}
```

### Development
```json
{
  "reactotron-react-native": "^5.0.0",
  "react-native-flipper": "^0.212.0"
}
```

---

## 📚 Learning Methodology

### Week-by-Week Structure

#### **Phase 0: Foundation Setup (Week 1)**

**Goals:**
- ✅ Project structure setup
- ✅ Absolute imports configuration
- ✅ TypeScript strict mode
- ✅ Navigation skeleton
- ✅ Theme system (colors, fonts, spacing)
- ✅ Atomic design folder structure

**Tasks:**
1. Setup folder structure
2. Configure TypeScript paths
3. Setup navigation (Stack, Tab, Drawer)
4. Create theme constants
5. Setup Zustand + React Query
6. Configure Metro & Babel
7. Setup Flipper debugger

**Deliverable:** Empty app with proper architecture

---

### Daily Workflow (For Working Professionals)

#### Weekdays (Mon-Fri): 1.5-2 hours
**Focus:** ONE specific task
- 19:30-21:00 or 22:00-23:30 (after dinner/rest)
- Small, atomic commits
- Test what you built
- Document learnings

**Example Monday:**
- Read documentation (30 min)
- Implement feature (60 min)
- Test & commit (30 min)

#### Weekends (Sat-Sun): 4-5 hours
**Focus:** Integration & exploration
- Morning: 2-3 hours (deep focus)
- Evening: 2 hours (testing, cleanup)
- Refactoring
- Bug fixes
- Exploring new concepts
- Writing tests

---

### Documentation Strategy

**Files to Maintain:**

#### 1. `PROJECT_ROADMAP.md` (this file)
- Overall progress tracking
- Weekly updates

#### 2. `LEARNINGS.md`
- Aha moments
- Gotchas encountered
- Performance tips learned
- Best practices discovered

#### 3. `CHALLENGES.md`
- Problems faced & solutions
- Debugging stories
- Stack Overflow gems
- Custom workarounds

#### 4. `ARCHITECTURE.md`
- Design decisions
- Why chose X over Y
- Data flow diagrams
- State management strategy

#### 5. Module-specific `README.md`
```
src/modules/expense-tracker/README.md
src/modules/feed/README.md
src/modules/workspace/README.md
src/modules/ai-chat/README.md
```

---

## 🎯 Weekly Learning Pattern

### Week N Planning (Sunday Evening)
1. Review last week's progress
2. Pick 1-2 features for this week
3. Read relevant docs
4. Plan daily tasks

### Daily Execution (Mon-Fri)
1. **Focus on ONE thing**
2. Code → Test → Commit
3. Update progress

### Weekend Integration (Sat-Sun)
1. Connect pieces
2. Fix bugs
3. Refactor
4. Write tests
5. Update documentation

---

## 📊 Progress Tracking

### ✅ Phase 0: Foundation (Week 1)
**Status:** 🔴 NOT STARTED

- [ ] Review existing codebase
- [ ] Create folder structure
- [ ] Setup absolute imports
- [ ] Configure TypeScript strict mode
- [ ] Setup navigation (Stack, Tabs, Drawer)
- [ ] Create theme system
- [ ] Install core dependencies
- [ ] Setup Zustand stores
- [ ] Setup React Query
- [ ] Configure Supabase
- [ ] Setup Flipper
- [ ] Test hot reload & debugging

**Learnings:**
- [To be filled]

**Challenges:**
- [To be filled]

---

### 📊 Module 1: Expense Tracker (Weeks 2-5)
**Status:** 🔴 NOT STARTED

#### Week 2: Auth & Basic UI
- [ ] Splash screen
- [ ] Supabase auth setup
- [ ] Google Sign-In integration
- [ ] Auth screens (Login/Signup)
- [ ] Protected route logic
- [ ] Session persistence
- [ ] Basic theme implementation

#### Week 3: Expense CRUD
- [ ] Expense data model
- [ ] Add expense form (React Hook Form + Zod)
- [ ] Expense list (basic)
- [ ] Edit expense
- [ ] Delete expense
- [ ] Category management
- [ ] Date handling

#### Week 4: AI & Storage
- [ ] OpenAI API integration
- [ ] Auto-categorization
- [ ] Receipt image picker
- [ ] OCR implementation
- [ ] MMKV setup
- [ ] Offline-first logic
- [ ] React Query mutations

#### Week 5: Charts & Polish
- [ ] Dashboard charts (Victory Native)
- [ ] Expense analytics
- [ ] Filters & search
- [ ] Atomic design refactor
- [ ] Responsive UI
- [ ] Custom hooks extraction
- [ ] Module 1 testing

**Learnings:**
- [To be filled]

**Challenges:**
- [To be filled]

---

### 📰 Module 2: Feed (Weeks 6-8)
**Status:** 🔴 NOT STARTED

#### Week 6: Feed UI & REST API
- [ ] Supabase feed table setup
- [ ] REST API queries (React Query)
- [ ] FlashList implementation
- [ ] Post cards UI
- [ ] Image posts (FastImage)
- [ ] Infinite scroll
- [ ] Pull-to-refresh

#### Week 7: Real-Time Features
- [ ] Supabase Realtime setup
- [ ] Real-time likes (subscriptions)
- [ ] Real-time comments
- [ ] Optimistic updates
- [ ] Notification system
- [ ] Live post updates

#### Week 8: Advanced Interactions
- [ ] Reanimated animations
- [ ] Gesture handler (swipe actions)
- [ ] Video posts (react-native-video)
- [ ] Deep linking setup
- [ ] Share functionality
- [ ] WebView for external links
- [ ] Module 2 testing

**Learnings:**
- [To be filled]

---

### 📝 Module 3: Workspace (Weeks 9-11)
**Status:** 🔴 NOT STARTED

#### Week 9: Workspace Foundation
- [ ] Budget planner UI
- [ ] Goals tracker
- [ ] Markdown notes
- [ ] Data models

#### Week 10: Offline-First
- [ ] NetInfo integration
- [ ] Sync queue (basic)
- [ ] Last-write-wins strategy
- [ ] Background sync

#### Week 11: Collaboration
- [ ] Supabase Realtime (real-time budgets)
- [ ] Multi-user presence
- [ ] Reports generator
- [ ] Module 3 testing

**Learnings:**
- [To be filled]

---

### 🤖 Module 4: AI Chat (Weeks 12-13)
**Status:** 🔴 NOT STARTED

#### Week 12: Chat Foundation
- [ ] Chat UI
- [ ] OpenAI Chat API
- [ ] Streaming responses
- [ ] Context management
- [ ] Function calling

#### Week 13: Voice & Intelligence
- [ ] Speech-to-Text
- [ ] Voice commands
- [ ] Smart suggestions
- [ ] Integration with app data
- [ ] Module 4 testing

**Learnings:**
- [To be filled]

---

### 🚀 Module 5: Production (Weeks 14-16)
**Status:** 🔴 NOT STARTED

#### Week 14: Payments & Maps
- [ ] Razorpay integration
- [ ] Stripe integration
- [ ] Subscription flow
- [ ] Google Maps
- [ ] Location permissions

#### Week 15: Analytics & Updates
- [ ] Firebase Analytics
- [ ] Crashlytics
- [ ] FCM (push notifications)
- [ ] CodePush setup
- [ ] Performance monitoring

#### Week 16: Testing & Builds
- [ ] Jest tests
- [ ] Component tests
- [ ] Android build (APK/AAB)
- [ ] iOS build (IPA)
- [ ] Fabric architecture enablement
- [ ] Final polish

**Learnings:**
- [To be filled]

---

## 🎓 Additional Learning Resources

### Must-Read Documentation
- [ ] React Native Official Docs (New Architecture - Fabric)
- [ ] React Navigation Docs
- [ ] React Query Docs
- [ ] Zustand Docs
- [ ] Supabase Docs (REST API + Realtime)

### YouTube Channels
- Notjust.dev
- Simon Grimm (Ionic)
- William Candillon (Can it be done in RN?)
- Catalin Miron (Animations)

### Courses (Optional)
- React Native - The Practical Guide (Udemy)
- React Native Advanced Concepts (Udemy)

---

## 🔄 Git Strategy

### Branch Structure
```
main (production-ready)
  ↓
develop (integration branch)
  ↓
feature/module-1-auth
feature/module-1-expense-crud
feature/module-2-feed
...
```

### Commit Convention
```
feat: add expense creation form
fix: resolve image picker crash on Android
refactor: extract category picker to molecule
docs: update Module 1 progress
test: add expense CRUD tests
perf: optimize FlashList rendering
```

---

## 🎯 Success Metrics

By the end of this project, you will be able to:

### Technical Skills
- ✅ Build production RN apps from absolute scratch
- ✅ Make architectural decisions confidently (state management, API design)
- ✅ Handle modern state management (Zustand + React Query)
- ✅ Optimize app performance (60 FPS, minimal memory)
- ✅ Integrate 15+ third-party services
- ✅ Write clean, maintainable, testable TypeScript
- ✅ Debug production issues efficiently
- ✅ Handle offline-first architecture
- ✅ Implement real-time features
- ✅ Work with AI APIs
- ✅ Deploy to App Store & Play Store

### Interview Readiness
- ✅ Portfolio-grade project to showcase
- ✅ Can explain every technical decision
- ✅ Deep understanding of RN internals
- ✅ Experience with 95% of job requirements
- ✅ Confidence in system design discussions
- ✅ Real production experience (payments, analytics, OTA)

### Package Expectation
**3+ years experience equivalent:**
- Mid-level: 8-12 LPA
- Senior: 12-18 LPA (with this depth)
- Lead: 18-25 LPA (with team projects)

---

## 🚨 Important Reminders

### Don't Get Overwhelmed
- This is a 16-week journey
- One week at a time
- One feature at a time
- Progress > Perfection

### When Stuck
1. Google the exact error
2. Check official docs
3. Ask in Discord/Reddit (r/reactnative)
4. StackOverflow
5. GitHub Issues
6. Ask AI assistant (ChatGPT/Claude)

### Consistency > Intensity
- 2 hours daily > 14 hours Sunday only
- Small commits daily > massive PR weekly
- Incremental learning > cramming

### Document Everything
- Future you will thank present you
- Great for interview stories
- Portfolio blog posts
- Knowledge base for others

---

## 🔥 Next Immediate Steps

1. ✅ **Review current project structure**
   - Check `package.json`
   - See what's already installed
   - Review existing code

2. ✅ **Phase 0 Setup (Week 1)**
   - Create folder structure
   - Install dependencies
   - Configure TypeScript
   - Setup navigation

3. ✅ **Module 1 Begins (Week 2)**
   - Splash screen
   - Authentication
   - First expense form

---

## 📝 Weekly Update Log

### Week 1 (DD/MM/YYYY - DD/MM/YYYY)
**Status:**
**Completed:**
**Challenges:**
**Learnings:**
**Next Week:**

---

## 💪 Motivation

> "The best time to plant a tree was 20 years ago. The second best time is now."

You have:
- ✅ Clear roadmap
- ✅ Realistic timeline
- ✅ Comprehensive skill coverage
- ✅ Structured approach

All you need is:
- ⏰ Consistency (2 hours/day)
- 🎯 Focus (one task at a time)
- 📚 Curiosity (read, learn, experiment)
- 💪 Persistence (bugs are learning opportunities)

**You've got this! 🚀**

---

---

## 🎁 Optional/Advanced (If Time Permits)

After completing all 5 modules, if you have time and want to go deeper:

### 1️⃣ **New Architecture (Fabric)** - HIGHEST PRIORITY
- Already included in Module 5
- Critical for modern RN jobs
- Shows you're up-to-date with latest RN

### 2️⃣ **GraphQL + Apollo Client**
- Replace REST with GraphQL in Feed module
- Learn queries, mutations, subscriptions
- Compare performance with REST approach

### 3️⃣ **Socket.io**
- Add Socket.io alongside Supabase Realtime
- Build custom WebSocket server
- Shows deeper real-time knowledge

### 4️⃣ **Advanced Testing**
- E2E with Detox or Maestro
- Visual regression testing
- Performance testing

### 5️⃣ **CI/CD Pipeline**
- GitHub Actions for automated builds
- Automated testing on PR
- Automated deployment to TestFlight/PlayStore

**Note:** These are nice-to-have. Master the core first! 🎯

---

**Last Updated:** 16 May 2026
**Current Phase:** Phase 0 - Foundation Setup
**Overall Progress:** 0% → Target: 100% in 16 weeks
**Tech Stack:** Zustand + React Query + Supabase (REST + Realtime) + TypeScript
