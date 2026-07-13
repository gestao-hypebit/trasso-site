import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt =
  "Trasso — Criatividade e tecnologia no mesmo traço";
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
            marginTop: 48,
            fontSize: 108,
            fontWeight: 900,
            letterSpacing: "-0.03em",
            color: "#f7f2ff",
          }}
        >
          Trasso
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 20,
            fontSize: 34,
            fontWeight: 600,
            color: "#f7f2ff",
            opacity: 0.75,
          }}
        >
          Criatividade e tecnologia no mesmo{" "}
          <span style={{ color: "#a8f300", marginLeft: 12 }}>traço</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
