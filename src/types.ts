export type TContributor = {
  id: string;
  name: string;
  service?: TService[];
}

export type TService = {
  id: string;
  contributorId?: string;
  clientId?: string;
  initialService: string;
  finishService: string | undefined;
  client: TClient;
  PartsOnService: TPartsOnService[];
}

export type TClient = {
  id: string;
  name: string;
  carId: string;
  car: TCar;
}

export type TCar = {
  id: string;
  brand: string;
  model: string;
}

export type TPartsOnService = {
  id: string;
  serviceId: string;
  partId: string;
  part: TPart;
}

export type TPart = {
  id: string;
  name: string;
  price: number;
}