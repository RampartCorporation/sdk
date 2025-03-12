export const metadata = {
  title: "Rampart SSO Example",
  description: "Rampart SSO Example",
  icons: {
    icon: "/icon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/icon.ico" />
      </head>
      <body
        data-new-gr-c-s-check-loaded="14.1226.0"
        data-gr-ext-installed=""
        data-gr-ext-disabled="forever"
      >
        {children}
      </body>
    </html>
  );
}
