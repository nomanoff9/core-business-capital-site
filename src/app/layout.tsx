import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Core Business Capital',
  description: 'Best Business Funding Solutions',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}