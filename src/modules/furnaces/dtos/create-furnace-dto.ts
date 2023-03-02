export interface CreateOrUpdateFurnaceInputDTO {
  name: string;
  ip_adress: string;
  type: string;
  max_temperature: string;
  online: boolean;
}

export interface CreateOrUpdateFurnaceOutputDTO {
  name: string;
  ip_adress: string;
  type: string;
  max_temperature: string;
  online: boolean;
  created_at: Date;
  updated_at: Date;
}
