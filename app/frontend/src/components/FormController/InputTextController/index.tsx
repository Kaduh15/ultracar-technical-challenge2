import { InputText, InputTextProps } from "primereact/inputtext";
import { SelectItemOptionsType } from "primereact/selectitem";
import { classNames } from "primereact/utils";
import React from "react";
import { Controller } from "react-hook-form";

type InputTextControllerProps = {
  control: any;
  nameControl: string;
  labelText?: string;
} & InputTextProps;

export const InputTextController: React.FC<InputTextControllerProps> = ({
  control,
  nameControl,
  labelText,
  ...props
}) => {
  return (
    <Controller
      name={nameControl}
      control={control}
      render={({ field, fieldState }) => (
        <>
          {labelText ?? <label htmlFor={field.name}>{labelText}</label>}
            <InputText
              {...props}
              id={field.name}
              value={field.value}
              className={classNames({ "p-invalid": fieldState.error })}
              onChange={(e) => field.onChange(e.target.value)}
            />
        </>
      )}
    />
  );
};

export default InputTextController;
