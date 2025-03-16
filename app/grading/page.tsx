import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, Shield, Star, TrendingUp } from "lucide-react"

export default function GradingPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Professional Pokémon Card Grading Services</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Get your valuable Pokémon cards professionally graded by our team of experts. We provide accurate, consistent,
          and transparent grading services.
        </p>
      </div>

      {/* Hero Section */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-3xl font-bold mb-4">Why Grade Your Cards?</h2>
          <p className="text-gray-600 mb-6">
            Grading your Pokémon cards provides authentication, preservation, and often increases their value. Our
            expert grading service evaluates cards based on centering, corners, edges, and surface quality.
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-pokemon-blue/10 p-2 rounded-full">
                <TrendingUp className="h-5 w-5 text-pokemon-blue" />
              </div>
              <div>
                <h3 className="font-semibold">Increase Value</h3>
                <p className="text-gray-600">Graded cards typically sell for higher prices than ungraded ones.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-pokemon-yellow/10 p-2 rounded-full">
                <Shield className="h-5 w-5 text-pokemon-yellow" />
              </div>
              <div>
                <h3 className="font-semibold">Authentication</h3>
                <p className="text-gray-600">Confirm your card's authenticity and protect against counterfeits.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-pokemon-green/10 p-2 rounded-full">
                <Award className="h-5 w-5 text-pokemon-green" />
              </div>
              <div>
                <h3 className="font-semibold">Preservation</h3>
                <p className="text-gray-600">
                  Graded cards are sealed in protective cases, preserving their condition.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <Button asChild size="lg" className="bg-pokemon-blue hover:bg-pokemon-blue/90">
              <Link href="/grading/submit">Submit Cards for Grading</Link>
            </Button>
          </div>
        </div>
        <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
          <Image src="/placeholder.svg?height=400&width=600" alt="Pokémon Card Grading" fill className="object-cover" />
        </div>
      </div>

      {/* Grading Process */}
      <div className="mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Our Grading Process</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            We follow a rigorous process to ensure accurate and consistent grading of your Pokémon cards.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="bg-pokemon-blue/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-xl font-bold text-pokemon-blue">1</span>
            </div>
            <h3 className="font-bold mb-2">Submission</h3>
            <p className="text-gray-600">Fill out our submission form and send your cards to our secure facility.</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="bg-pokemon-blue/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-xl font-bold text-pokemon-blue">2</span>
            </div>
            <h3 className="font-bold mb-2">Verification</h3>
            <p className="text-gray-600">
              Our experts verify the authenticity of your cards and check for any counterfeits.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="bg-pokemon-blue/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-xl font-bold text-pokemon-blue">3</span>
            </div>
            <h3 className="font-bold mb-2">Grading</h3>
            <p className="text-gray-600">Cards are carefully examined and graded based on our strict criteria.</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="bg-pokemon-blue/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-xl font-bold text-pokemon-blue">4</span>
            </div>
            <h3 className="font-bold mb-2">Return</h3>
            <p className="text-gray-600">
              Your graded cards are securely packaged and shipped back to you with a certificate.
            </p>
          </div>
        </div>
      </div>

      {/* Grading Packages */}
      <div className="mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Grading Packages</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">Choose the package that best fits your needs and budget.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="relative overflow-hidden">
            <CardHeader>
              <CardTitle>Standard</CardTitle>
              <CardDescription>For casual collectors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-6">
                $15<span className="text-lg font-normal text-gray-500">/card</span>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-pokemon-yellow" />
                  <span>15-20 business days turnaround</span>
                </li>
                <li className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-pokemon-yellow" />
                  <span>Standard protective case</span>
                </li>
                <li className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-pokemon-yellow" />
                  <span>Basic certificate of authenticity</span>
                </li>
                <li className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-pokemon-yellow" />
                  <span>Standard shipping</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/grading/submit?package=standard">Choose Standard</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="relative overflow-hidden border-pokemon-blue">
            <div className="absolute top-0 right-0 bg-pokemon-blue text-white text-xs font-bold px-3 py-1">POPULAR</div>
            <CardHeader>
              <CardTitle>Premium</CardTitle>
              <CardDescription>For serious collectors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-6">
                $25<span className="text-lg font-normal text-gray-500">/card</span>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-pokemon-yellow" />
                  <span>7-10 business days turnaround</span>
                </li>
                <li className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-pokemon-yellow" />
                  <span>Premium protective case</span>
                </li>
                <li className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-pokemon-yellow" />
                  <span>Detailed certificate of authenticity</span>
                </li>
                <li className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-pokemon-yellow" />
                  <span>Expedited shipping</span>
                </li>
                <li className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-pokemon-yellow" />
                  <span>Digital certification</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full bg-pokemon-blue hover:bg-pokemon-blue/90">
                <Link href="/grading/submit?package=premium">Choose Premium</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="relative overflow-hidden">
            <CardHeader>
              <CardTitle>Ultra</CardTitle>
              <CardDescription>For professional collectors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-6">
                $50<span className="text-lg font-normal text-gray-500">/card</span>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-pokemon-yellow" />
                  <span>3-5 business days turnaround</span>
                </li>
                <li className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-pokemon-yellow" />
                  <span>Ultra premium protective case</span>
                </li>
                <li className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-pokemon-yellow" />
                  <span>Premium certificate with hologram</span>
                </li>
                <li className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-pokemon-yellow" />
                  <span>Priority shipping with insurance</span>
                </li>
                <li className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-pokemon-yellow" />
                  <span>Digital certification</span>
                </li>
                <li className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-pokemon-yellow" />
                  <span>Detailed condition report</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/grading/submit?package=ultra">Choose Ultra</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* FAQ Section */}
      <div>
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about our grading services.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-bold mb-2">How long does the grading process take?</h3>
            <p className="text-gray-600">
              The turnaround time depends on the package you choose, ranging from 3-5 business days for Ultra to 15-20
              business days for Standard.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-bold mb-2">What is your grading scale?</h3>
            <p className="text-gray-600">
              We use a 1-10 scale, with 10 being gem mint condition. Our grading considers centering, corners, edges,
              and surface quality.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-bold mb-2">How should I ship my cards?</h3>
            <p className="text-gray-600">
              Cards should be shipped in penny sleeves and top loaders or card savers. We recommend using a padded
              envelope or box with tracking.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-bold mb-2">What if I disagree with the grade?</h3>
            <p className="text-gray-600">
              We have a review process for grade disputes. You can request a review within 30 days of receiving your
              graded cards.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-bold mb-2">Do you grade cards from all Pokémon sets?</h3>
            <p className="text-gray-600">
              Yes, we grade cards from all Pokémon sets, including vintage, modern, Japanese, and international
              releases.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-bold mb-2">Is my shipment insured?</h3>
            <p className="text-gray-600">
              Yes, all return shipments are insured based on the declared value of your cards. Additional insurance can
              be purchased.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

