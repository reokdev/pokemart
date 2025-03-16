import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function GradingSubmissionSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-12 text-center">
      <div className="max-w-md mx-auto">
        <div className="mb-6 text-green-500">
          <CheckCircle className="h-16 w-16 mx-auto" />
        </div>
        <h1 className="text-2xl font-bold mb-4">Submission Received!</h1>
        <p className="text-gray-500 mb-8">
          Thank you for submitting your cards for grading. We've sent a confirmation email with instructions for
          shipping your cards to our facility.
        </p>
        <div className="space-y-4">
          <Button asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

