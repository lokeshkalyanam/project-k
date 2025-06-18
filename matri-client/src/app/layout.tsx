// src/app/layout.tsx

import { ReactNode } from 'react'

/**
 * Root layout component for the application.
 * Wraps all pages rendered via Next.js App Router.
 *
 * @param {Object} props
 * @param {ReactNode} props.children - Nested page or layout content.
 * @returns {ReactNode} Rendered child components.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children
}
