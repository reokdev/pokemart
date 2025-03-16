import { NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function POST(req: Request) {
  try {
    const payload = await req.json()

    // This is a simplified example. In a real application,
    // you would verify the webhook signature and handle different
    // event types from your payment provider.

    if (payload.type === "payment_intent.succeeded") {
      const orderId = payload.data.object.metadata.order_id

      // Update order status
      await sql`
        UPDATE orders
        SET status = 'Paid'
        WHERE id = ${orderId}
      `
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Error handling payment webhook:", error)
    return NextResponse.json({ error: "Failed to process webhook" }, { status: 500 })
  }
}

