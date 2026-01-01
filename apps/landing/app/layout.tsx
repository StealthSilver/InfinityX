import "./globals.css";

export const metadata = {
  title: "InfinityX",
  description:
    "Developer-first platform for building, deploying, and monitoring automated workflows",
  icons: {
    icon: "/inflogo.svg",
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
        <link rel="icon" href="/inflogo.svg" type="image/svg+xml" />
      </head>
      <body>{children}</body>
    </html>
  );
}
