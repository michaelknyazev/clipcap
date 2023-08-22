import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <base href="./" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600&display=swap" rel="stylesheet"/>
        <link rel="apple-touch-icon" sizes="57x57" href="/_assets/share/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/_assets/share/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/_assets/share/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/_assets/share/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/_assets/share/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/_assets/share/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/_assets/share/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/_assets/share/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/_assets/share/apple-icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/_assets/share/android-icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/_assets/share/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/_assets/share/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/_assets/share/favicon-16x16.png" />
        <link rel="manifest" href="/_assets/share/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/_assets/share/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
