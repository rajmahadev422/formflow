"use client";

import { useState } from "react";

export default function CopyButton({ formId }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(`${window.location.origin}/view/${formId}`);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="p-2 rounded bg-(--bg-2) hover:bg-(--bg-3) transition"
    >
      {copied ? <span>✔</span> : <span>🔗</span>}
    </button>
  );
}