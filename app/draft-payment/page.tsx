import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "../components/ClientOnly";
import Container from "../components/Container";
import DraftPaymentClient from "./DraftPaymentClient";

interface SearchProps {
  searchParams: { money: string };
}

const Search = async ({ searchParams }: SearchProps) => {
  const user = await getCurrentUser();

  return (
    <ClientOnly>
      <Container>
        <DraftPaymentClient searchParams={searchParams} user={user} />
      </Container>
    </ClientOnly>
  );
};

export default Search;
