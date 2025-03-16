import { Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { sql } from "@/lib/db"

// Force dynamic rendering to disable caching
export const dynamic = 'force-dynamic'

async function getProducts() {
  try {
    const products = await sql`
      SELECT 
        id,
        name,
        description,
        CAST(price AS FLOAT) as price,
        image_url,
        stock_quantity,
        category,
        condition,
        created_at
      FROM products 
      ORDER BY created_at DESC
    `
    return products
  } catch (error) {
    console.error("Failed to fetch products:", error)
    return []
  }
}

export default async function ShopPage() {
  const products = await getProducts()

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Shop Graded Cards</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Suspense fallback={<p>Loading products...</p>}>
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden transition-all hover:shadow-lg">
              <div className="relative h-64 bg-gray-100">
                <Image
                  src={product.image_url || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-contain p-4"
                />
                <div className="absolute top-2 right-2 bg-pokemon-blue text-white text-sm font-bold px-2 py-1 rounded">
                  {product.condition}
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                <p className="text-sm text-gray-500 mb-2">
                  {product.category}
                </p>
                <p className="font-bold text-xl">${product.price.toFixed(2)}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex gap-2">
                <Button asChild className="w-full">
                  <Link href={`/shop/${product.id}`}>View Details</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </Suspense>
      </div>
    </div>
  )
}

