import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number | string): string {
  const num = typeof value === 'string' ? parseFloat(value) : value
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(num)
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(d)
}

export function getFloatColor(float: number): string {
  if (float < 0.07) return 'text-green-500'
  if (float < 0.15) return 'text-lime-500'
  if (float < 0.38) return 'text-yellow-500'
  if (float < 0.45) return 'text-orange-500'
  return 'text-red-500'
}

export function getRarityColor(rarity: string): string {
  const colors: Record<string, string> = {
    'CONSUMER': 'bg-gray-500',
    'INDUSTRIAL': 'bg-blue-400',
    'MIL_SPEC': 'bg-blue-600',
    'RESTRICTED': 'bg-purple-600',
    'CLASSIFIED': 'bg-pink-600',
    'COVERT': 'bg-red-600',
    'CONTRABAND': 'bg-yellow-600'
  }
  return colors[rarity] || 'bg-gray-500'
}

export function getExteriorName(exterior: string): string {
  const names: Record<string, string> = {
    'FACTORY_NEW': 'Nova de Fábrica',
    'MINIMAL_WEAR': 'Pouco Usada',
    'FIELD_TESTED': 'Testada em Campo',
    'WELL_WORN': 'Bem Desgastada',
    'BATTLE_SCARRED': 'Veterana de Guerra'
  }
  return names[exterior] || exterior
}

export function getExteriorShort(exterior: string): string {
  const shorts: Record<string, string> = {
    'FACTORY_NEW': 'FN',
    'MINIMAL_WEAR': 'MW',
    'FIELD_TESTED': 'FT',
    'WELL_WORN': 'WW',
    'BATTLE_SCARRED': 'BS'
  }
  return shorts[exterior] || 'N/A'
}

