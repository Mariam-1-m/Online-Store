import { useState } from "react";
import { MapPin, Plus } from "lucide-react";

export default function AddressCard() {
  const [address, setAddress] = useState({
    country: "",
    city: "",
    street: "",
    building: "",
    postalCode: "",
  });

  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(address);
  };

  return (
    <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-6 shadow-sm mt-5">

      <div className="flex items-center gap-2 mb-4">
        <MapPin className="text-indigo-600" size={18} />
        <h2 className="font-semibold text-lg">
          Addresses
        </h2>
      </div>

      <p className="text-sm text-gray-500 mb-4">
        No addresses yet.
      </p>

      <form onSubmit={handleSubmit}>

        <div className="grid md:grid-cols-2 gap-4">

          <input
            type="text"
            name="country"
            placeholder="Country"
            value={address.country}
            onChange={handleChange}
            className="border rounded-lg px-4 py-2 outline-none focus:border-indigo-500"
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={address.city}
            onChange={handleChange}
            className="border rounded-lg px-4 py-2 outline-none focus:border-indigo-500"
          />

          <input
            type="text"
            name="street"
            placeholder="Street"
            value={address.street}
            onChange={handleChange}
            className="border rounded-lg px-4 py-2 outline-none focus:border-indigo-500"
          />

          <input
            type="text"
            name="building"
            placeholder="Building"
            value={address.building}
            onChange={handleChange}
            className="border rounded-lg px-4 py-2 outline-none focus:border-indigo-500"
          />

        </div>

        <input
          type="text"
          name="postalCode"
          placeholder="Postal code"
          value={address.postalCode}
          onChange={handleChange}
          className="border rounded-lg px-4 py-2 outline-none focus:border-indigo-500 w-full mt-4"
        />

        <button
          type="submit"
          className="mt-5 flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg transition"
        >
          <Plus size={16} />
          Add Address
        </button>

      </form>

    </div>
  );
}