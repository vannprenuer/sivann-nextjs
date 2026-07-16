import './globals.css';

export const metadata = {
  title: 'TE Sivann — Consultant & Coach on Digital, Startup, Webstigy',
  description: 'The Art of Non-ostentatious: Choose a life of action, not one of ostentation.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700;800&family=Playfair+Display:ital@1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
