'use client';

import { useTranslations } from 'next-intl';
import { LocaleSwitcher } from './LocaleSwitcher';
import { ThemeSwitcher } from './ThemeSwitcher';
import { Menu, X } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import Link from '@/components/Link';
import { Button } from '@/components/ui/button';
import { useState, useEffect, useMemo } from 'react';
import { cn } from '@/lib/utils';

export default function Navigation({
  isFixedTop = false,
}: {
  isFixedTop?: boolean;
}) {
  const t = useTranslations('Navigation');
  const commonT = useTranslations('Common');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.documentElement.scrollTop = 0;
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const menu = useMemo(
    () => [
      {
        label: t('test'),
        href: '/test',
      },
    ],
    [t]
  );

  return (
    <>
      {isFixedTop && <div className="h-16" />}
      <div
        className={cn(
          'justify-center flex px-4 h-16 relative bg-background',
          isFixedTop && 'fixed top-0 left-0 right-0 z-10'
        )}
      >
        <div className="max-w-5xl justify-between flex-1 flex items-center">
          <Link href="/" className="break-keep">
            {commonT('service-name')}
          </Link>
          <div
            className={cn(
              'max-lg:bg-background max-lg:px-4 max-lg:transition-all max-lg:w-screen max-lg:duration-300 max-lg:block max-lg:h-0 max-lg:overflow-hidden max-lg:absolute max-lg:top-16 max-lg:left-0 max-lg:z-10',
              isOpen && 'max-lg:h-[calc(100dvh-64px)] max-lg:py-4'
            )}
          >
            <NavigationMenu>
              <NavigationMenuList className="max-lg:flex max-lg:flex-col max-lg:items-start">
                {menu.map((item) => (
                  <NavigationMenuItem key={item.href}>
                    <NavigationMenuLink
                      asChild
                      onClick={() => setIsOpen(false)}
                    >
                      <Link href={item.href}>{item.label}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="flex items-center gap-2">
            <LocaleSwitcher />
            <ThemeSwitcher />
            <Button
              className="lg:hidden relative"
              variant="outline"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              <X
                className={cn(
                  'absolute transition-all duration-300',
                  !isOpen && 'opacity-0'
                )}
              />
              <Menu
                className={cn(
                  'absolute transition-all duration-300',
                  isOpen && 'opacity-0'
                )}
              />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
