import { useEffect, useState } from "react";
import api from "../../lib/api";
import { Mail, Phone } from "lucide-react";

export default function PersonalDataCard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await api.get("/auth/me");

        console.log("profile Data",res.data);
        setUser(res.data.user);

      } catch (error) {
  console.log("PersonalData Error:", error.response?.data);
}
    };

    getUser();
  }, []);

  if (!user) {
    return <h2 className="text-center text-xl">Loading...</h2>;
  }

  return (
    <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-6 shadow-sm">
      <div className="flex flex-col md:flex-row gap-5">
        <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
          {user.image ? (
            <img
              src={user.image}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-xl font-bold text-gray-500">
              {user.name?.charAt(0).toUpperCase()}
            </span>
          )}
        </div>

        <div className="flex-1">
          <h2 className="text-xl font-semibold">{user.name}</h2>

          <p className="text-gray-500 text-sm">{user.email}</p>

          <span className="text-indigo-600 text-sm font-medium">
            {user.role}
          </span>

          <div className="mt-5 space-y-2 text-gray-600 dark:text-gray-300">
            <div className="flex items-center gap-2">
              <Mail size={16} />
              <span>{user.email}</span>
            </div>

            <div className="flex items-center gap-2">
              <Phone size={16} />
              <span>{user.phone}</span>
            </div>
          </div>

          <button className="mt-6 px-5 py-2 rounded-lg border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white duration-200">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}