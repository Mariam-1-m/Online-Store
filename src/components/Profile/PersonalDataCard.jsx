import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../lib/api";
import { Mail, Phone } from "lucide-react";
import Loader from "../Loader";
export default function PersonalDataCard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    avatar: "",
  });

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await api.get("/auth/me");

        console.log("profile Data", res.data);

        setUser(res.data.user);

        setFormData({
          username: res.data.user.username,
          phone: res.data.user.phone,
          avatar: res.data.user.avatar || "",
        });
      } catch (error) {
        console.log("PersonalData Error:", error.response?.data);
      }
    };

    getUser();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      await api.patch(`/users/${user._id}`, formData);

      const res = await api.get("/auth/me");

      setUser(res.data.user);

      setFormData({
        username: res.data.user.username,
        phone: res.data.user.phone,
        avatar: res.data.user.avatar || "",
      });

      setEditing(false);

      alert("Profile updated successfully");
    } catch (error) {
      console.log(error.response?.data);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  if (!user) {
    return <h2 className="text-center text-xl"><Loader/></h2>;
  }

  return (
    <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-6 shadow-sm">
      <div className="flex flex-col md:flex-row gap-5">
        <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.username}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-xl font-bold text-gray-500">
              {user.username?.charAt(0).toUpperCase()}
            </span>
          )}
        </div>

        <div className="flex-1">
          {editing ? (
            <>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                className="w-full border rounded-lg px-4 py-2 mb-3"
              />

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="w-full border rounded-lg px-4 py-2 mb-3"
              />

              <input
                type="text"
                name="avatar"
                value={formData.avatar}
                onChange={handleChange}
                placeholder="Avatar URL"
                className="w-full border rounded-lg px-4 py-2 mb-4"
              />

              <div className="flex gap-3">
                <button
                  onClick={handleUpdate}
                  className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700"
                >
                  Save
                </button>

                <button
                  onClick={() => setEditing(false)}
                  className="border px-5 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold">
                {user.username}
              </h2>

              <p className="text-gray-500 text-sm">
                {user.email}
              </p>

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

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setEditing(true)}
                  className="px-5 py-2 rounded-lg border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white duration-200"
                >
                  Edit Profile
                </button>

                <button
                  onClick={handleLogout}
                  className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 duration-200"
                >
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}