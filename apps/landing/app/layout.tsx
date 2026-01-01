import "./globals.css";

export const metadata = {
  title: "InfinityX",
  description:
    "Developer-first platform for building, deploying, and monitoring automated workflows",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
