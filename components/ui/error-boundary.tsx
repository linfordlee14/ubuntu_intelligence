"use client"

import { Component, type ReactNode } from "react"
import { AlertTriangle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface Props {
  children: ReactNode
  fallbackTitle?: string
  fallbackMessage?: string
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <Card className="border-danger/20 bg-danger/5">
          <CardContent className="flex items-start gap-3 p-6">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-danger" />
            <div>
              <h3 className="font-semibold text-danger">
                {this.props.fallbackTitle ?? "Something went wrong"}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {this.props.fallbackMessage ??
                  "This section could not load. Please refresh the page or try again later."}
              </p>
            </div>
          </CardContent>
        </Card>
      )
    }

    return this.props.children
  }
}
