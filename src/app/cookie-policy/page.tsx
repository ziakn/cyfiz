import Link from "next/link";

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-[#F7F5FA] px-4 py-16 text-[#07133D] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-sm font-bold text-[#2B167C]">Back to home</Link>

        <section className="mt-8 rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm sm:p-10">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#2B167C]">Privacy</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-[#07133D]">Cookie Policy</h1>
          <p className="mt-4 text-sm leading-7 text-zinc-600">
            This policy explains how Cyfiz uses cookies and similar browser storage. It should be read together with our privacy policy.
          </p>

          <div className="mt-10 space-y-8">
            <section>
              <h2 className="text-xl font-black text-[#07133D]">What Cookies Are</h2>
              <p className="mt-3 text-sm leading-7 text-zinc-600">
                Cookies are small files stored on your device. Browser storage, such as local storage, may also be used to remember your privacy choices.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black text-[#07133D]">Cookie Categories</h2>
              <div className="mt-4 grid gap-4">
                <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5">
                  <h3 className="text-sm font-black text-[#07133D]">Strictly Necessary Cookies</h3>
                  <p className="mt-2 text-sm leading-7 text-zinc-600">
                    These are required for secure login, admin access, portal sessions, and core website functionality. They cannot be disabled through the cookie banner.
                  </p>
                </div>

                <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5">
                  <h3 className="text-sm font-black text-[#07133D]">Analytics Cookies</h3>
                  <p className="mt-2 text-sm leading-7 text-zinc-600">
                    These help us understand how visitors use the site and improve Cyfiz content. They are only enabled if you accept them.
                  </p>
                </div>

                <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5">
                  <h3 className="text-sm font-black text-[#07133D]">Marketing Cookies</h3>
                  <p className="mt-2 text-sm leading-7 text-zinc-600">
                    These may support relevant outreach or campaign measurement. They are only enabled if you accept them.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-black text-[#07133D]">Your Choices</h2>
              <p className="mt-3 text-sm leading-7 text-zinc-600">
                When you first visit Cyfiz, you can accept all optional cookies, reject optional cookies, or manage categories individually. Your choice is saved in your browser using local storage.
              </p>
              <p className="mt-3 text-sm leading-7 text-zinc-600">
                You can change your preference by clearing your browser site data for Cyfiz, then visiting the site again.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black text-[#07133D]">Current Use</h2>
              <p className="mt-3 text-sm leading-7 text-zinc-600">
                Cyfiz currently uses necessary authentication cookies for admin and portal access. Optional categories are provided so visitors can make a choice before any future analytics or marketing cookies are used.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black text-[#07133D]">Contact</h2>
              <p className="mt-3 text-sm leading-7 text-zinc-600">
                Questions about this policy can be sent to{" "}
                <a href="mailto:hello@cyfiz.ai" className="font-bold text-[#2B167C] underline underline-offset-4">
                  hello@cyfiz.ai
                </a>.
              </p>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
