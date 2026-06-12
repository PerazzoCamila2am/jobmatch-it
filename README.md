# JobMatch IT

JobMatch IT is a smart job discovery and tracking platform focused on technology roles.

The app helps users find, compare and prioritize IT job opportunities based on their skills, the reliability of each offer, job language, location, modality and application status.

Unlike a traditional job board, JobMatch IT does not only list jobs. It analyzes each opportunity and gives the user a clearer way to decide where to apply first.

## Main features

* Multi-source job aggregation
* Technical skill matching
* Job trust scoring
* Opportunity ranking
* Country and location filtering
* Language filtering
* Job pagination
* Saved applications tracker
* Application status management
* Personalized learning plan
* Local persistence with LocalStorage
* Responsive dark UI

## How it works

JobMatch IT collects job opportunities from different public job sources and normalizes them into a single internal format.

Each job is analyzed using several criteria:

* Required technologies
* User skills
* Source reliability
* Company information
* Original job URL
* Description quality
* Suspicious wording
* Language detection
* Location and modality

Based on that analysis, the app calculates:

* Technical match score
* Trust score
* Opportunity score

This allows users to prioritize the most relevant and reliable opportunities.

## Opportunity Score

The Opportunity Score combines two important signals:

```txt
65% technical match
35% job trust score
```

This means that the best opportunities are not only those that match the user's skills, but also those that appear more complete and reliable.

## Job Trust Score

The trust algorithm evaluates each job using signals such as:

* Recognized source
* Identified company
* Original job URL
* Complete description
* Detectable technologies
* Known company names
* Suspicious keywords

The result is shown as:

```txt
High trust
Medium trust
Low trust
```

This helps users avoid wasting time on unclear or low-quality job posts.

## Learning Plan

The learning plan detects which technologies appear most often as missing skills across the analyzed jobs.

For each recommended skill, the app shows:

* Priority level
* Number of job opportunities where the skill appears
* Practical recommendation
* Mini project idea
* Action to add the skill to the user's profile

When the user adds a recommended skill, the app recalculates matches and updates the opportunity ranking automatically.

## Application Tracker

Users can save job opportunities and manage their application status.

Available statuses:

* Saved
* Applied
* Interview
* Technical test
* Rejected

Saved jobs are persisted locally, so the user can continue tracking applications after refreshing the page.

## Tech stack

* React
* TypeScript
* Vite
* Tailwind CSS
* LocalStorage
* Public job APIs

## Project structure

```txt
src/
├── components/
│   ├── ApplicationsTracker.tsx
│   ├── Dashboard.tsx
│   ├── DetectedSkillsAnalyzer.tsx
│   ├── FeaturedOpportunity.tsx
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── JobCard.tsx
│   ├── JobFilters.tsx
│   ├── JobList.tsx
│   ├── LearningPlan.tsx
│   ├── MatchBadge.tsx
│   └── SkillForm.tsx
├── data/
├── services/
├── types/
└── utils/
```

## Getting started

Clone the repository:

```bash
git clone https://github.com/PerazzoCamila2am/jobmatch-it.git
```

Go to the project folder:

```bash
cd jobmatch-it
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

## Available scripts

```bash
npm run dev
```

Starts the development server.

```bash
npm run build
```

Creates a production build.

```bash
npm run preview
```

Previews the production build locally.

```bash
npm run lint
```

Runs code linting.

## Current product focus

JobMatch IT is being developed as a product-oriented job matching platform.

The current focus is to improve:

* Job quality evaluation
* Better filtering
* More reliable job sources
* User preferences
* Saved opportunity management
* Personalized recommendations

## Future improvements

* User preferred countries
* User preferred languages
* Advanced job source analytics
* Better company reputation scoring
* Backend persistence
* Authentication
* User profiles
* Email alerts
* Saved search preferences
* Admin dashboard for sources
* More advanced recommendation engine

## Disclaimer

JobMatch IT uses public job data sources and internal scoring algorithms to help users prioritize opportunities. The trust score is an assistive signal and should not be considered a definitive verification of a company or job offer.

Users should always review the original job post before applying.
