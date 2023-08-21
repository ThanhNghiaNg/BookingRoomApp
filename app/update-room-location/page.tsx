import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import { getUsers } from "../actions/getUsers";
import CreateClient from "./Client";

const ReservationsPage = async () => {
  const users:any = await getUsers();
  return (
    <ClientOnly>
      <CreateClient fetchUser={users}></CreateClient>
    </ClientOnly>
  );
};

export default ReservationsPage;