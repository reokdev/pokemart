const API_URL = "https://api.pokemontcg.io/v2"

export type PokemonCard = {
  id: string
  name: string
  images: {
    small: string
    large: string
  }
  set: {
    name: string
    series: string
  }
  rarity: string
  cardmarket?: {
    prices?: {
      averageSellPrice?: number
      trendPrice?: number
    }
  }
}

export async function searchCards(query: string, page = 1, pageSize = 20) {
  const params = new URLSearchParams({
    q: query,
    page: page.toString(),
    pageSize: pageSize.toString(),
    orderBy: "name",
  })

  const response = await fetch(`${API_URL}/cards?${params.toString()}`)

  if (!response.ok) {
    throw new Error("Failed to fetch cards")
  }

  const data = await response.json()
  return {
    cards: data.data as PokemonCard[],
    totalCount: data.totalCount as number,
    page: data.page as number,
    pageSize: data.pageSize as number,
    count: data.count as number,
  }
}

export async function getCardById(id: string) {
  const response = await fetch(`${API_URL}/cards/${id}`)

  if (!response.ok) {
    throw new Error("Failed to fetch card")
  }

  const data = await response.json()
  return data.data as PokemonCard
}

export async function getCards(page = 1, pageSize = 20) {
  return searchCards("", page, pageSize)
}

