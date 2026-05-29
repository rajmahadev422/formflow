import Link from "next/link";

export default function FormFooter() {
  return (
    <footer className="w-full mt-auto py-6 px-4 bg-(--bg) text-center no-print">
      {/* Subtle Divider line similar to Google Forms structure */}
      <div className="mx-auto border-t border-(--border) my-4 opacity-60" />

      {/* Main Footer Container */}
      <div className="flex flex-col items-center gap-3 max-w-160 mx-auto text-xs text-(--text-3)">
        {/* Branding Link / Identity */}
        <div className="text-sm font-medium tracking-wide text-(--text-2)">
          This form was created inside{" "}
          <Link
            href="/"
            className="text-(--accent) hover:underline font-semibold font-['DM_Serif_Display',serif]"
          >
            FormFlow
          </Link>
        </div>

        {/* Legal / Secondary Links Group */}
        <div className="flex items-center gap-3 flex-wrap justify-center mt-1">
          <Link
            href="/report"
            className="hover:underline hover:text-(--text-2) transition-colors"
          >
            Report Abuse
          </Link>
          <span className="text-gray-400 select-none">·</span>
          <Link
            href="/terms"
            className="hover:underline hover:text-(--text-2) transition-colors"
          >
            Terms of Service
          </Link>
          <span className="text-gray-400 select-none">·</span>
          <Link
            href="/privacy"
            className="hover:underline hover:text-(--text-2) transition-colors"
          >
            Privacy Policy
          </Link>
        </div>

        {/* Anti-Malware / Warning Note */}
        <p className="text-[10px] text-center leading-relaxed opacity-70 mt-2">
          Never submit passwords or sensitive credentials through web forms.
          FormFlow is not affiliated with the creator or distributor of this
          document.
        </p>
      </div>
    </footer>
  );
}
