import { useState } from "react";
import { userRegister } from "../../api/apis";

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const data = {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      };

      const res = await userRegister(data);
      console.log("Register success:", res);
    } catch (err) {
      console.error("Registration failed");
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="text-center bg-gradient-to-r from-blue-800 to-blue-400 min-h-[180px] sm:p-6 p-4">
        <h1 className="sm:text-3xl text-2xl text-white font-medium mt-3">
          Create your free account
        </h1>
      </div>

      {/* Form Container */}
      <div className="mx-4 mb-4 -mt-20">
        <form
          onSubmit={handleRegister}
          className="max-w-4xl max-md:max-w-xl mx-auto bg-white shadow-[0_2px_13px_-6px_rgba(0,0,0,0.4)] sm:p-8 p-4 rounded-md"
        >
          {/* Social buttons (UI only) */}
          <div className="grid md:grid-cols-2 gap-6">
            <button
              type="button"
              className="w-full px-4 py-2.5 flex items-center justify-center rounded-md text-slate-900 text-sm font-medium bg-slate-100 hover:bg-slate-200"
            >
              Continue with Google
            </button>

            <button
              type="button"
              className="w-full px-4 py-2.5 flex items-center justify-center rounded-md text-white text-sm font-medium bg-slate-800 hover:bg-slate-900"
            >
              Continue with Apple
            </button>
          </div>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-neutral-300"></div>
            <p className="mx-4 text-slate-500">Or</p>
            <div className="flex-1 border-t border-neutral-300"></div>
          </div>

          {/* Inputs */}
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <label className="text-slate-900 text-sm font-medium mb-2 block">
                First Name
              </label>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="bg-slate-100 focus:bg-transparent w-full text-sm px-4 py-2.5 rounded-sm border border-gray-200 focus:border-blue-600 outline-none"
                placeholder="Enter first name"
              />
            </div>

            <div>
              <label className="text-slate-900 text-sm font-medium mb-2 block">
                Last Name
              </label>
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="bg-slate-100 focus:bg-transparent w-full text-sm px-4 py-2.5 rounded-sm border border-gray-200 focus:border-blue-600 outline-none"
                placeholder="Enter last name"
              />
            </div>

            <div>
              <label className="text-slate-900 text-sm font-medium mb-2 block">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-100 focus:bg-transparent w-full text-sm px-4 py-2.5 rounded-sm border border-gray-200 focus:border-blue-600 outline-none"
                placeholder="Enter email"
              />
            </div>

            <div>
              <label className="text-slate-900 text-sm font-medium mb-2 block">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-slate-100 focus:bg-transparent w-full text-sm px-4 py-2.5 rounded-sm border border-gray-200 focus:border-blue-600 outline-none"
                placeholder="Enter password"
              />
            </div>

            <div>
              <label className="text-slate-900 text-sm font-medium mb-2 block">
                Confirm Password
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-slate-100 focus:bg-transparent w-full text-sm px-4 py-2.5 rounded-sm border border-gray-200 focus:border-blue-600 outline-none"
                placeholder="Confirm password"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="mt-8">
            <button
              type="submit"
              className="w-full py-2.5 px-5 text-sm font-medium rounded-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
