"use server"

import { auth } from "@clerk/nextjs/server"
import { sql } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function submitGradingRequest(formData: FormData) {
  const { userId } = auth()

  if (!userId) {
    return {
      success: false,
      message: "You must be logged in to submit cards for grading",
    }
  }

  try {
    const cardName = formData.get("cardName") as string
    const setName = formData.get("setName") as string
    const serviceLevel = formData.get("serviceLevel") as string
    const quantity = Number.parseInt(formData.get("quantity") as string)

    // Calculate price based on service level
    let pricePerCard = 15 // default to standard
    if (serviceLevel === "premium") pricePerCard = 25
    if (serviceLevel === "ultra") pricePerCard = 50

    const totalPrice = pricePerCard * quantity

    // Insert into database
    await sql`
      INSERT INTO grading_submissions (
        user_id, 
        card_name, 
        set_name, 
        service_level, 
        quantity, 
        total_price, 
        status
      ) VALUES (
        ${userId}, 
        ${cardName}, 
        ${setName}, 
        ${serviceLevel}, 
        ${quantity}, 
        ${totalPrice}, 
        'Pending'
      )
    `

    revalidatePath("/profile")

    return {
      success: true,
      message: "Your grading submission has been received",
    }
  } catch (error) {
    console.error("Error submitting grading request:", error)
    return {
      success: false,
      message: "There was an error processing your submission",
    }
  }
}

