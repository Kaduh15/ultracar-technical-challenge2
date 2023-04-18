import { InputNumber, InputNumberProps } from "primereact/inputnumber";
import React from "react";
import { Controller } from "react-hook-form";

type InputNumberControllerProps = {
  control: any,
  nameControl: string,
} & InputNumberProps

export const InputNumberController: React.FC<InputNumberControllerProps> = ({
  control, nameControl, ...props
}) => {
  return (
    <Controller
      name={nameControl}
      control={control}
      render={({ field }) => (
        <InputNumber
          {...props}
          id={field.name}
          value={field.value}
          onChange={(e) => field.onChange(e.value)}
        />
      )}
    />
  );
};

export default InputNumberController;
