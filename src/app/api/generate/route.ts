import { NextResponse } from "next/server";
import { generateEdgeCases } from "@/lib/ai/generateEdgeCases";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const feature = (body as { feature?: unknown } | null)?.feature;

  if (typeof feature !== "string" || feature.trim().length === 0) {
    return NextResponse.json(
      { error: "Please describe the feature in a little more detail." },
      { status: 400 },
    );
  }

  try {
    const result = await generateEdgeCases(feature);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Failed to generate edge cases:", error);
    return NextResponse.json(
      {
        error:
          "Something went wrong while generating edge cases. Please try again.",
      },
      { status: 500 },
    );
  }
}
