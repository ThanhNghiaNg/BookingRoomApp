"use client";
import { useMemo } from "react";
import { categories } from "../navbar/Categories";
import CategoryView from "./ListingCategory";

interface ListingPropertiesProps {
  properties: string;
}

const ListingProperties: React.FC<ListingPropertiesProps> = ({
  properties,
}) => {
  const category = useMemo(() => {
    return categories.find((items) => items.label === properties);
  }, [properties]);
  return (
    <>
      {category && (
        <CategoryView
          icon={category?.icon}
          label={category?.label}
          description={category?.description}
        />
      )}
    </>
  );
};

export default ListingProperties;
