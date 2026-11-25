import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Build the Next Thing — Afterlife Theory Labs',
  description: 'Tell Afterlife Theory Labs what we should build next. Share an idea in 50 characters or more.',
  metadataBase: new URL('https://build.afterlifetheorylabs.com'),
  openGraph: { title: 'Build the Next Thing — Afterlife Theory Labs', description: 'A good idea can start anywhere. Tell us what we should build next.', url: '/', siteName: 'Afterlife Theory Labs', type: 'website' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
