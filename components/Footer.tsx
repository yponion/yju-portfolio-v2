'use client';

import { Mail } from 'lucide-react';
import Link from '@/components/Link';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('Footer');
  const date = new Date();
  const year = date.getFullYear().toString();

  return (
    <footer className="justify-center flex px-4">
      <div className="w-full max-w-5xl border-t py-4">
        <div className="flex justify-between flex-wrap">
          <div className="flex gap-2 max-xs:flex-col max-xs:items-start xs:items-center">
            <small>{t('copyright', { year })}</small>
            <div className="w-px h-6 bg-border hidden xs:block" />
            <Button variant="link" className="p-0" asChild>
              <Link href="/sitemap">{t('sitemap')}</Link>
            </Button>
          </div>
          <Link
            href="mailto:yp071704@gmail.com"
            className="flex items-center gap-2"
          >
            <Mail className="size-4" />
            <small>yp071704@gmail.com</small>
          </Link>
        </div>
      </div>
    </footer>
  );
}
