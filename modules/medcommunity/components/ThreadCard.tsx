import type { ForumThread } from "../types";

export default function ThreadCard({ thread }: { thread: ForumThread }) {
  return (
    <div className="border border-slate-200 rounded-xl p-5 bg-white hover:border-amber-300 hover:shadow-sm transition-all cursor-pointer">
      <div className="flex items-center gap-2 mb-2">
        {thread.pinned && (
          <span className="text-xs font-medium bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Pinned</span>
        )}
        <span className="text-xs text-slate-400 font-medium">{thread.category}</span>
      </div>

      <h3 className="font-semibold text-slate-900 leading-snug mb-2 hover:text-amber-700 transition-colors">
        {thread.title}
      </h3>

      <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 mb-4">{thread.excerpt}</p>

      <div className="flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-semibold text-xs flex-shrink-0">
            {thread.author[0]}
          </div>
          <span>{thread.author}</span>
        </div>
        <div className="flex items-center gap-4">
          <span>💬 {thread.replies}</span>
          <span>👁 {thread.views.toLocaleString()}</span>
          <span>{thread.lastActivity}</span>
        </div>
      </div>
    </div>
  );
}
