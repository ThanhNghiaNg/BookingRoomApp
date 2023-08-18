import { UserProfile } from "@clerk/nextjs";

const UserProfilePage = () => (
  <div className="flex justify-center">
    <UserProfile path="/user-profile" routing="hash"  />
  </div>
);

export default UserProfilePage;
