import { Shield } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-primary text-white">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-teal" />
              <span className="text-lg font-bold tracking-tight">
                CableGuard AI
              </span>
            </div>
            <p className="text-sm text-gray-300">
              Ubuntu Intelligence — USAII Global AI Hackathon 2026
            </p>
          </div>

          {/* Mission */}
          <div>
            <h4 className="mb-2 text-sm font-semibold text-gray-200">
              Built for
            </h4>
            <p className="text-sm text-gray-300">
              Buffalo City Metro Municipality and the communities of Qonce
              (King William&apos;s Town), Eastern Cape, South Africa.
            </p>
          </div>

          {/* Disclaimer */}
          <div>
            <h4 className="mb-2 text-sm font-semibold text-gray-200">
              Important
            </h4>
            <p className="text-sm text-gray-300">
              This system supports human decisions. It does not make them.
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 text-center text-xs text-gray-400">
          <p>
            CableGuard AI is a decision-support simulator. It does not identify
            individuals, automate dispatch, or replace human judgment.
          </p>
        </div>
      </div>
    </footer>
  )
}
