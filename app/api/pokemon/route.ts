import { NextResponse } from "next/server"

const API_URL = "https://api.pokemontcg.io/v2"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q") || ""
  const page = searchParams.get("page") || "1"
  const pageSize = searchParams.get("pageSize") || "20"

  try {
    const params = new URLSearchParams({
      q: query,
      page,
      pageSize,
      orderBy: "name",
    })

    const response = await fetch(`${API_URL}/cards?${params.toString()}`)

    if (!response.ok) {
      throw new Error("Failed to fetch cards")
    }

    const data = await response.json()

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching Pokemon cards:", error)
    return NextResponse.json({ error: "Failed to fetch Pokemon cards" }, { status: 500 })
  }
}

