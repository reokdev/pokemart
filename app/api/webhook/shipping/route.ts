import { NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function POST(req: Request) {
  try {
    const payload = await req.json()

    // This is a simplified example. In a real application,
    // you would verify the webhook signature and handle different
    // event types from your shipping provider.

    if (payload.type === "tracking_update") {
      const orderId = payload.order_id
      const status = payload.status
      const trackingNumber = payload.tracking_number

      // Update order status
      await sql`
        UPDATE orders
        SET 
          status = ${status},
          tracking_number = ${trackingNumber}
        WHERE id = ${orderId}
      `
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Error handling shipping webhook:", error)
    return NextResponse.json({ error: "Failed to process webhook" }, { status: 500 })
  }
}

