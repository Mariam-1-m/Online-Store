import { useState } from "react";
import { Lock } from "lucide-react";

export default function ChangePasswordCard() {
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log(passwords);

    
  };

  return (
    <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-6 shadow-sm mt-5">
      <div className="flex items-center gap-2 mb-5">
        <Lock size={18} className="text-indigo-600" />
        <h2 className="text-lg font-semibold">
          Change Password
        </h2>
      </div>

      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="border border-indigo-600 text-indigo-600 px-5 py-2 rounded-lg hover:bg-indigo-600 hover:text-white duration-200"
        >
          Change Password
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="password"
            name="currentPassword"
            placeholder="Current Password"
            value={passwords.currentPassword}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 outline-none focus:border-indigo-600"
          />

          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={passwords.newPassword}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 outline-none focus:border-indigo-600"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={passwords.confirmPassword}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 outline-none focus:border-indigo-600"
          />

          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700"
            >
              Save
            </button>

            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="border px-5 py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>

        </form>
      )}
    </div>
  );
}