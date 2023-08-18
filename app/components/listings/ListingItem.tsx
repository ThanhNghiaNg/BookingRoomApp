import { IconType } from "react-icons";

interface ListingItemProps {
  icon: IconType;
  label: string;
}

const ListingItem: React.FC<ListingItemProps> = ({ icon: Icon, label }) => {
  return (
    <div
      className={`
  w-full
  h-16
  flex
  flex-row
  transition
  cursor-pointer
  items-center
  justify-start
  font-light
  text-neutral-500
`}
    >
      <Icon size={30} />
      <div className="ml-2 font-semibold">{label}</div>
    </div>
  );
};

export default ListingItem;
