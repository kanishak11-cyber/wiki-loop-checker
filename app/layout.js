import { Roboto } from 'next/font/google'
import './globals.css'

const inter = Roboto({ subsets: ['latin'] , weight: ['400']})

export const metadata = {
  title: 'WIKI LOOP CHECKER',
  description: 'wikipedia loop checker',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50`}>
      <h1 className="md:text-4xl text-2xl font-bold text-indigo-800  p-6 text-center">
        Wikipedia Loop Checker
      </h1>
        {children}</body>
    </html>
  )
}
