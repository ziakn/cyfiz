"use client";

export default function ContactForm() {
  return (
    <form className="mt-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-bold text-zinc-600 dark:text-zinc-400">Name</label>
          <input
            type="text"
            placeholder="Your name"
            className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm focus:border-zinc-400 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-white transition-all"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-bold text-zinc-600 dark:text-zinc-400">Email</label>
          <input
            type="email"
            placeholder="your@email.com"
            className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm focus:border-zinc-400 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-white transition-all"
          />
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-bold text-zinc-600 dark:text-zinc-400">Subject</label>
        <input
          type="text"
          placeholder="What's this about?"
          className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm focus:border-zinc-400 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-white transition-all"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-bold text-zinc-600 dark:text-zinc-400">Message</label>
        <textarea
          rows={5}
          placeholder="Your message..."
          className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm focus:border-zinc-400 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-white transition-all resize-none"
        />
      </div>
      <button
        type="submit"
        className="rounded-full bg-zinc-900 px-10 py-3 text-sm font-bold text-white transition-all hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        Send Message →
      </button>
    </form>
  );
}
