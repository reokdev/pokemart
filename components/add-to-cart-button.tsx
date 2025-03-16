"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/hooks/use-cart"
import { Minus, Plus, ShoppingCart } from "lucide-react"

type Product = {
  id: number
  name: string
  image_url: string
  price: number
  stock_quantity: number
}

export default function AddToCartButton({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()
  const { toast } = useToast()
  const router = useRouter()

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    if (quantity < product.stock_quantity) {
      setQuantity(quantity + 1)
    }
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      image: product.image_url,
      price: product.price,
      quantity,
    })

    toast({
      title: "Added to cart",
      description: `${quantity} x ${product.name} added to your cart`,
    })
  }

  const handleBuyNow = () => {
    addItem({
      id: product.id,
      name: product.name,
      image: product.image_url,
      price: product.price,
      quantity,
    })

    router.push("/cart")
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center">
          <Button variant="outline" size="icon" onClick={decreaseQuantity} disabled={quantity <= 1}>
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-12 text-center">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={increaseQuantity}
            disabled={quantity >= product.stock_quantity}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="text-sm text-gray-500">{product.stock_quantity} available</div>
      </div>

      <div className="flex gap-4">
        <Button onClick={handleAddToCart} className="flex-1 gap-2" disabled={product.stock_quantity === 0}>
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </Button>
        <Button onClick={handleBuyNow} variant="secondary" className="flex-1" disabled={product.stock_quantity === 0}>
          Buy Now
        </Button>
      </div>
    </div>
  )
}

