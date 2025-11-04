export const metadata = {
  title: 'Chinese Dota Players - Tier 1 Tournaments 2025',
  description: 'Chinese Dota 2 players who participated in Liquipedia Tier 1 tournaments in 2025',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, fontFamily: 'system-ui, sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
