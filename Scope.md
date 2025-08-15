# Cellosophy Popper - Project Scope & Progress Tracker

## Overview
A comprehensive cello education platform featuring two courses (PPPP & Cellosophy), sheet music store, and dual user dashboards for students and teachers. Built with Next.js, TypeScript, Stripe, MailerLite, and Prisma.

---

## 🎯 PRIMARY BUSINESS GOALS

### 1. **PPPP (Proper Popper Practice Project)** - Advanced Cohort Course
**Target Audience**: Advanced players (conservatory-bound high school → international soloists)
**Current Students**: US, Australia, Singapore across 3 cohorts
**Content**: 53 weeks of video lessons (staggered 2-week format = 106 pages)

#### ✅ **COMPLETED**
- [ ] Course structure defined (53 weeks mapped in `/src/data/pppp-course-structure.ts`)
- [ ] Student dashboard UI (`/pppp-student-dashboard`)
- [ ] Progress tracking visualization
- [ ] Week-by-week content organization
- [ ] Database schema for cohorts, etudes, videos

#### 🚧 **IN PROGRESS** 
- [ ] Stripe integration (partially done)
- [ ] Video content migration from YouTube unlisted

#### ❌ **TODO - HIGH PRIORITY**
- [ ] **AUTO-DRIP SYSTEM**: Automatic weekly content release (Saturdays 7AM ET)
- [ ] **COHORT MANAGEMENT**: Different cohorts see different content based on start date
- [ ] **VIDEO INTEGRATION**: Move 40+ existing YouTube videos into platform
- [ ] **EDUCATIONAL PRICING**: College/institution bulk pricing system
- [ ] **TEACHER PAYMENT SYSTEM**: Revenue sharing for teacher referrals

### 2. **Cellosophy** - Student Course with Teacher Portal
**Target Audience**: Students (via teacher recommendations)
**Business Model**: Pay teachers for referrals (hidden from students)

#### ✅ **COMPLETED**
- [ ] Student dashboard (`/cellosophy-student-dashboard`)
- [ ] Teacher landing page (`/cello-teachers`)
- [ ] Course overview pages
- [ ] Progress tracking for 16-piece curriculum

#### ❌ **TODO - HIGH PRIORITY**
- [ ] **TEACHER/STUDENT PORTAL SEPARATION**: Clear UX distinction
- [ ] **GOOGLE SSO**: 3x signup conversion improvement
- [ ] **TEACHER APPROVAL SYSTEM**: Teachers unlock next modules for students
- [ ] **TEACHER PAYMENT INTEGRATION**: Automated commission tracking
- [ ] **TEACHER DASHBOARD**: Manage students, track progress, earnings

### 3. **Sheet Music Store**
**Products**: Physical + digital sheet music with video previews

#### ✅ **COMPLETED**
- [ ] Product catalog system (`/cello-sheet-music`)
- [ ] Stripe product creation script
- [ ] Cart functionality with physical/digital distinction
- [ ] Shipping calculation for physical items
- [ ] Video preview linking

#### ❌ **TODO - HIGH PRIORITY**
- [ ] **DISCOVERY UX**: Better browsing/search (current challenge: "hard to see what's there")
- [ ] **DIGITAL FULFILLMENT**: Email delivery system for digital downloads
- [ ] **TEACHER DISCOUNTS**: Automated discount system for educators

---

## 🛠️ TECHNICAL INFRASTRUCTURE

### ✅ **COMPLETED INTEGRATIONS**
- [x] **Next.js 15** + TypeScript foundation
- [x] **Tailwind CSS** + Framer Motion animations
- [x] **Prisma ORM** with PostgreSQL
- [x] **Stripe** (partial - checkout & webhooks implemented)
- [x] **MailerLite** newsletter signup (needs group customization)
- [x] **Clerk/NextAuth** authentication setup

### 🚧 **PARTIALLY COMPLETED**
- [ ] **Stripe Integration**: 
  - ✅ Single course checkout
  - ✅ Cart checkout with shipping
  - ✅ Webhook handling
  - ❌ Subscription management
  - ❌ Digital product fulfillment
  - ❌ Educational pricing
- [ ] **MailerLite Integration**:
  - ✅ Basic newsletter signup
  - ❌ Segmented email sequences
  - ❌ Teacher vs student segmentation

### ❌ **TODO - INFRASTRUCTURE**
- [ ] **Automated Content Delivery**: PPPP weekly drip system
- [ ] **Google OAuth**: Teacher signup optimization
- [ ] **Email Automation**: Digital product delivery
- [ ] **Database Optimization**: User roles, permissions, progress tracking
- [ ] **Performance**: SEO optimization for AI search results

---

## 🎨 CONVERSION & UX OPTIMIZATION

### Current Conversion Goals
- **High-converting funnels** using best practices from:
  - Amy Porterfield (course sales)
  - Wes McDowell (web design)
  - Alex Hormozi (business strategy)
  - IncomeStreamSurfers (AI/development)

### ✅ **COMPLETED UX ELEMENTS**
- [x] Urgency banners with countdown timers
- [x] Social proof (student counts, testimonials)
- [x] Clear course category separation
- [x] Mobile-responsive design
- [x] Progress visualization components

### ❌ **TODO - CONVERSION OPTIMIZATION**
- [ ] **A/B Testing Framework**: Landing page variants
- [ ] **Video Sales Letters**: Create converting video content
- [ ] **Trust Signals**: Better social proof, guarantees
- [ ] **Funnel Optimization**: Reduce navigation, focus on conversion
- [ ] **SEO for AI**: Implement Wes McDowell's AI search optimization

---

## 📊 CONTENT STRATEGY

### Blog/Content Marketing
**Goal**: Build trust without creating rabbit holes that distract from purchases

#### ❌ **TODO**
- [ ] **Gated Content Strategy**: Free content that builds trust + funnels to paid
- [ ] **Video Content**: Product demos, technique tips
- [ ] **SEO Content**: AI-optimized articles for search visibility
- [ ] **Newsletter Sequences**: Nurture campaigns for different user types

---

## 🌐 DOMAIN & BRANDING STRATEGY

### Current Situation
- **Current**: Celloloft.com (private teaching studio)
- **Proposed**: Cellosophy.io (course platform)
- **Challenge**: Losing student recruitment ability

### ❌ **DECISION NEEDED**
- [ ] **Domain Strategy**: Keep Celloloft.com or migrate to Cellosophy.io?
- [ ] **About Page**: Single "About Eric" page if migrating away from studio
- [ ] **Brand Consolidation**: How to maintain teaching reputation while scaling courses

---

## 🔮 FUTURE FEATURES (Later Phases)
- [ ] **Pitchronome Integration**: Rebuild iOS apps (Nome, Pitchronome) for web
- [ ] **Advanced Analytics**: Student progress insights, teacher performance
- [ ] **Mobile App**: Native iOS/Android for better engagement
- [ ] **Live Classes**: Zoom integration for cohort sessions
- [ ] **Community Features**: Student forums, peer interaction

---

## ✅ ANSWERED QUESTIONS & DECISIONS

### PPPP Course Automation ✅
1. **Content Release**: Fully automated Saturday 7AM ET with admin pause switch for extra weeks
2. **Current Cohorts**: Keep existing cohorts, create sections for them in new system
3. **Video Hosting**: Keep YouTube for now (90-120min/week = cost effective), flag AWS migration for future

### Cellosophy Business Model ✅
4. **Teacher Payments**: $5/student + $5/certification (simple model, max $10/student)
5. **Student Progress**: Self-paced, teachers optional observers (no approval needed)
6. **Pricing Tiers**: 
   - With Teacher: $39/mo or $399/yr (teacher gets unique code/link)
   - Self-Study: $99/mo or $999/yr

### Technical Decisions ✅
7. **Authentication**: Need recommendation (see below)
8. **Teacher Verification**: Manual approval within 24 hours → auto-generate dashboard + unique code
9. **Priority**: PPPP automation first

---

## 🚨 REMAINING CLARIFYING QUESTIONS

## ✅ ANSWERED QUESTIONS ROUND 2

### Authentication & Tech Stack ✅
10. **Auth Choice**: Stick with Clerk (free tier, better Google SSO) - you have both installed already

### Sheet Music Store UX ✅  
11. **Discovery**: Need better UX than "shirt shop" layout - maybe sheet music store IRL experience
12. **Digital Delivery**: Download with auto-checked email subscription at checkout

### Video Hosting ✅
13. **Migration**: AWS when needed (YouTube is free so no rush to change)

### Conversion Strategy ✅
14. **Video Content**: Have unedited PPPP video, can do personal story, maybe free Popper unit
15. **A/B Testing**: Skip for now (not enough traffic)
16. **Email Sequences**: Created EmailMarketing.md for future development

### Business Priorities ✅
17. **Revenue Focus**: PPPP (one signup = entire year of sheet music revenue!)
18. **Launch Timeline**: ASAP once MVP ready

### PPPP Structure Details ✅
- **Pedagogical Order**: Not numerical (Week 1: Etude 11, Week 2: Etude 11+16, etc.)
- **Homepage Updates**: Weekly text updates + links to current week's etudes
- **Archive System**: Previous weeks move to "etudes studied" list
- **Video Template**: Simple YT embed template with 6-7 videos per page

---

## 🚨 NO MORE CLARIFYING QUESTIONS NEEDED!

All 18 questions answered! Ready to start building.

---

## 🔮 FUTURE FEATURES (Added from Answers)
- [ ] **AWS Video Migration**: Move from YouTube to AWS S3 + CloudFront when cost-effective
- [ ] **Teacher Certification Course**: Free course that increases teacher commissions
- [ ] **Advanced Teacher Analytics**: Optional progress monitoring tools
- [ ] **Pitchronome Integration**: Rebuild iOS apps (Nome, Pitchronome) for web

---

## 📋 IMMEDIATE NEXT STEPS

Based on your answers to the above questions, I recommend prioritizing:

1. **PPPP Automation System** (highest revenue impact)
2. **Cellosophy Teacher Portal** (scalability opportunity)  
3. **Sheet Music Store UX** (existing inventory optimization)
4. **Conversion Optimization** (maximize existing traffic)

Would you like to start with any specific area, or shall we work through the clarifying questions first?
