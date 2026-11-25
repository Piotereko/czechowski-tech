import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Piotr Czechowski — Edge AI Engineer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#090c10",
          color: "#edf1f5",
          padding: "64px 72px",
          fontFamily: "sans-serif",
          border: "1px solid #212a35",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: "#93a1b0",
          }}
        >
          <span style={{ color: "#edf1f5", fontWeight: 600 }}>
            Piotr Czechowski
          </span>
          <span>czechowski.tech</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            maxWidth: "880px",
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontWeight: 600,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              color: "#edf1f5",
            }}
          >
            I build edge AI that has to work in the field.
          </div>
          <div
            style={{
              fontSize: 26,
              lineHeight: 1.45,
              color: "#93a1b0",
            }}
          >
            Full Stack AI Engineer at Unleash Live. Computer vision, embedded
            systems, and live video — on the device, not only in the cloud.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <svg width="1056" height="44" viewBox="0 0 1056 44">
            <line
              x1="0"
              y1="22"
              x2="1056"
              y2="22"
              stroke="#212a35"
              strokeWidth="1"
            />
            <path
              d="M 0 22 L 420 22 L 434 19 L 444 26 L 456 6 L 468 38 L 480 16 L 492 22 L 1056 22"
              fill="none"
              stroke="#7dd3e8"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    ),
    { ...size }
  );
}
