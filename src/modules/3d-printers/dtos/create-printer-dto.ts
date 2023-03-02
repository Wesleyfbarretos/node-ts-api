export interface CreateOrUpdatePrinterInputDTO {
  name: string;
  ip_adress: string;
  type: string;
  online: boolean;
}

export interface CreateOrUpdatePrinterOutputDTO {
  id: string;
  name: string;
  ip_adress: string;
  type: string;
  online: boolean;
  created_at: Date;
  updated_at: Date;
}
