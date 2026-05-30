"use client";

import { useState } from "react";

export default function ShareButton({ formId, title, desc }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = `${window.location.origin}/view/${formId}`;

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
      {copied ? (
        <span>✔</span>
      ) : (
        <svg
          fill="#000000"
          viewBox="-2 -2 24 24"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMinYMin"
          className="jam jam-share-alt h-20 w-20"

        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path d="M16 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM7.928 9.24a4.02 4.02 0 0 1-.026 1.644l5.04 2.537a4 4 0 1 1-.867 1.803l-5.09-2.562a4 4 0 1 1 .083-5.228l5.036-2.522a4 4 0 1 1 .929 1.772L7.928 9.24zM4 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm12 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>
          </g>
        </svg>
      )}
    </button>
  );
}
