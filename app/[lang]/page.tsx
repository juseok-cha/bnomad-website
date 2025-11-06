import { getDictionary } from "@/lib/i18n/dictionaries";
import Hero from "@/components/sections/Hero";
import AboutSection from "@/components/sections/AboutSection";
import ProgramsSection from "@/components/sections/ProgramsSection";
import CTASection from "@/components/sections/CTASection";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const dict = await getDictionary(resolvedParams.lang as "en" | "ko");

  return (
    <>
      <Hero lang={resolvedParams.lang as "en" | "ko"} dict={dict} />
      <AboutSection lang={resolvedParams.lang as "en" | "ko"} dict={dict} />
      <ProgramsSection lang={resolvedParams.lang as "en" | "ko"} dict={dict} />
      <CTASection lang={resolvedParams.lang as "en" | "ko"} dict={dict} />
    </>
  );
}
