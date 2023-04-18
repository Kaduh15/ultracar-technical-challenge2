export type TCar = {
  id: number
  brand: string
  model: string
}

export type TClient = {
  id: number
  name: string
  car: TCar
}

export type TContributor = {
  id: number
  name: string
  service?: TService[]
}

export type TService = {
  id: number
  car: TCar
  parts: TPart[]
}

export type TPart = {
  id: number
  name: string
  price: number
}