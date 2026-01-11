"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useForm, Controller } from "react-hook-form";
import { Card, Button, Input, Label } from "@/components/ui";
import { AddressSelector } from "@/components/common";
import { ClientHandler } from "@/lib/client-handler";
import { companyService, type Company, type Address } from "@/services";

interface CompanyFormData {
  name: string;
  cuit: string;
  address: Address | null;
  email: string;
  phone: string;
}

export default function CompanyPage() {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddressValid, setIsAddressValid] = useState(true);
  const [shouldValidateAddress, setShouldValidateAddress] = useState(0);
  const [company, setCompany] = useState<Company | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CompanyFormData>({
    defaultValues: {
      name: "",
      cuit: "",
      address: null,
      email: "",
      phone: "",
    },
  });

  const companyData = watch();

  const loadCompanyData = useCallback(async () => {
    if (!session?.user?.companyId) {
      setIsLoading(false);
      return;
    }

    try {
      const data = await companyService.getById(session.user.companyId);
      setCompany(data);
      reset({
        name: data.name || "",
        cuit: data.cuit || "",
        address: data.address || null,
        email: data.email || "",
        phone: data.phone || "",
      });
    } catch {
      ClientHandler.error("Error al cargar la información de la compañía");
    } finally {
      setIsLoading(false);
    }
  }, [session?.user?.companyId, reset]);

  useEffect(() => {
    loadCompanyData();
  }, [loadCompanyData]);

  const onSubmit = async (data: CompanyFormData) => {
    if (!company?.id) return;

    if (!isAddressValid) {
      ClientHandler.error("Por favor complete correctamente la dirección");
      setShouldValidateAddress((prev) => prev + 1);
      return;
    }

    setIsSaving(true);
    try {
      const updated = await companyService.update(company.id, {
        ...data,
        address: data.address || undefined,
      });
      setCompany(updated);
      ClientHandler.success(
        "Información de la compañía actualizada correctamente",
      );
      setIsEditing(false);
    } catch {
      ClientHandler.error("Error al actualizar la información");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (company) {
      reset({
        name: company.name || "",
        cuit: company.cuit || "",
        address: company.address || null,
        email: company.email || "",
        phone: company.phone || "",
      });
    }
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!session?.user?.companyId) {
    return (
      <div className="p-6">
        <Card className="p-6">
          <p className="text-muted-foreground">
            No tienes una compañía asociada.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <>
      <header className="bg-background border-b border-border px-4 sm:px-6 py-4 pb-7">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl font-bold text-[#111827] dark:text-white">
              Mi Empresa
            </h1>
            <p className="text-xs sm:text-sm text-[#10B981] font-medium">
              Datos para comprobantes y facturas
            </p>
          </div>
        </div>
        {!isEditing && (
          <div className="flex items-center justify-end gap-3 -mt-12">
            <Button onClick={() => setIsEditing(true)}>
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Editar
            </Button>
          </div>
        )}
      </header>

      <div className="p-6 space-y-6">
        <Card className="p-6">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre de la Empresa *</Label>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: "El nombre es requerido" }}
                  render={({ field }) => (
                    <>
                      <Input
                        {...field}
                        id="name"
                        disabled={!isEditing}
                        placeholder="Ej: ServiceFlow S.A."
                        className={errors.name ? "border-destructive" : ""}
                      />
                      {errors.name && (
                        <p className="text-sm text-destructive mt-1">
                          {errors.name.message}
                        </p>
                      )}
                    </>
                  )}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cuit">CUIT / RUT</Label>
                <Controller
                  name="cuit"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="cuit"
                      disabled={!isEditing}
                      placeholder="Ej: 20-12345678-9"
                    />
                  )}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Email inválido",
                    },
                  }}
                  render={({ field }) => (
                    <>
                      <Input
                        {...field}
                        id="email"
                        type="email"
                        disabled={!isEditing}
                        placeholder="contacto@empresa.com"
                        className={errors.email ? "border-destructive" : ""}
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </>
                  )}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="phone"
                      disabled={!isEditing}
                      placeholder="+54 9 381 123-4567"
                    />
                  )}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Dirección</Label>
              <AddressSelector
                value={companyData.address}
                onChange={(address, isValid) => {
                  setValue("address", address);
                  setIsAddressValid(isValid);
                }}
                disabled={!isEditing}
                triggerValidation={shouldValidateAddress}
              />
            </div>

            {isEditing && (
              <div className="flex gap-3 pt-4 border-t">
                <Button onClick={handleSubmit(onSubmit)} disabled={isSaving}>
                  {isSaving ? "Guardando..." : "Guardar Cambios"}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isSaving}
                >
                  Cancelar
                </Button>
              </div>
            )}
          </div>
        </Card>

        <Card className="p-6 bg-muted/50">
          <div className="flex items-start gap-3">
            <svg
              className="w-5 h-5 text-blue-500 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <h3 className="font-semibold text-foreground">
                Información importante
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Esta información se utilizará en todos los comprobantes,
                facturas y documentos generados por el sistema. Asegúrate de
                mantenerla actualizada.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
