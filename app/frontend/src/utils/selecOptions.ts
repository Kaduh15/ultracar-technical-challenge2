type option = [value: string, label: string];

type list = { [key: string]: any }[];

type returnType = { value: any; label: any };

type selectOptionFunction = (list: list, option: option) => returnType[];

export const selectOptions: selectOptionFunction = (list, [value, label]) => {
  return list.map((obj) => {
    return { value: obj[value], label: obj[label] };
  });
};
