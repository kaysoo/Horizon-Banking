import React from "react";
import { FormControl, FormField, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Control, FieldPath } from "react-hook-form";
import { z } from "zod";
import { authformSchema } from "@/lib/utils";

const formSchema = authformSchema("sign-up");
interface CustomInputProps {
  control: Control<z.infer<typeof formSchema>>;
  formName: FieldPath<z.infer<typeof formSchema>>;
  label: string;
  placeholder?: string;
  type?: string;
}

const CustomInput = ({
  control,
  formName,
  label,
  placeholder,
  type,
}: CustomInputProps) => {
  return (
    <div>
      <FormField
        control={control}
        name={formName}
        render={({ field }) => (
          <div className="form-item">
            <FormLabel className="form-label">{label}</FormLabel>
            <div className="flex w-full flex-col">
              <FormControl>
                <Input
                  placeholder={placeholder}
                  className="input-class"
                  {...field}
                  type={type ? type : "text"}
                  //   type={formName === "password" ? "password" : "text"}
                />
              </FormControl>
              <FormMessage className="form-message mt-2" />
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default CustomInput;
