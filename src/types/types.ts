export type Person = {
  id: number | string;
  name: string;
};

export type Album = {
  id: string | number;
  personId: string | number;
  title: string;
};

export type Photo = {
  id?: string | number;
  albumId: string | number;
  img: string;
};
