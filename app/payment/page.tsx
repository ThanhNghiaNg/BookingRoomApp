import axios from "axios";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import SuccessPayment from "./SuccessPayment";
export type PaymentProps = {
  totalPrice?: string;
  startDate?: string;
  endDate?: string;
  accommodationId?: string;
  email?: string;
  name?: string;
  phone?: string;
  status: string;
};
export interface SearchProps {
  searchParams: PaymentProps;
}
const Search = async ({ searchParams }: SearchProps) => {
  if (searchParams.status === "cancel") {
    return <EmptyState title="Uh Oh" subtitle="Checkout Unsuccessfully!" />;
  }
  return (
    <ClientOnly>
      <SuccessPayment searchParams={searchParams} />
    </ClientOnly>
  );
};

export default Search;
