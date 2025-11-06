import { Providers } from "../providers";
import { getDictionary } from "@/lib/i18n/dictionaries";
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
  const resolvedParams = await params;
  const dict = await getDictionary(resolvedParams.lang as "en" | "ko");

  return (
    <html lang={resolvedParams.lang}>
      <body>
        <Providers>
          <Navigation lang={resolvedParams.lang as "en" | "ko"} dict={dict} />
          <main>{children}</main>
          <Footer lang={resolvedParams.lang as "en" | "ko"} dict={dict} />
        </Providers>
      </body>
    </html>
  );
}
