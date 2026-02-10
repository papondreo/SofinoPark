export type CottageType = {
  id: number;
  name: string;
  cost: string;
  area: string;
  // img: string;
};
export type HousePageProps = {
  cottage: CottageType;
};
