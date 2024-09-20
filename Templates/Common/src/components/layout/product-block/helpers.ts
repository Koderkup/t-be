type MapObject = {
  id: string | number;
  name: string;
  hexCode?: string;
  [key: string]: unknown;
};
export const dropdownOptionsMap = (object: MapObject[]) => {
  return object.map(item => ({
    label: item.name,
    value: item.id,
    color: item.hexCode,
  }));
};
