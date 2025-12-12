import { ReactNode } from 'react';
import { Locale, useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Card from './components/Card';
import {
  Mail,
  Smartphone,
  Settings,
  MapPin,
  Github,
  Archive,
} from 'lucide-react';
import { phone, email } from '@/constants/info';
import BusinessCardCode from './components/BusinessCardCode';

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
  const name = t('name');
  const job = t('job');
  const location = t('location');
  const github = t('github');
  const velog = t('velog');

  return (
    <main>
      <Card>
        {/* 명함 앞면 */}
        <div className="relative size-full overflow-hidden bg-slate-400 dark:bg-gray-800 outline-2 outline-white -outline-offset-[20px]">
          <div className="absolute top-1/12 right-1/2 md:right-1/12 flex flex-col justify-center gap-4 max-md:translate-x-1/2">
            <div className="text-3xl xs:text-5xl lg:text-7xl text-nowrap">
              {name}
            </div>
          </div>

          <div className="absolute top-3/5 left-1/2 -translate-x-1/2 -translate-y-1/2 text-nowrap flex flex-col md:flex-row items-center justify-center w-full max-md:gap-10">
            <div className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl flex-1 justify-center flex max-md:border-t-2 max-md:pt-10">
              {job}
            </div>
            {/* TODO: 버튼 액션을 주려면 버튼 부분을 클라이언트 컴포넌트로 빼내야함. 또한 SSR 에 icon 및 text 부분을 적용하려면 서버컴포넌트에 남겨야함. */}
            <div className="flex flex-col justify-center gap-4 flex-1 md:border-l-2 max-md:border-t-2 max-md:pt-10">
              {[
                { icon: <MapPin size={18} />, text: location },
                { icon: <Smartphone size={18} />, text: phone },
                { icon: <Mail size={18} />, text: email },
                { icon: <Github size={18} />, text: github },
                { icon: <Archive size={18} />, text: velog },
              ].map(({ icon, text }) => (
                <div className="flex items-center gap-2 md:pl-20" key={text}>
                  {icon}
                  <span className="text-xs xs:text-sm sm:text-base">
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 명함 뒷면 */}
        <div className="relative w-full h-full bg-stone-200 dark:bg-stone-900">
          <div className="p-4 flex items-center justify-between h-12 gap-1">
            <div className="flex gap-2">
              <div className="size-4 rounded-full bg-red-400" />
              <div className="size-4 rounded-full bg-yellow-400" />
              <div className="size-4 rounded-full bg-green-400" />
            </div>
            <div className="text-nowrap truncate">Business Card.json</div>
            <div>
              <Settings />
            </div>
          </div>
          <BusinessCardCode name={name} job={job} />
        </div>
      </Card>
      <div className="h-[200vh] bg-red-500"> 하단 요소</div>
    </main>
  );
}
