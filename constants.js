export const CATEGORIES = ["Frontend", "Backend", "Design", "Docs", "Marketing", "DevOps", "QA"];
export const PRIORITIES = ["low", "medium", "high"];
export const STATUSES   = ["todo", "in-progress", "done"];

export const PRIORITY_COLOR = { low: "#0F6E56", medium: "#BA7517", high: "#A32D2D" };
export const PRIORITY_BG    = { low: "#E1F5EE", medium: "#FAEEDA", high: "#FCEBEB" };

export const STATUS_COLOR = { "todo": "#185FA5", "in-progress": "#533AB7", "done": "#3B6D11" };
export const STATUS_BG    = { "todo": "#E6F1FB", "in-progress": "#EEEDFE", "done": "#EAF3DE" };
export const STATUS_LABEL = { "todo": "To Do", "in-progress": "In Progress", "done": "Done" };

export const AVATAR_COLORS = ["#185FA5", "#533AB7", "#0F6E56", "#993C1D", "#993556"];

export const INITIAL_TASKS = [
  {
    id: 1, title: "Design system overhaul",
    description: "Redesign all UI components with new brand guidelines",
    status: "in-progress", priority: "high", category: "Design",
    assignee: 2, createdBy: 1, dueDate: "2026-05-20", createdAt: "2026-05-01",
    comments: [{ id: 1, userId: 1, text: "Mockups ready for review", time: "2026-05-10" }],
    subtasks: [{ id: 1, text: "Typography audit", done: true }, { id: 2, text: "Color tokens", done: false }]
  },
  {
    id: 2, title: "API rate limiting",
    description: "Implement rate limiting on all public endpoints",
    status: "todo", priority: "high", category: "Backend",
    assignee: 1, createdBy: 1, dueDate: "2026-05-18", createdAt: "2026-05-02",
    comments: [], subtasks: [{ id: 1, text: "Research libraries", done: false }]
  },
  {
    id: 3, title: "Write onboarding docs",
    description: "Comprehensive documentation for new developers",
    status: "todo", priority: "medium", category: "Docs",
    assignee: 3, createdBy: 2, dueDate: "2026-05-25", createdAt: "2026-05-03",
    comments: [], subtasks: []
  },
  {
    id: 4, title: "Fix login page bug",
    description: "Password reset flow breaks on mobile Safari",
    status: "done", priority: "high", category: "Frontend",
    assignee: 2, createdBy: 1, dueDate: "2026-05-10", createdAt: "2026-05-01",
    comments: [{ id: 1, userId: 2, text: "Fixed and deployed!", time: "2026-05-09" }],
    subtasks: [{ id: 1, text: "Reproduce bug", done: true }, { id: 2, text: "Apply fix", done: true }]
  },
  {
    id: 5, title: "Q2 performance review",
    description: "Benchmark all microservices and optimize bottlenecks",
    status: "in-progress", priority: "medium", category: "Backend",
    assignee: 1, createdBy: 1, dueDate: "2026-05-30", createdAt: "2026-05-05",
    comments: [], subtasks: [{ id: 1, text: "Profile endpoints", done: true }]
  },
  {
    id: 6, title: "User analytics dashboard",
    description: "Internal analytics panel for the product team",
    status: "todo", priority: "low", category: "Frontend",
    assignee: 3, createdBy: 3, dueDate: "2026-06-05", createdAt: "2026-05-06",
    comments: [], subtasks: []
  },
];
