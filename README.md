# StudentFlow

A course and task management web app built for students to track coursework, manage assignment deadlines, and explore frontend resources.

## Features

- **Dashboard**: Quick stats (total, completed, pending tasks, and progress rate) plus upcoming assignments due within 7 days.
- **Task Tracker**: Create, filter (by status/priority), search, and toggle task completion. Data persists in `localStorage`.
- **Form Validation**: Form for adding tasks with instant validation and error feedback on blur/submit.
- **Course Catalog**: Filterable course directory by topics (React, JavaScript, Frontend, Next.js) with detailed syllabus views.
- **Resources**: Fetches frontend articles and tutorials from the Dev.to API using Next.js Server Components.
- **Responsive UI**: Built with Tailwind CSS, clean cards, and mobile navigation support.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Library**: React 19
- **State Management**: React Context API + LocalStorage
- **Styling**: Tailwind CSS v4
- **External Data**: Dev.to Articles API

## Project Structure

```text
my-app/
├── public/
│   └── not-found/
├── src/
│   ├── app/
│   │   ├── courses/         # Catalog & [id] details
│   │   ├── resources/       # External articles page
│   │   ├── tasks/           # Tasks list, [taskId], new task
│   │   ├── layout.jsx       # Root layout + Navbar/Footer
│   │   └── page.js          # Dashboard
│   ├── components/
│   │   ├── courses/
│   │   ├── dashboard/
│   │   ├── layout/
│   │   ├── resources/
│   │   └── tasks/
│   ├── context/             # TaskContext (state & storage)
│   ├── data/                # Initial courses and tasks
│   └── services/            # API fetch services
└── package.json
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for production

```bash
npm run build
npm run start
```
