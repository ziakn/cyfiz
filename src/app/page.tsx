import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Academy from "@/components/Academy";
import Tools from "@/components/Tools";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Academy />
        <Tools />
      </main>
      <Footer />
    </div>
  );
}
