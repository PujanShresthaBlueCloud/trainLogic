// app/api/retell-config/route.ts
import { NextResponse } from "next/server";

type ConfigShape = {
  publicKey: string;
  agentId: string;
  agentVersion?: string;
  title?: string;
  logoUrl?: string;
  color?: string;
  botName?: string;
  popupMessage?: string;
  showAiPopup?: boolean;
  showAiPopupTime?: number;
  autoOpen?: boolean;
  dynamic?: Record<string, any>;
  recaptchaKey?: string;
};
console.log("inside the sdk");
export async function GET() {
  // Read server-side env vars (these are NOT exposed to the client unless returned intentionally)
  const cfg: Partial<ConfigShape> = {
    publicKey: process.env.RETELL_PUBLIC_API_KEY,
    agentId: process.env.RETELL_AGENT_ID,
    agentVersion: process.env.RETELL_AGENT_VERSION ?? "0",
    title: process.env.RETELL_WIDGET_TITLE ?? "Chat with us!",
    logoUrl: process.env.RETELL_LOGO_URL ?? "",
    color: process.env.RETELL_COLOR ?? "",
    botName: process.env.RETELL_BOT_NAME ?? "",
    popupMessage: process.env.RETELL_POPUP_MESSAGE ?? "",
    showAiPopup: (process.env.RETELL_SHOW_AI_POPUP ?? "true") === "true",
    showAiPopupTime: process.env.RETELL_SHOW_AI_POPUP_TIME ? Number(process.env.RETELL_SHOW_AI_POPUP_TIME) : 5,
    autoOpen: (process.env.RETELL_AUTO_OPEN ?? "false") === "true",
    // dynamic can be stored as JSON in an env var, e.g. RETELL_DYNAMIC='{"key":"value"}'
    dynamic: process.env.RETELL_DYNAMIC ? JSON.parse(process.env.RETELL_DYNAMIC) : undefined,
    recaptchaKey: process.env.GOOGLE_RECAPTCHA_SITE_KEY ?? undefined,
  };
  // Validate required public fields — server should ensure these are configured
  if (!cfg.publicKey || !cfg.agentId) {
    return NextResponse.json({ error: "Missing required Retell configuration on the server" }, { status: 500 });
  }

  // Return only the safe config that the widget requires
  return NextResponse.json(cfg);
}
