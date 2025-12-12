'use client';

import { email, github, phone, portfolio, velog } from '@/constants/info';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco, dark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export default function BusinessCardCode({
  name,
  job,
}: {
  name: string;
  job: string;
}) {
  const { theme } = useTheme();
  const [style, setStyle] = useState(dark);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const changeStyle = () => {
      switch (theme) {
        case 'light':
          setStyle(docco);
          break;
        case 'dark':
          setStyle(dark);
          break;
        default:
          if (mediaQuery.matches) setStyle(dark);
          else setStyle(docco);
      }
    };
    changeStyle();
    mediaQuery.addEventListener('change', changeStyle);
    return () => mediaQuery.removeEventListener('change', changeStyle);
  }, [theme]);

  return (
    <SyntaxHighlighter
      language="json"
      style={style}
      showLineNumbers
      customStyle={{
        padding: '10px 20px 20px 20px',
        height: '100%',
        fontSize: 'clamp(10px, 3vw, 30px)',
      }}
    >
      {`{
    "name": "${name}",
    "title": "${job}",
    "contacts": {
        "phone": "${phone}",
        "email": "${email}",
  },
    "links": {
        "github": "${github}",
        "velog": "${velog}",
        "portfolio": "${portfolio}"
  }
}`}
    </SyntaxHighlighter>
  );
}
