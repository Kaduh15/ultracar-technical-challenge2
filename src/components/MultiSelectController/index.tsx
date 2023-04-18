import { MultiSelect, MultiSelectProps } from "primereact/multiselect";
import { SelectItemOptionsType } from "primereact/selectitem";
import React from "react";
import { Controller } from "react-hook-form";

type MultiSelectControllerProps = {
  control: any,
  options: SelectItemOptionsType,
  nameControl: string,
} & MultiSelectProps

const MultiSelectController: React.FC<MultiSelectControllerProps> = ({
  control, options, nameControl,...props
}) => {
  return (
    <Controller
      name={nameControl}
      control={control}
      render={({ field }) => (
        <MultiSelect
          {...props}
          id={field.name}
          {...field}
          options={options}
        />
      )}
    />
  );
};

export default MultiSelectController;
