import type { Metadata } from 'next'

import './globals.css'

export const metadata: Metadata = {
  title: 'Maxime Parmentier Portfolio',
  authors: [{ name: 'Maxime Parmentier' }],
  description: 'Small portfolio website for Maxime Parmentier, recapitulating his work, studies and projects.',
  keywords: [
    'Developer',
    'Software Engineer',
    'Cloud Computing',
    'DevOps',
    'Backend',
    'Typescript',
    'Java',
    'Python',
    'Golang',
    'React',
    'NextJS'
  ]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className='h-full min-h-screen bg-black'
      >{children}</body>
    </html>
  )
}
