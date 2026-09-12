// Distinct error types so the API route can show a specific, useful
// message instead of one generic "something went wrong" for every failure.

export class LocalAiConnectionError extends Error {
  constructor(message = "Could not connect to the local AI server.") {
    super(message);
    this.name = "LocalAiConnectionError";
  }
}

export class LocalAiTimeoutError extends Error {
  constructor(message = "The local AI server took too long to respond.") {
    super(message);
    this.name = "LocalAiTimeoutError";
  }
}

export class LocalAiModelError extends Error {
  constructor(message = "The configured local AI model is not available.") {
    super(message);
    this.name = "LocalAiModelError";
  }
}
