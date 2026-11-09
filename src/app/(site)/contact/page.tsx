import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact — Cyfiz",
  description: "Have questions or suggestions? Get in touch about an insight, a training, a quiz or a collaboration.",
};

export default function ContactPage() {
  return <ContactClient />;
}
