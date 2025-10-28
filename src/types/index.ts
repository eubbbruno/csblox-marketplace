export interface Listing {
  id: string
  itemName: string
  itemType: string
  skinName: string
  collection?: string
  rarity: string
  exterior: string
  floatValue: number
  paintSeed?: number
  patternIndex?: number
  isStatTrak: boolean
  isSouvenir: boolean
  stickers?: any
  price: number
  steamPrice?: number
  discount?: number
  imageUrl: string
  inspectUrl?: string
  sellerId: string
  seller: {
    id: string
    username: string
    avatar: string
    reputation: number
    totalSales: number
  }
  description?: string
  status: string
  views: number
  favorites: number
  expiresAt: Date
  createdAt: Date
  updatedAt: Date
}

export interface MarketplaceFilters {
  search?: string
  minPrice?: number
  maxPrice?: number
  rarity?: string[]
  exterior?: string[]
  itemType?: string[]
  isStatTrak?: boolean
  isSouvenir?: boolean
  sortBy?: 'price_asc' | 'price_desc' | 'newest' | 'popular' | 'float_asc' | 'float_desc'
}

export interface PaginationData {
  page: number
  pageSize: number
  totalItems: number
  totalPages: number
}

