import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" href="http://www.manuel-videaste.com/img/watermark/cropped-Ludoc-Watermark-1-32x32.png" sizes="32x32" />
        <link rel="icon" href="http://www.manuel-videaste.com/img/watermark/cropped-Ludoc-Watermark-1-192x192.png" sizes="192x192" />
        <link rel="apple-touch-icon" href="http://www.manuel-videaste.com/img/watermark/cropped-Ludoc-Watermark-1-180x180.png" />
      </head>
      <body>{children}</body>
    </html>
  )
}
