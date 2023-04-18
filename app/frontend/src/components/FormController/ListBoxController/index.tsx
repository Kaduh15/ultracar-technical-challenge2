import { ListBox, ListBoxProps } from "primereact/listbox";
import { SelectItemOptionsType } from "primereact/selectitem";
import React from "react";
import { Controller } from "react-hook-form";

type ListBoxControllerProps = {
  control: any;
  options: SelectItemOptionsType;
  nameControl: string;
} & ListBoxProps;

export const ListBoxController: React.FC<ListBoxControllerProps> = ({
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
        <ListBox
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

export default ListBoxController;
