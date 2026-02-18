export interface JWTPayload {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: 'commander' | 'pilot';
  };
}

export interface Cargo {
  id: string;
  code: string;
  description: string;
  origin: string;
  destination: string;
  value: number;
  status: 'Disponible' | 'En ruta' | 'Entregado';
}

export interface NewCargo {
  code: string;
  description: string;
  origin: string;
  destination: string;
  value: number;
  status: 'Disponible' | 'En ruta' | 'Entregado';
}
