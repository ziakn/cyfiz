"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const CONSENT_KEY = "cyfiz_cookie_consent";

type ConsentState = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
};

function createConsent(analytics: boolean, marketing: boolean): ConsentState {
  return {
    necessary: true,
    analytics,
    marketing,
    updatedAt: new Date().toISOString(),
  };
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (!window.localStorage.getItem(CONSENT_KEY)) {
        setVisible(true);
      }
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  function saveConsent(nextConsent: ConsentState) {
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(nextConsent));
    setVisible(false);
  }

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 sm:px-6 sm:pb-6" role="dialog" aria-modal="true" aria-labelledby="cookie-consent-title">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-[#E9E4F2] bg-white shadow-2xl shadow-[#2B167C]/15">
        <div className="grid gap-0 lg:grid-cols-[1fr_360px]">
          <div className="p-5 sm:p-6">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#2B167C]">Privacy choices</p>
            <h2 id="cookie-consent-title" className="mt-2 text-xl font-black text-[#07133D]">Cookie preferences</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600">
              We use strictly necessary cookies for secure login and portal access. You can choose whether Cyfiz may use optional analytics and marketing cookies if they are added to the site.
            </p>
            <Link href="/cookie-policy" className="mt-3 inline-flex text-sm font-bold text-[#2B167C] underline underline-offset-4">
              Read the cookie policy
            </Link>

            {showPreferences && (
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-sm font-black text-[#07133D]">Necessary</h3>
                    <span className="rounded-full bg-zinc-200 px-2 py-1 text-[10px] font-black uppercase text-zinc-600">Always on</span>
                  </div>
                  <p className="mt-2 text-xs leading-5 text-zinc-500">Required for security, authentication, and core site functions.</p>
                </div>

                <label className="cursor-pointer rounded-xl border border-zinc-200 bg-white p-4 transition-colors hover:border-[#2B167C]/40">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-black text-[#07133D]">Analytics</span>
                    <input
                      type="checkbox"
                      checked={analytics}
                      onChange={(event) => setAnalytics(event.target.checked)}
                      className="h-5 w-5 accent-[#2B167C]"
                    />
                  </div>
                  <p className="mt-2 text-xs leading-5 text-zinc-500">Helps us understand site performance and improve content.</p>
                </label>

                <label className="cursor-pointer rounded-xl border border-zinc-200 bg-white p-4 transition-colors hover:border-[#2B167C]/40">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-black text-[#07133D]">Marketing</span>
                    <input
                      type="checkbox"
                      checked={marketing}
                      onChange={(event) => setMarketing(event.target.checked)}
                      className="h-5 w-5 accent-[#2B167C]"
                    />
                  </div>
                  <p className="mt-2 text-xs leading-5 text-zinc-500">Supports relevant outreach and campaign measurement.</p>
                </label>
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center gap-3 border-t border-zinc-100 bg-[#F7F5FA] p-5 sm:p-6 lg:border-l lg:border-t-0">
            <button
              type="button"
              onClick={() => saveConsent(createConsent(true, true))}
              className="w-full rounded-xl bg-[#2B167C] px-5 py-3 text-sm font-black text-white transition-colors hover:bg-[#241164]"
            >
              Accept all
            </button>
            <button
              type="button"
              onClick={() => saveConsent(createConsent(false, false))}
              className="w-full rounded-xl border border-[#2B167C] bg-white px-5 py-3 text-sm font-black text-[#2B167C] transition-colors hover:bg-[#F1EDFF]"
            >
              Reject optional
            </button>
            {showPreferences ? (
              <button
                type="button"
                onClick={() => saveConsent(createConsent(analytics, marketing))}
                className="w-full rounded-xl border border-zinc-200 bg-white px-5 py-3 text-sm font-black text-[#07133D] transition-colors hover:bg-zinc-50"
              >
                Save choices
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setShowPreferences(true)}
                className="w-full rounded-xl border border-zinc-200 bg-white px-5 py-3 text-sm font-black text-[#07133D] transition-colors hover:bg-zinc-50"
              >
                Manage choices
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
