import { ImageResponse } from "next/og"

// Route segment config
export const runtime = "edge"

// Image metadata
export const alt = "Learning Resource"
export const size = {
  width: 1200,
  height: 630,
}

// Image generation
export default async function Image({ params }: { params: { subject: string; note: string } }) {
  // Format the note title from slug
  const noteTitle = params.note
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  // Format the subject from slug
  const subject = params.subject
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  return new ImageResponse(
    <div
      style={{
        fontSize: 48,
        background: "linear-gradient(to bottom, #f5f5f5, #e5e5e5)",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 48,
      }}
    >
      <div
        style={{
          fontSize: 28,
          color: "#6366f1",
          marginBottom: 24,
        }}
      >
        {subject}
      </div>
      <div
        style={{
          fontSize: 64,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 24,
          background: "linear-gradient(to right, #6366f1, #8b5cf6)",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        {noteTitle}
      </div>
      <div
        style={{
          fontSize: 24,
          color: "#64748b",
        }}
      >
        Enginow Learning Resources
      </div>
    </div>,
    {
      ...size,
    },
  )
}
