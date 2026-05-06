import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-zinc-950 py-12 text-zinc-400">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 border-t border-zinc-900 pt-8 md:flex-row">
          <p className="text-xs font-semibold">
            © {new Date().getFullYear()} DAIR.AI. All rights reserved.
          </p>
          <div className="flex gap-8">
            <Link href="/privacy" className="text-xs font-semibold transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs font-semibold transition-colors hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
