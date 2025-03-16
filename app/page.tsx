import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Award, ShoppingBag, Star } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-pokemon-blue to-pokemon-red py-20 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/placeholder.svg?height=800&width=1600"
            alt="Pokemon Cards Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Collect and Grade Your Favorite Pokémon Cards</h1>
            <p className="text-xl mb-8">
              Buy professionally graded cards or send your own cards to be graded by our experts.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-pokemon-yellow text-black hover:bg-pokemon-yellow/90">
                <Link href="/shop">Shop Graded Cards</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white/10"
              >
                <Link href="/grading">Grade Your Cards</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cards Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Graded Cards</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Check out our selection of premium graded Pokémon cards, authenticated and rated for condition and
              quality.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
              <div className="relative h-64">
                <Image
                  src="https://images.pokemontcg.io/sm1/1.png"
                  alt="Charizard Card"
                  fill
                  className="object-contain p-4"
                />
                <div className="absolute top-2 right-2 bg-pokemon-red text-white text-sm font-bold px-2 py-1 rounded">
                  PSA 10
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">Charizard</h3>
                <p className="text-gray-600 mb-2">Base Set • Rare Holo</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">$299.99</span>
                  <Button asChild size="sm">
                    <Link href="/shop/1">View Details</Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
              <div className="relative h-64">
                <Image
                  src="https://images.pokemontcg.io/sm1/2.png"
                  alt="Blastoise Card"
                  fill
                  className="object-contain p-4"
                />
                <div className="absolute top-2 right-2 bg-pokemon-blue text-white text-sm font-bold px-2 py-1 rounded">
                  PSA 9
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">Blastoise</h3>
                <p className="text-gray-600 mb-2">Base Set • Rare Holo</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">$199.99</span>
                  <Button asChild size="sm">
                    <Link href="/shop/2">View Details</Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
              <div className="relative h-64">
                <Image
                  src="https://images.pokemontcg.io/sm1/3.png"
                  alt="Venusaur Card"
                  fill
                  className="object-contain p-4"
                />
                <div className="absolute top-2 right-2 bg-pokemon-green text-white text-sm font-bold px-2 py-1 rounded">
                  PSA 8
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">Venusaur</h3>
                <p className="text-gray-600 mb-2">Base Set • Rare Holo</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">$149.99</span>
                  <Button asChild size="sm">
                    <Link href="/shop/3">View Details</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <Button asChild variant="outline" className="gap-2">
              <Link href="/shop">
                View All Cards
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We offer a range of services for Pokémon card collectors and enthusiasts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Service 1 */}
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
              <div className="bg-pokemon-yellow/20 p-4 rounded-full mb-4">
                <ShoppingBag className="h-10 w-10 text-pokemon-yellow" />
              </div>
              <h3 className="text-xl font-bold mb-2">Buy Graded Cards</h3>
              <p className="text-gray-600 mb-4">
                Browse our collection of professionally graded Pokémon cards. All cards are authenticated and come with
                a certificate of authenticity.
              </p>
              <Button asChild variant="outline" className="mt-auto">
                <Link href="/shop">Shop Now</Link>
              </Button>
            </div>

            {/* Service 2 */}
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
              <div className="bg-pokemon-blue/20 p-4 rounded-full mb-4">
                <Award className="h-10 w-10 text-pokemon-blue" />
              </div>
              <h3 className="text-xl font-bold mb-2">Grade Your Cards</h3>
              <p className="text-gray-600 mb-4">
                Send us your Pokémon cards to be professionally graded. We offer fast turnaround times and competitive
                pricing.
              </p>
              <Button asChild variant="outline" className="mt-auto">
                <Link href="/grading">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our customers have to say about our services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="flex text-pokemon-yellow">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "I've been collecting Pokémon cards for years, and PokéGrade offers the best selection of graded cards
                I've seen. Fast shipping and excellent customer service!"
              </p>
              <div className="flex items-center">
                <div className="mr-4">
                  <Image
                    src="/placeholder.svg?height=40&width=40"
                    alt="Customer"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <p className="font-semibold">Alex Johnson</p>
                  <p className="text-sm text-gray-500">Collector since 1999</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="flex text-pokemon-yellow">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "I sent my rare Charizard card to be graded and was impressed with the professionalism and care they
                took. The turnaround time was faster than expected!"
              </p>
              <div className="flex items-center">
                <div className="mr-4">
                  <Image
                    src="/placeholder.svg?height=40&width=40"
                    alt="Customer"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <p className="font-semibold">Sarah Miller</p>
                  <p className="text-sm text-gray-500">Pokémon Enthusiast</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="flex text-pokemon-yellow">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "The grading process was transparent and fair. I appreciate the detailed condition report that came with
                my graded cards. Will definitely use their services again!"
              </p>
              <div className="flex items-center">
                <div className="mr-4">
                  <Image
                    src="/placeholder.svg?height=40&width=40"
                    alt="Customer"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <p className="font-semibold">Mike Thompson</p>
                  <p className="text-sm text-gray-500">Card Trader</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-pokemon-blue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Collection?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Whether you're looking to buy graded cards or get your own cards graded, we're here to help.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-pokemon-yellow text-black hover:bg-pokemon-yellow/90">
              <Link href="/shop">Shop Now</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white/10"
            >
              <Link href="/grading">Grade Your Cards</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

