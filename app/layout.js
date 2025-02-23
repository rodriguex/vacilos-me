import "./globals.css";

export const metadata = {
  title: "Vacilos ME",
  description: "Quem vai pagar o nosso próximo salgadinho? Saiba aqui!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
