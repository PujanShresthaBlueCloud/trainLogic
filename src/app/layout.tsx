import { DM_Sans } from "next/font/google";
import { Lato } from "next/font/google";
import Script from "next/script";
import "./globals.css";
// import Header from "@/components/Layout/Header/_index";
import Footer from "@/components/Layout/Footer";
import { ThemeProvider } from "next-themes";
import SessionProviderComp from "@/components/nextauth/SessionProvider";
import { AuthDialogProvider } from "./context/AuthDialogContext";
import ScrollToTop from "@/components/ScrollToTop";
import RetellChatWidget from "@/components/RetellChatWidget";
const dmsans = DM_Sans({ subsets: ["latin"] });

const lato = Lato({
  subsets: ["latin"],      // required
  weight: ["400", "700"],  // optional: normal & bold
  display: "swap",         // optional: font-display
})
export const metadata = {
  title: "Trained Logic",
};
export default function RootLayout({
  children,
  session,
}: Readonly<{
  children: React.ReactNode;
  session?: any;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={lato.className}>
      <body className={`${dmsans.className}`}>
        <AuthDialogProvider>
          <SessionProviderComp session={session}>
            <ThemeProvider
              attribute="class"
              enableSystem={false}
              defaultTheme="light"
            >
              {/* <Header /> */}
              {children}
              <Script
                id="retell-widget"
                src={process.env.RETELL_CHAT_URL}
                type="module"
                data-public-key={process.env.RETELL_PUBLIC_API_KEY}
                data-agent-id={process.env.RETELL_AGENT_ID}
                data-agent-version="0" // Or your specific agent version
                data-title={metadata.title}
              />
              <Footer />
              {/* <ScrollToTop /> */}
              {/* <RetellChatWidget /> */}
            </ThemeProvider>
          </SessionProviderComp>
        </AuthDialogProvider>
      </body>
    </html>
  );
}
