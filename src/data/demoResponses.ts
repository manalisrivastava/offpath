import type { GenerationResult } from "@/types/edgeCase";

// Predefined responses used in demo mode (AI_MODE=demo). They follow the
// exact same shape a real Ollama response would, so the UI never needs to
// know which provider produced the data.

export const passwordResetDemo: GenerationResult = {
  featureSummary:
    "Users can reset their password using an email-based reset link that expires after 30 minutes.",
  edgeCases: [
    {
      title: "Reset link used after expiry",
      description:
        "The user clicks the reset link after the 30-minute expiry window has passed.",
      category: "State & Workflow",
      severity: "Medium",
      whyItMatters:
        "Without a clear expired-link message, the user may think the application is broken and contact support unnecessarily.",
    },
    {
      title: "Reset link reused after password already changed",
      description:
        "The user clicks the same reset link a second time after already setting a new password with it.",
      category: "State & Workflow",
      severity: "Medium",
      whyItMatters:
        "A reusable link could let someone silently overwrite the password again later, including an attacker who intercepted the original email.",
    },
    {
      title: "Multiple password-reset requests create several active tokens",
      description:
        "The user requests several password-reset emails in a row before using any of the links.",
      category: "Time & Concurrency",
      severity: "High",
      whyItMatters:
        "Unless older tokens are invalidated, several valid links could exist at once, making it unclear which one is actually safe to use.",
    },
    {
      title: "Reset requested for a nonexistent email",
      description:
        "The user submits an email address that has no matching account.",
      category: "Security & Abuse",
      severity: "Medium",
      whyItMatters:
        "Showing a different message for existing vs. nonexistent accounts leaks which emails are registered, aiding account enumeration attacks.",
    },
    {
      title: "Reset requested for a suspended or deleted account",
      description:
        "A user whose account has been suspended or deleted still submits a password-reset request.",
      category: "User & Permissions",
      severity: "Medium",
      whyItMatters:
        "Issuing a valid reset link for a suspended account could let a suspended user regain access unintentionally.",
    },
    {
      title: "Reset token is tampered with in the URL",
      description:
        "The user (or an attacker) modifies characters in the reset token portion of the link.",
      category: "Security & Abuse",
      severity: "High",
      whyItMatters:
        "The system must reject invalid tokens outright rather than falling back to a guessable or partially-matched token.",
    },
    {
      title: "New password submitted is empty or only whitespace",
      description:
        "The user submits the new-password form with a blank or whitespace-only value.",
      category: "Input & Validation",
      severity: "Medium",
      whyItMatters:
        "Without server-side checks, a blank password could be accepted, leaving the account effectively unprotected.",
    },
    {
      title: "Network drops while submitting the new password",
      description:
        "The user's connection is interrupted after submitting the new-password form but before a response is received.",
      category: "Network & Failure",
      severity: "Medium",
      whyItMatters:
        "The user won't know if their password was actually changed, and may retry with a now-invalid token.",
    },
    {
      title: "Reset email delayed by the email provider",
      description:
        "The transactional email provider is slow or temporarily unavailable, delaying delivery of the reset email.",
      category: "External Integrations",
      severity: "Low",
      whyItMatters:
        "If the email arrives after the token has expired, the user is stuck in a loop of requesting new links that also expire before delivery.",
    },
    {
      title: "No feedback after clicking \"Send reset link\"",
      description:
        "The button gives no visible response while the request is in flight, so the user clicks it several times.",
      category: "Accessibility & UX",
      severity: "Low",
      whyItMatters:
        "Repeated clicks can trigger multiple emails and multiple tokens, compounding the token-management edge cases above.",
    },
  ],
};

export const shoppingCartDemo: GenerationResult = {
  featureSummary:
    "Logged-in users can add products to a cart, change quantities, remove products, and proceed to checkout.",
  edgeCases: [
    {
      title: "Product becomes unavailable before checkout",
      description:
        "A product is in stock when added to the cart but becomes unavailable before the user checks out.",
      category: "State & Workflow",
      severity: "High",
      whyItMatters:
        "The application must avoid creating an order for inventory that no longer exists, or the store will have to cancel and refund after the fact.",
    },
    {
      title: "Product price changes after being added to the cart",
      description:
        "The price of a cart item is updated by the store between the time it's added and checkout.",
      category: "State & Workflow",
      severity: "Medium",
      whyItMatters:
        "Charging a different amount than what the user saw when they added the item damages trust and can trigger disputes.",
    },
    {
      title: "User double-clicks the checkout button",
      description:
        "The user clicks \"Place Order\" twice in quick succession before the first request completes.",
      category: "Time & Concurrency",
      severity: "High",
      whyItMatters:
        "Without protection, this can create duplicate orders and duplicate payment charges.",
    },
    {
      title: "Requested quantity exceeds available stock",
      description:
        "The user increases a product's quantity in the cart beyond how many units are actually in stock.",
      category: "Input & Validation",
      severity: "Medium",
      whyItMatters:
        "Accepting the order anyway leads to an order the store cannot fulfill.",
    },
    {
      title: "Cart is edited in two browser tabs at once",
      description:
        "The user has the cart open in two tabs and changes quantities or removes items in one while the other still shows old data.",
      category: "Time & Concurrency",
      severity: "Medium",
      whyItMatters:
        "Whichever tab saves last can silently undo the other tab's changes, confusing the user about what's actually in their cart.",
    },
    {
      title: "User's session expires mid-checkout",
      description:
        "The user's login session times out after filling in checkout details but before submitting payment.",
      category: "User & Permissions",
      severity: "High",
      whyItMatters:
        "If the session isn't refreshed cleanly, the user may lose their cart contents or, worse, submit a payment against an invalid session.",
    },
    {
      title: "Payment provider confirms payment but the app never receives it",
      description:
        "The payment succeeds at the external payment provider, but the confirmation callback to the application is lost or delayed.",
      category: "External Integrations",
      severity: "Critical",
      whyItMatters:
        "The customer may be charged without receiving an order, or the app may double-charge them on retry — a serious financial and trust issue.",
    },
    {
      title: "Cart or price values are manipulated client-side",
      description:
        "A user modifies the quantity or price fields sent to the server, for example via browser developer tools, before submitting.",
      category: "Security & Abuse",
      severity: "High",
      whyItMatters:
        "Prices and totals must always be recalculated and verified server-side, or the store can be charged less than the real total.",
    },
    {
      title: "Network drops immediately after clicking checkout",
      description:
        "Connectivity is lost right after the checkout request is sent, before any response is received.",
      category: "Network & Failure",
      severity: "Medium",
      whyItMatters:
        "The user is left unsure whether their order was placed, which can lead to accidental duplicate orders on retry.",
    },
    {
      title: "No loading feedback on \"Add to Cart\"",
      description:
        "Clicking \"Add to Cart\" gives no immediate visual response, so the user clicks it multiple times.",
      category: "Accessibility & UX",
      severity: "Low",
      whyItMatters:
        "Repeated clicks can silently add the same product to the cart several times over.",
    },
  ],
};

export const fileUploadDemo: GenerationResult = {
  featureSummary:
    "Users can upload profile images in JPG or PNG format with a maximum size of 5 MB.",
  edgeCases: [
    {
      title: "Uploaded file exceeds the 5 MB size limit",
      description:
        "The user selects an image file larger than the maximum allowed size.",
      category: "Input & Validation",
      severity: "Medium",
      whyItMatters:
        "Without a clear size check, a large upload can waste bandwidth and time before failing, or may not be rejected at all.",
    },
    {
      title: "Uploaded file is an unsupported type",
      description:
        "The user selects a file that isn't a JPG or PNG, such as a PDF or GIF.",
      category: "Input & Validation",
      severity: "Medium",
      whyItMatters:
        "Accepting unsupported formats can break the image-rendering code elsewhere in the product.",
    },
    {
      title: "File extension is spoofed to bypass type checks",
      description:
        "A file containing executable or script content is renamed with a .jpg extension before upload.",
      category: "Security & Abuse",
      severity: "Critical",
      whyItMatters:
        "Trusting the file extension alone lets malicious content masquerade as an image, a serious security risk if the file is later served or executed.",
    },
    {
      title: "Upload is interrupted by a dropped connection",
      description:
        "The user's network connection drops midway through uploading the file.",
      category: "Network & Failure",
      severity: "Medium",
      whyItMatters:
        "A partially-uploaded file could be saved as if it were complete, resulting in a corrupted profile image.",
    },
    {
      title: "Uploaded file is zero bytes or corrupted",
      description:
        "The selected file is empty or its contents are corrupted and cannot be read as a valid image.",
      category: "Input & Validation",
      severity: "Low",
      whyItMatters:
        "Without validation, a broken image can be saved and later shown as a broken image icon across the product.",
    },
    {
      title: "User re-uploads before the first upload finishes",
      description:
        "The user selects a new file and starts a second upload while the first one is still in progress.",
      category: "Time & Concurrency",
      severity: "Medium",
      whyItMatters:
        "Overlapping uploads can race to save the profile image, leaving an unpredictable final result.",
    },
    {
      title: "Two uploads use the same filename",
      description:
        "The user (or two different users) uploads files that happen to share the same filename.",
      category: "State & Workflow",
      severity: "Medium",
      whyItMatters:
        "Without unique storage naming, one upload can silently overwrite another user's file.",
    },
    {
      title: "Session expires while the upload is in progress",
      description:
        "The user's login session times out while a large file is still uploading.",
      category: "User & Permissions",
      severity: "Medium",
      whyItMatters:
        "The upload may fail with a confusing error, or worse, complete against an invalid session.",
    },
    {
      title: "No progress feedback during upload",
      description:
        "The interface shows no progress indicator while a large file is uploading, so the user clicks upload again.",
      category: "Accessibility & UX",
      severity: "Low",
      whyItMatters:
        "Repeated submissions waste bandwidth and can trigger the duplicate-upload race condition described above.",
    },
  ],
};
