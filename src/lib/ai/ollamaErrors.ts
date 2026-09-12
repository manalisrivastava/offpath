// Distinct error types so the API route can show a specific, useful
// message instead of one generic "something went wrong" for every failure.

export class OllamaConnectionError extends Error {
  constructor(message = "Could not connect to Ollama.") {
    super(message);
    this.name = "OllamaConnectionError";
  }
}

export class OllamaTimeoutError extends Error {
  constructor(message = "Ollama took too long to respond.") {
    super(message);
    this.name = "OllamaTimeoutError";
  }
}

export class OllamaModelError extends Error {
  constructor(message = "The configured Ollama model is not available.") {
    super(message);
    this.name = "OllamaModelError";
  }
}
