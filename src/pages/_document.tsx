import { Html, Head, Main, NextScript } from 'next/document';
import { metadata } from '@/constants';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="title" content={metadata.title} />
        <meta name="description" content={metadata.description} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:type" content="page" />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content={metadata.image} />
        <meta property="og:url" content={metadata.link} />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content={metadata.image} />
        <link rel="icon" href="/icons/favicon.ico" />
        <link rel="canonical" href={metadata.link} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
