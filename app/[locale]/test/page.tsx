import { useTranslations } from 'next-intl';

export default function Test() {
  const t = useTranslations('Test');

  return <div>{t('title')}</div>;
}
