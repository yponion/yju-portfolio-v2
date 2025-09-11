import { Locale, useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

type Props = {
  children: React.ReactNode;
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
  return <div>{t('title')}</div>;
}
