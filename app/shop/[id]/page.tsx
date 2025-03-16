import Image from "next/image"
import { notFound } from "next/navigation"
import { sql } from "@/lib/db"
import AddToCartButton from "@/components/add-to-cart-button"

async function getProduct(id: string) {
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
      WHERE id = ${id}
    `
    return products[0] || null
  } catch (error) {
    console.error("Failed to fetch product:", error)
    return null
  }
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)

  if (!product) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="relative aspect-square">
            <Image src={product.image_url || "/placeholder.svg"} alt={product.name} fill className="object-contain" />
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-pokemon-blue text-white text-sm font-bold px-2 py-1 rounded">
              {product.condition}
            </span>
            <span className="text-gray-500">
              {product.category}
            </span>
          </div>

          <div className="text-3xl font-bold mb-6">${product.price.toFixed(2)}</div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{product.description}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Card Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500">Category</p>
                <p className="font-medium">{product.category}</p>
              </div>
              <div>
                <p className="text-gray-500">Condition</p>
                <p className="font-medium">{product.condition}</p>
              </div>
              <div>
                <p className="text-gray-500">Stock</p>
                <p className="font-medium">{product.stock_quantity} available</p>
              </div>
            </div>
          </div>

          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  )
}

