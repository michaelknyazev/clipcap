import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <base href="./" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600&display=swap" rel="stylesheet"/>
        <link rel="apple-touch-icon" sizes="57x57" href="/static/share/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/static/share/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/static/share/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/static/share/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/static/share/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/static/share/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/static/share/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/static/share/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/static/share/apple-icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/static/share/android-icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/static/share/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/static/share/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/static/share/favicon-16x16.png" />
        <link rel="manifest" href="/static/share/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/static/share/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
