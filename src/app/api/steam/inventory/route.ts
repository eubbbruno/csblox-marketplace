import { NextResponse } from 'next/server'

// API para buscar inventário do Steam
// Documentação: https://steamcommunity.com/dev

const STEAM_API_KEY = process.env.STEAM_API_KEY
const STEAM_APP_ID = 730 // CS2

interface SteamItem {
  assetid: string
  classid: string
  instanceid: string
  amount: string
  marketable: number
  tradable: number
  descriptions?: Array<{
    value: string
    color?: string
  }>
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const steamId = searchParams.get('steamId')
  
  if (!steamId) {
    return NextResponse.json(
      { error: 'Steam ID é obrigatório' },
      { status: 400 }
    )
  }
  
  if (!STEAM_API_KEY) {
    // Retornar dados mock para desenvolvimento
    return NextResponse.json({
      success: true,
      items: getMockInventory(),
      total: 15
    })
  }
  
  try {
    // Buscar inventário do Steam
    const inventoryUrl = `https://steamcommunity.com/inventory/${steamId}/${STEAM_APP_ID}/2?l=english&count=5000`
    
    const response = await fetch(inventoryUrl, {
      headers: {
        'User-Agent': 'CSBlox Marketplace/1.0'
      },
      next: { revalidate: 300 } // Cache por 5 minutos
    })
    
    if (!response.ok) {
      throw new Error('Falha ao buscar inventário do Steam')
    }
    
    const data = await response.json()
    
    if (!data.success) {
      throw new Error('Inventário privado ou erro do Steam')
    }
    
    // Processar itens
    const items = processInventoryItems(data.assets, data.descriptions)
    
    return NextResponse.json({
      success: true,
      items,
      total: items.length
    })
    
  } catch (error) {
    console.error('Erro ao buscar inventário:', error)
    
    // Em caso de erro, retornar inventário mock
    return NextResponse.json({
      success: true,
      items: getMockInventory(),
      total: 15,
      mock: true
    })
  }
}

function processInventoryItems(assets: SteamItem[], descriptions: any[]) {
  return assets.map(asset => {
    const description = descriptions.find(
      d => d.classid === asset.classid && d.instanceid === asset.instanceid
    )
    
    return {
      assetId: asset.assetid,
      classId: asset.classid,
      instanceId: asset.instanceid,
      name: description?.market_hash_name || 'Unknown',
      type: description?.type || '',
      rarity: extractRarity(description),
      exterior: extractExterior(description?.market_hash_name || ''),
      imageUrl: description?.icon_url 
        ? `https://community.cloudflare.steamstatic.com/economy/image/${description.icon_url}`
        : '',
      marketable: asset.marketable === 1,
      tradable: asset.tradable === 1,
      descriptions: description?.descriptions || [],
      tags: description?.tags || []
    }
  })
}

function extractRarity(description: any): string {
  const rarityTag = description?.tags?.find((t: any) => t.category === 'Rarity')
  return rarityTag?.internal_name || 'CONSUMER'
}

function extractExterior(name: string): string | null {
  const exteriors = ['Factory New', 'Minimal Wear', 'Field-Tested', 'Well-Worn', 'Battle-Scarred']
  for (const ext of exteriors) {
    if (name.includes(ext)) {
      return ext.replace(' ', '_').replace('-', '_').toUpperCase()
    }
  }
  return null
}

function getMockInventory() {
  return [
    {
      assetId: '1',
      classId: '123',
      instanceId: '456',
      name: 'AK-47 | Redline (Field-Tested)',
      type: 'Rifle',
      rarity: 'CLASSIFIED',
      exterior: 'FIELD_TESTED',
      imageUrl: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV09-5lpKKqPrxN7LEmyVQ7MEpiLuSrYmnjQO3-UdsZGHyd4_Bd1RvNQ7T_FDrw-_og8O46oOJlyU6Qxr5Vg',
      marketable: true,
      tradable: true,
      steamPrice: 85.00
    },
    {
      assetId: '2',
      classId: '124',
      instanceId: '457',
      name: 'M4A4 | Asiimov (Field-Tested)',
      type: 'Rifle',
      rarity: 'COVERT',
      exterior: 'FIELD_TESTED',
      imageUrl: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhjxszFJTwW09-5lZKKh-L6N6vYmGVu5Mx2gv2P8d-g3gOxrkBuN27ycICdeAA2ZFjQ_lbvxe7ogsO-vM7KzHYxvXN3siuJgVXp1klCEyFE',
      marketable: true,
      tradable: true,
      steamPrice: 120.00
    },
    {
      assetId: '3',
      classId: '125',
      instanceId: '458',
      name: 'AWP | Dragon Lore (Factory New)',
      type: 'Sniper Rifle',
      rarity: 'COVERT',
      exterior: 'FACTORY_NEW',
      imageUrl: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17PLfYQJD_9W7m5a0mvLwOq7c2DsE6pMn3-qUo4qh2Vbi_kJlZGD1IILGIw82aVmE-we9xru505S_v5vPyHtmvz5iuyiRe2JWfA',
      marketable: true,
      tradable: true,
      steamPrice: 15000.00
    },
    {
      assetId: '4',
      classId: '126',
      instanceId: '459',
      name: 'Glock-18 | Fade (Factory New)',
      type: 'Pistol',
      rarity: 'RESTRICTED',
      exterior: 'FACTORY_NEW',
      imageUrl: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposbaqKAxf0Ob3djFN79fnzL-YkuP1Nq7cqWdQ-sJ0teXI8oThxlDh8hs4a2GlLNWVJFI4YFrQ-gK8k-vxxcjr3V7Beg',
      marketable: true,
      tradable: true,
      steamPrice: 450.00
    },
    {
      assetId: '5',
      classId: '127',
      instanceId: '460',
      name: 'Karambit | Fade (Factory New)',
      type: 'Knife',
      rarity: 'COVERT',
      exterior: 'FACTORY_NEW',
      imageUrl: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJlY20kfb5NqjYg3tu5Mx2gv2P8dqg3FLk-kdqYW-hI9SQJgBqMlGE8gW9xu7pjJC4vZWazXtm7idw7X6IgVXp1kP8YK0G',
      marketable: true,
      tradable: true,
      steamPrice: 2500.00
    }
  ]
}

