export type TContributor = {
  id: string;
  name: string;
  service?: TService[];
}

export type TService = {
  clientId?: string;
  initialService: Date;
  finishService: Date | undefined;
  client: TClient;
  Parts: TPart[]
}

export type TClient = {
  id: string;
  name: string;
  car: string;
}

export type TPart = {
  id: string;
  name: string;
  price: number;
}