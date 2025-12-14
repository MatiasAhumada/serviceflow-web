"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Country, State, City } from "country-state-city";
import { Select, Input, Label } from "@/components/ui";
import type { Address } from "@/services";

interface AddressSelectorProps {
  value?: Address | null;
  onChange: (address: Address, isValid: boolean) => void;
  disabled?: boolean;
  triggerValidation?: number;
}

export function AddressSelector({ value, onChange, disabled = false, triggerValidation = 0 }: AddressSelectorProps) {
  const {
    control,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<Address>({
    defaultValues: value || {
      street: "",
      city: "",
      state: "",
      stateCode: "",
      country: "",
      countryCode: "",
      postalCode: "",
      notes: "",
    },
  });

  const formData = watch();

  const countries = Country.getAllCountries();
  const states = formData.countryCode ? State.getStatesOfCountry(formData.countryCode) : [];
  const cities = formData.countryCode && formData.stateCode ? City.getCitiesOfState(formData.countryCode, formData.stateCode) : [];

  useEffect(() => {
    const isValid = !errors.street && !!formData.street?.trim();
    onChange(formData, isValid);
  }, [formData.street, formData.city, formData.state, formData.stateCode, formData.country, formData.countryCode, formData.postalCode, formData.notes, errors.street]);

  useEffect(() => {
    if (triggerValidation) {
      trigger("street");
    }
  }, [triggerValidation, trigger]);

  const handleCountryChange = (countryCode: string) => {
    const country = countries.find((c) => c.isoCode === countryCode);
    setValue("countryCode", countryCode);
    setValue("country", country?.name || "");
    setValue("stateCode", "");
    setValue("state", "");
    setValue("city", "");
  };

  const handleStateChange = (stateCode: string) => {
    const state = states.find((s) => s.isoCode === stateCode);
    setValue("stateCode", stateCode);
    setValue("state", state?.name || "");
    setValue("city", "");
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Calle y Número *</Label>
        <Controller
          name="street"
          control={control}
          rules={{ required: "La calle es requerida" }}
          render={({ field }) => (
            <>
              <Input
                {...field}
                disabled={disabled}
                placeholder="Ej: Av. Principal 123"
                className={errors.street ? "border-destructive" : ""}
              />
              {errors.street && <p className="text-sm text-destructive mt-1">{errors.street.message}</p>}
            </>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>País</Label>
          <Controller
            name="countryCode"
            control={control}
            render={({ field }) => (
              <Select
                options={countries.map((c) => ({ value: c.isoCode, label: c.name }))}
                value={field.value}
                onValueChange={(value) => handleCountryChange(value as string)}
                placeholder="Seleccionar país"
                searchable
                disabled={disabled}
              />
            )}
          />
        </div>

        <div className="space-y-2">
          <Label>Provincia/Estado</Label>
          <Controller
            name="stateCode"
            control={control}
            render={({ field }) => (
              <Select
                options={states.map((s) => ({ value: s.isoCode, label: s.name }))}
                value={field.value}
                onValueChange={(value) => handleStateChange(value as string)}
                placeholder="Seleccionar provincia"
                searchable
                disabled={disabled || !formData.countryCode}
              />
            )}
          />
        </div>

        <div className="space-y-2">
          <Label>Ciudad</Label>
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <Select
                options={cities.map((c) => ({ value: c.name, label: c.name }))}
                value={field.value}
                onValueChange={field.onChange}
                placeholder="Seleccionar ciudad"
                searchable
                disabled={disabled || !formData.stateCode}
              />
            )}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Código Postal</Label>
          <Controller
            name="postalCode"
            control={control}
            render={({ field }) => <Input {...field} value={field.value || ""} disabled={disabled} placeholder="Ej: 4000" />}
          />
        </div>

        <div className="space-y-2">
          <Label>Notas adicionales</Label>
          <Controller
            name="notes"
            control={control}
            render={({ field }) => <Input {...field} value={field.value || ""} disabled={disabled} placeholder="Ej: Entre calles X e Y" />}
          />
        </div>
      </div>
    </div>
  );
}
