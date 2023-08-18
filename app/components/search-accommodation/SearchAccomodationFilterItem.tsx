import { useSearchParams } from "next/navigation";
import qs from "query-string";
import React, { ChangeEvent, useEffect } from "react";

type FilterItemProps = {
  item: any;
  type: string;
  onSelectFilter: (item: string, type: string, check: boolean) => void;
};

export default function SearchListingFilterItem({
  item,
  type,
  onSelectFilter,
}: FilterItemProps) {
  const params = useSearchParams() || "";
  const query = qs.parse(params.toString());

  // const currentPickFilter =
  //   String(query.featured || "") +
  //   String(query.convenient || "") +
  //   String(query.properties || "");

  const selectFilterHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    onSelectFilter(item, type, checked);
  };

  const checked = query[type]?.includes(item) || false;

  useEffect(() => {
    if (checked) {
      onSelectFilter(item, type, true);
    }
  }, []);

  return (
    <div>
      <input
        type="checkbox"
        id={`checkbox-${item}`}
        checked={checked}
        onChange={selectFilterHandler}
        className="cursor-pointer"
      />
      <label htmlFor={`checkbox-${item}`} className="px-2 cursor-pointer">
        {item}
      </label>
    </div>
  );
}
