"use client";

import { useEffect } from "react";

type RetellCallWidgetProps = {
  publicKey: string;
  agentId: string;
  phoneNumber?: string;
  recaptchaKey?: string;
  title?: string;
  color?: string;
};

export default function RetellCallWidget({
  publicKey,
  agentId,
  phoneNumber,
  recaptchaKey,
  title = "Request a Call",
  color = "#FFA07A",
}: RetellCallWidgetProps) {
  useEffect(() => {
    if (document.getElementById("retell-widget")) return;

    const script = document.createElement("script");
    script.id = "retell-widget";
    script.type = "module";
    script.src = "https://dashboard.retellai.com/retell-widget.js";
    script.setAttribute("data-public-key", publicKey);
    script.setAttribute("data-agent-id", agentId);
    script.setAttribute("data-widget", "callback");
    script.setAttribute("data-title", title);
    script.setAttribute("data-color", color);

    if (phoneNumber) script.setAttribute("data-phone-number", phoneNumber);
    if (recaptchaKey) script.setAttribute("data-recaptcha-key", recaptchaKey);

    document.body.appendChild(script);

    return () => {
      document.getElementById("retell-widget")?.remove();
    };
  }, [publicKey, agentId, phoneNumber, recaptchaKey, title, color]);

  return null;
}
