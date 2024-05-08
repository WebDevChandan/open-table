import type { Metadata } from 'next'
import './globals.css'
import NavBar from './components/NavBar'
import AuthContext from './context/AuthContext'

export const metadata: Metadata = {
  title: 'OpenTable',
  description: 'This is Open Table Clone next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <main className="bg-gray-100 min-h-screen w-screen">
          <AuthContext>
            <main className="max-w-screen-2xl m-auto bg-white">
              <NavBar />
              {children}
            </main>
          </AuthContext>
        </main>
      </body>
    </html>
  )
}
