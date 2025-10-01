import { ReactNode } from 'react';
import { Locale, useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Card from './components/Card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Mail, Phone, Github, BookOpenText, ExternalLink } from 'lucide-react';
import { phone, email } from '@/constants/info';

type Props = {
  children: ReactNode;
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata(props: Omit<Props, 'children'>) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'Home' });

  return {
    title: t('title'),
  };
}

export default function Home() {
  const t = useTranslations('Home');
  return (
    <main>
      <Card>
        <div className="relative size-full overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
          <div className="absolute top-1/12 left-1/12 flex flex-col justify-center gap-4">
            <h1 className="text-base xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl">
              {t('name')}
            </h1>
            <h2 className="text-xs xs:text-2xl sm:text-4xl md:text-5xl lg:text-6xl">
              {t('job')}
            </h2>
          </div>

          <div className="absolute bottom-1/12 right-1/12 flex flex-col justify-center gap-4">
            <span className="text-sm">{phone}</span>
            <span className="text-sm">{email}</span>
            <div>서울 특별시</div>
          </div>
        </div>

        {/* 명함 뒷면 */}
        <div className="relative w-full h-full bg-zinc-950 text-zinc-100">
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <h2 className="text-lg font-semibold tracking-tight">Links</h2>
              <p className="mt-1 text-sm text-zinc-300">더 알아보기</p>
              <div className="mt-6 grid grid-cols-1 gap-3">
                <Button asChild variant="secondary" className="justify-between">
                  <Link href="https://velog.io/@yp071704" target="_blank">
                    <span className="inline-flex items-center gap-2">
                      <BookOpenText className="size-4" /> Velog
                    </span>
                    <ExternalLink className="size-4 opacity-70" />
                  </Link>
                </Button>

                <Button asChild variant="secondary" className="justify-between">
                  <Link href="https://github.com/yponion" target="_blank">
                    <span className="inline-flex items-center gap-2">
                      <Github className="size-4" /> GitHub
                    </span>
                    <ExternalLink className="size-4 opacity-70" />
                  </Link>
                </Button>
              </div>

              <div className="mt-6 rounded-xl border border-dashed border-white/15 p-6 text-center">
                <div className="mx-auto size-24 rounded-md bg-white/10" />
                <p className="mt-3 text-xs text-zinc-400">QR Code</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
      <div className="h-[200vh] bg-red-500"> 하단 요소</div>
    </main>
  );
}
