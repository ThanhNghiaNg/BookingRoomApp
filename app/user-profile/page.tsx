import getCurrentUser from "../actions/getCurrentUser";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import UserProfilePage from "./UserProfilePage ";
// import ClientOnly from "./components/ClientOnly";

export default async function Search() {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <UserProfilePage />
    </ClientOnly>
  );
}
