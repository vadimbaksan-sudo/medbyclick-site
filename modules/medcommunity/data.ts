import type { ForumThread } from "./types";

export const threads: ForumThread[] = [
  {
    id: "t1",
    title: "Getting a second opinion on breast cancer staging — my experience",
    excerpt: "After my initial diagnosis at a local hospital, I wasn't satisfied. Here's how I navigated getting a second opinion at Sheba and what changed...",
    author: "Anna M.",
    category: "Oncology",
    replies: 47,
    views: 1284,
    lastActivity: "2 hours ago",
    pinned: true,
  },
  {
    id: "t2",
    title: "Which cardiologist do you recommend for complex arrhythmia in Israel?",
    excerpt: "My father was just diagnosed with a rare arrhythmia. His current doctor is excellent but we want a second set of eyes before the ablation procedure...",
    author: "Dmitri V.",
    category: "Cardiology",
    replies: 23,
    views: 891,
    lastActivity: "5 hours ago",
  },
  {
    id: "t3",
    title: "Treatment-resistant MS — has anyone tried the new DMT protocol?",
    excerpt: "Three years in, two DMTs that didn't work. My neurologist mentioned a new protocol from the Goldberg MS clinic. Looking for others who've been through it...",
    author: "Marina S.",
    category: "Neurology",
    replies: 61,
    views: 2103,
    lastActivity: "Yesterday",
  },
  {
    id: "t4",
    title: "How to prepare medical records for an international specialist",
    excerpt: "I spent three weeks getting my records translated and summarized for a consultation in Germany. Here's the exact checklist I used and what the specialist actually needed...",
    author: "Irina P.",
    category: "Patient Tips",
    replies: 38,
    views: 3471,
    lastActivity: "2 days ago",
    pinned: true,
  },
];

export const categories = ["All", "Oncology", "Cardiology", "Neurology", "Rare Diseases", "Patient Tips", "General"];
