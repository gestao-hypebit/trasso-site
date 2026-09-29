import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Mesmo visual da OG da home (app/opengraph-image), com a oferta da landing.

export const alt = "Trasso — Site profissional para o seu negócio, no ar em 3 dias";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  const logoData = await readFile(
    join(process.cwd(), "public/images/cropped/monogram-ss-lima.png"),
    "base64"
  );
  const logoSrc = `data:image/png;base64,${logoData}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          background: "#1a0533",
          backgroundImage:
            "radial-gradient(circle at 85% 15%, rgba(124,58,237,0.55), transparent 55%), radial-gradient(circle at 10% 90%, rgba(255,53,141,0.28), transparent 50%)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={140} height={47} alt="" />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 44,
            fontSize: 76,
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            color: "#f7f2ff",
          }}
        >
          <span>Seu negócio com site profissional,</span>
          <span style={{ color: "#a8f300" }}>no ar em 3 dias</span>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 36,
            padding: "14px 28px",
            borderRadius: 999,
            background: "#a8f300",
            color: "#1a0533",
            fontSize: 34,
            fontWeight: 800,
          }}
        >
          Por apenas R$750
        </div>
      </div>
    ),
    { ...size }
  );
}
