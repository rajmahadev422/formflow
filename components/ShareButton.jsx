"use client";

import { useState } from "react";

export default function ShareButton({ formId, title, desc }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = `${window.location.origin}/form/${formId}`;

    try {
      // Mobile native share
      if (navigator.share) {
        await navigator.share({
          title: title,
          text: desc || "Fill out this form",
          url,
        });
        return;
      }

      // Desktop fallback
      await navigator.clipboard.writeText(url);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 rounded-lg border px-4 py-2 hover:bg-gray-100"
    >
      {copied ? <span>✔</span> : <span>🔗</span>}
    </button>
  );
}
