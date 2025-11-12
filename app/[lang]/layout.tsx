import { Providers } from "../providers";
import {
  getDictionary,
  isLocale,
  type Locale,
} from "@/lib/i18n/dictionaries";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ko" }];
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const fallbackLocale: Locale = "en";
  const locale = isLocale(lang) ? lang : fallbackLocale;
  const dict = await getDictionary(locale);

  return (
    <Providers>
      <Navigation lang={locale} dict={dict} />
      <main>{children}</main>
      <Footer lang={locale} dict={dict} />
    </Providers>
  );
}
