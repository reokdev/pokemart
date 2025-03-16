"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useUser, SignInButton } from "@clerk/nextjs"
import { Loader2 } from "lucide-react"
import { submitGradingRequest } from "@/app/actions/submit-grading"

export default function GradingSubmissionPage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Get the package from the URL query parameters
  const selectedPackage = searchParams.get("package") || "standard"

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to submit cards for grading.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const formData = new FormData(e.currentTarget)
      const result = await submitGradingRequest(formData)

      if (result.success) {
        toast({
          title: "Submission received!",
          description: "We will contact you shortly with next steps.",
        })
        router.push("/grading/submit/success")
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error processing your submission.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-pokemon-blue" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-4">Authentication Required</h1>
          <p className="text-gray-500 mb-8">Please sign in to submit cards for grading.</p>
          <SignInButton mode="modal">
            <Button>Sign In</Button>
          </SignInButton>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Submit Cards for Grading</h1>

        <Card>
          <CardHeader>
            <CardTitle>Grading Submission Form</CardTitle>
            <CardDescription>Fill out this form to submit your Pokémon cards for professional grading.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Personal Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue={user?.firstName || ""} required />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue={user?.lastName || ""} required />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={user?.emailAddresses[0]?.emailAddress || ""} required />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" required />
                </div>
              </div>

              {/* Shipping Information */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Shipping Information</h2>

                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" required />
                  </div>
                  <div>
                    <Label htmlFor="state">State/Province</Label>
                    <Input id="state" required />
                  </div>
                  <div>
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input id="postalCode" required />
                  </div>
                </div>

                <div>
                  <Label htmlFor="country">Country</Label>
                  <Select defaultValue="US">
                    <SelectTrigger id="country">
                      <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="US">United States</SelectItem>
                      <SelectItem value="CA">Canada</SelectItem>
                      <SelectItem value="UK">United Kingdom</SelectItem>
                      <SelectItem value="AU">Australia</SelectItem>
                      <SelectItem value="JP">Japan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Card Information */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Card Information</h2>

                <div>
                  <Label htmlFor="cardName">Card Name</Label>
                  <Input id="cardName" placeholder="e.g., Charizard" required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="setName">Set Name</Label>
                    <Input id="setName" placeholder="e.g., Base Set" required />
                  </div>
                  <div>
                    <Label htmlFor="year">Year</Label>
                    <Input id="year" placeholder="e.g., 1999" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="estimatedValue">Estimated Value (USD)</Label>
                  <Input id="estimatedValue" type="number" min="0" step="0.01" />
                </div>

                <div>
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any special instructions or details about your card"
                    className="min-h-[100px]"
                  />
                </div>
              </div>

              {/* Service Selection */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Service Selection</h2>

                <RadioGroup defaultValue={selectedPackage}>
                  <div className="flex items-center space-x-2 border rounded-md p-4">
                    <RadioGroupItem value="standard" id="standard" />
                    <Label htmlFor="standard" className="flex-1 flex justify-between cursor-pointer">
                      <span>Standard Service (15-20 business days)</span>
                      <span className="font-bold">$15/card</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-md p-4 border-pokemon-blue">
                    <RadioGroupItem value="premium" id="premium" />
                    <Label htmlFor="premium" className="flex-1 flex justify-between cursor-pointer">
                      <span>Premium Service (7-10 business days)</span>
                      <span className="font-bold">$25/card</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-md p-4">
                    <RadioGroupItem value="ultra" id="ultra" />
                    <Label htmlFor="ultra" className="flex-1 flex justify-between cursor-pointer">
                      <span>Ultra Service (3-5 business days)</span>
                      <span className="font-bold">$50/card</span>
                    </Label>
                  </div>
                </RadioGroup>

                <div>
                  <Label htmlFor="quantity">Number of Cards</Label>
                  <Input id="quantity" type="number" min="1" defaultValue="1" required />
                </div>
              </div>

              <input type="hidden" name="serviceLevel" value={selectedPackage} />

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Submit for Grading"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

