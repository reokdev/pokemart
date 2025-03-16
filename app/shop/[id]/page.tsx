import Image from "next/image"
import { notFound } from "next/navigation"
import { sql } from "@/lib/db"
import AddToCartButton from "@/components/add-to-cart-button"

type Product = {
  id: number
  name: string
  image_url: string
  price: number
  stock_quantity: number
  description?: string
  category?: string
  condition?: string
  created_at?: Date
}

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
    ` as unknown as Product[]
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

  // Ensure all required fields are present
  const productData: Product = {
    id: product.id,
    name: product.name,
    image_url: product.image_url || "/placeholder.svg",
    price: product.price,
    stock_quantity: product.stock_quantity,
    description: product.description,
    category: product.category,
    condition: product.condition,
    created_at: product.created_at
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="relative aspect-square">
            <Image src={productData.image_url} alt={productData.name} fill className="object-contain" />
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">{productData.name}</h1>
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-pokemon-blue text-white text-sm font-bold px-2 py-1 rounded">
              {productData.condition}
            </span>
            <span className="text-gray-500">
              {productData.category}
            </span>
          </div>

          <div className="text-3xl font-bold mb-6">${productData.price.toFixed(2)}</div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{productData.description}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Card Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500">Category</p>
                <p className="font-medium">{productData.category}</p>
              </div>
              <div>
                <p className="text-gray-500">Condition</p>
                <p className="font-medium">{productData.condition}</p>
              </div>
              <div>
                <p className="text-gray-500">Stock</p>
                <p className="font-medium">{productData.stock_quantity} available</p>
              </div>
            </div>
          </div>

          <AddToCartButton product={productData} />
        </div>
      </div>
    </div>
  )
}

