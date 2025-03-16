"use server"

import { auth } from "@clerk/nextjs/server"
import { sql } from "@/lib/db"
import { revalidatePath } from "next/cache"

type CartItem = {
  id: number
  name: string
  price: number
  quantity: number
}

export async function createOrder(items: CartItem[], totalAmount: number) {
  const { userId } = auth()

  if (!userId) {
    return {
      success: false,
      message: "You must be logged in to place an order",
    }
  }

  try {
    // Create the order
    const [order] = await sql`
      INSERT INTO orders (
        user_id, 
        total_amount, 
        status
      ) VALUES (
        ${userId}, 
        ${totalAmount}, 
        'Pending'
      )
      RETURNING id
    `

    // Add order items
    for (const item of items) {
      await sql`
        INSERT INTO order_items (
          order_id,
          product_id,
          quantity,
          price
        ) VALUES (
          ${order.id},
          ${item.id},
          ${item.quantity},
          ${item.price}
        )
      `

      // Update product stock
      await sql`
        UPDATE products
        SET stock_quantity = stock_quantity - ${item.quantity}
        WHERE id = ${item.id}
      `
    }

    revalidatePath("/profile")

    return {
      success: true,
      message: "Your order has been placed successfully",
      orderId: order.id,
    }
  } catch (error) {
    console.error("Error creating order:", error)
    return {
      success: false,
      message: "There was an error processing your order",
    }
  }
}

