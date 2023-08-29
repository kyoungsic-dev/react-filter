export interface Car {
  carClassId: number;
  carClassName: string;
  carTypeTags: string[];
  carModel: string;
  discountPercent: number;
  drivingDistance: number;
  image: string;
  price: number;
  regionGroups: string[];
  year: number;
}

export interface Filter {
  id: string;
  type: 'multiple' | 'choice' | 'single';
  title: string;
  status: boolean;
  options: FilterOption[];
}

export interface FilterOption {
  optionTitle: string;
  optionStatus: boolean;
}
