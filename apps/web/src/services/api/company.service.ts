import clientAxios from "@/lib/axios";

export interface Address {
  id?: string;
  street: string;
  city?: string;
  state?: string;
  stateCode?: string;
  country?: string;
  countryCode?: string;
  postalCode?: string;
  notes?: string;
}

export interface Company {
  id: string;
  name: string;
  cuit: string | null;
  address: Address | null;
  email: string | null;
  phone: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateCompanyDto {
  name?: string;
  cuit?: string;
  address?: Address;
  email?: string;
  phone?: string;
}

export const companyService = {
  getById: async (id: string): Promise<Company> => {
    const { data } = await clientAxios.get(`/companies/${id}`);
    return data;
  },

  update: async (
    id: string,
    companyData: UpdateCompanyDto,
  ): Promise<Company> => {
    const { data } = await clientAxios.patch(`/companies/${id}`, companyData);
    return data;
  },
};
