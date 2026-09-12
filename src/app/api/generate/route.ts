import { NextResponse } from "next/server";
import { generateEdgeCases } from "@/lib/ai/generateEdgeCases";
import { MIN_FEATURE_LENGTH, MAX_FEATURE_LENGTH } from "@/lib/config/validation";
import {
  OllamaConnectionError,
  OllamaModelError,
  OllamaTimeoutError,
} from "@/lib/ai/ollamaErrors";

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

  if (feature.trim().length < MIN_FEATURE_LENGTH) {
    return NextResponse.json(
      { error: "Please describe the feature in a little more detail." },
      { status: 400 },
    );
  }

  if (feature.length > MAX_FEATURE_LENGTH) {
    return NextResponse.json(
      {
        error:
          "Please shorten the feature description before generating edge cases.",
      },
      { status: 400 },
    );
  }

  try {
    const result = await generateEdgeCases(feature);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Failed to generate edge cases:", error);

    if (error instanceof OllamaConnectionError) {
      return NextResponse.json(
        {
          error:
            "We couldn't connect to the local AI model. Make sure Ollama is running and try again.",
        },
        { status: 503 },
      );
    }

    if (error instanceof OllamaTimeoutError) {
      return NextResponse.json(
        {
          error:
            "The local AI model took too long to respond. Please try again.",
        },
        { status: 504 },
      );
    }

    if (error instanceof OllamaModelError) {
      return NextResponse.json({ error: error.message }, { status: 503 });
    }

    return NextResponse.json(
      {
        error:
          "Something went wrong while generating edge cases. Please try again.",
      },
      { status: 500 },
    );
  }
}
