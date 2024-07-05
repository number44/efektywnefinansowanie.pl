interface PropsI {
  list: ItemI[];
}

interface ItemI {
  id: number;
  order: number;
  [key: string]: any;
}

export const useReorder = (list: LinkI[]) => {
  const handleUp = (id: number) => {};

  const handleDown = (id: number) => {};
};
