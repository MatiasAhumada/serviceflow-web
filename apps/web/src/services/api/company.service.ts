import clientAxios from "@/lib/axios";

export interface Company {
  id: string;
  name: string;
  cuit: string | null;
  address: string | null;
  email: string | null;
  phone: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateCompanyDto {
  name?: string;
  cuit?: string;
  address?: string;
  email?: string;
  phone?: string;
}

export const companyService = {
  getById: async (id: string): Promise<Company> => {
    const { data } = await clientAxios.get(`/companies/${id}`);
    return data;
  },

  update: async (id: string, companyData: UpdateCompanyDto): Promise<Company> => {
    const { data } = await clientAxios.patch(`/companies/${id}`, companyData);
    return data;
  },
};
