import PersonalDataCard from "../components/Profile/PersonalDataCard";
import AddressCard from "../components/Profile/AddressCard";
import ChangePasswordCard from "../components/Profile/ChangePasswordCard";
function ProfilePage(){
return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">
        My Profile
      </h1>

      <PersonalDataCard />

      <AddressCard />

      <ChangePasswordCard />
    </div>
  );
}
export default ProfilePage;
