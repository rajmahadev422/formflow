"use client";

import { useState } from "react";

export default function CopyButton({ formId }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(`https://formflow-mauve.vercel.app/view/${formId}`);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="p-2 rounded hover:bg-gray-100 transition"
    >
      {copied ? <span>✔</span> : <span>🔗</span>}
    </button>
  );
}