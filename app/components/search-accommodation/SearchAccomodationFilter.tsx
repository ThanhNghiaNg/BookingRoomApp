"use client";
import { SafeUser } from "@/app/types";
import SearchAccomodationFilterItem from "./SearchAccomodationFilterItem";

interface SearchAccomodationFilterProps {
  onSelectedFilter: (item: string, type: string, check: boolean) => void;
  data: any;
  // onAction?: (id: string) => void;
}

export interface IFilterAccommodation {
  key: string;
  title: string;
  children: string[];
}

const SearchAccomodationFilter: React.FC<SearchAccomodationFilterProps> = ({
  onSelectedFilter,
  data,
}) => {
  return (
    <div className="col-span-1 cursor-pointer group">
      <div className="flex flex-col">
        <ul className="border-2 border-b-0">
          {data.map((filter: IFilterAccommodation) => {
            return (
              <li key={filter.key} className="border-b-2 p-3">
                <div className="font-bold pb-1">{filter.title}</div>
                {filter.children.map((item: string) => (
                  <SearchAccomodationFilterItem
                    onSelectFilter={onSelectedFilter}
                    type={filter.key}
                    item={item}
                    key={item}
                  />
                ))}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SearchAccomodationFilter;
