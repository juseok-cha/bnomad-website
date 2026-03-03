import {
  getDictionary,
  type Locale,
} from "@/lib/i18n/dictionaries";
import { isLocale } from "@/lib/i18n/localeUtils";
import Hero from "@/components/sections/Hero";
import AboutSection from "@/components/sections/AboutSection";
import ProgramsSection from "@/components/sections/ProgramsSection";
import CTASection from "@/components/sections/CTASection";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const fallbackLocale: Locale = "en";
  const locale = isLocale(lang) ? lang : fallbackLocale;
  const dict = await getDictionary(locale);

  return (
    <>
      <Hero lang={locale} dict={dict} />
      <AboutSection lang={locale} dict={dict} />
      <ProgramsSection lang={locale} dict={dict} />
      <CTASection lang={locale} dict={dict} />
    </>
  );
}
