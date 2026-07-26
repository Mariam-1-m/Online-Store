import { useState } from "react";
import { Lock } from "lucide-react";
import api from "../../lib/api";

export default function ChangePasswordCard() {
  const [showForm, setShowForm] = useState(false);
  const [step, setStep] = useState(1);

  const [passwords, setPasswords] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    });
  };

  const sendOtp = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/forgot-password", {
        email: passwords.email,
      });

      alert("OTP sent to your email");
      setStep(2);
    } catch (error) {
      console.log(error.response?.data);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/forgot-password/verify-otp", {
        email: passwords.email,
        otp: passwords.otp,
        newPassword: passwords.newPassword,
      });

      console.log(res.data);
      alert("Password updated successfully");

      setPasswords({
        email: "",
        otp: "",
        newPassword: "",
      });

      setStep(1);
      setShowForm(false);
    } catch (error) {
      console.log(error.response?.data);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-6 shadow-sm mt-5">
      <div className="flex items-center gap-2 mb-5">
        <Lock size={18} className="text-indigo-600" />
        <h2 className="text-lg font-semibold">Change Password</h2>
      </div>

      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="border border-indigo-600 text-indigo-600 px-5 py-2 rounded-lg hover:bg-indigo-600 hover:text-white duration-200"
        >
          Change Password
        </button>
      ) : (
        <form
          onSubmit={step === 1 ? sendOtp : verifyOtp}
          className="space-y-4"
        >
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={passwords.email}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 outline-none focus:border-indigo-600"
          />

          {step === 2 && (
            <>
              <input
                type="text"
                name="otp"
                placeholder="OTP"
                value={passwords.otp}
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
            </>
          )}

          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700"
            >
              {step === 1 ? "Send OTP" : "Save"}
            </button>

            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setStep(1);
                setPasswords({
                  email: "",
                  otp: "",
                  newPassword: "",
                });
              }}
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