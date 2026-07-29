import PersonalDataCard from "../components/Profile/PersonalDataCard";
import AddressCard from "../components/Profile/AddressCard";
import ChangePasswordCard from "../components/Profile/ChangePasswordCard";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

import Loader from "../components/Loader";
function ProfilePage(){
  const {loading}=useContext(CartContext)
  
return (
  <>
  {loading?
    <Loader/>:   ( <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">
        My Profile
      </h1>

      <PersonalDataCard />

      <AddressCard />

      <ChangePasswordCard />
    </div>)}
</>
  );
}
export default ProfilePage;
