import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt =
  "Slick — Criatividade e tecnologia, sem atrito";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  const logoData = await readFile(
    join(process.cwd(), "public/images/slick/logo-nevoa.svg"),
    "base64"
  );
  const logoSrc = `data:image/svg+xml;base64,${logoData}`;

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
            "radial-gradient(circle at 85% 15%, rgba(124,58,237,0.5), transparent 55%), radial-gradient(circle at 10% 90%, rgba(255,53,141,0.4), transparent 50%)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={380} height={160} alt="" />

        <div
          style={{
            display: "flex",
            marginTop: 44,
            fontSize: 44,
            fontWeight: 600,
            color: "#f7f2ff",
            opacity: 0.75,
          }}
        >
          Criatividade e tecnologia,
          <span style={{ color: "#ff358d", marginLeft: 12 }}>sem atrito</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
