import { Dropdown, DropdownProps } from "primereact/dropdown";
import { SelectItemOptionsType } from "primereact/selectitem";
import React from "react";
import { Controller } from "react-hook-form";

type DropdownControllerProps = {
  control: any;
  options: SelectItemOptionsType;
  nameControl: string;
} & DropdownProps;

const DropdownController: React.FC<DropdownControllerProps> = ({
  control,
  options,
  nameControl,
  ...props
}) => {
  return (
    <Controller
      name={nameControl}
      control={control}
      render={({ field }) => (
        <Dropdown
          {...props}
          id={field.name}
          value={field.value}
          onChange={(e) => field.onChange(e.value)}
          options={options}
        />
      )}
    />
  );
};

export default DropdownController;
