import './globals.css'
import { Provider } from "@/components/ui/provider"

export const metadata = {
  title: 'Starknet-WebSocket',
  description: 'test of WebSocket connection for Starknet',
  icons: {
    icon: "./favicon.ico",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
