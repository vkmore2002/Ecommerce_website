import { useState } from "react";
import { userLogin } from "../../api/apis";
import { Link, useNavigate } from "react-router-dom";
import ForgotPassword from "../../src/assets/ForgotPassword.gif";
import logoWithFloatingRightText from "../../src/assets/logoWithFloatingRightText1.png";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await userLogin({ email, password });
      console.log("Login response:", response);

      if (response?.token) {
        localStorage.setItem("token", response.token);
        navigate("/");
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError(err.response?.data || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        {/* LEFT */}
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div>
            <img
              src={logoWithFloatingRightText}
              className="w-100 mx-auto mb-2"
              alt="logo"
            />
          </div>

          <div className="mt-6 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">Sign In</h1>

            <div className="w-full flex-1 mt-4">
              <form onSubmit={handleLogin} className="mx-auto max-w-xs">
                <input
                  type="email"
                  required
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-6 py-3.5 rounded-lg font-medium bg-gray-100 border border-gray-200"
                />

                <input
                  type="password"
                  required
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 mt-5"
                />

                {error && (
                  <p className="text-red-500 text-sm mt-3 text-center">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all"
                >
                  Login
                </button>

                <p className="mt-6 text-xs text-gray-600 text-center">
                  Don&apos;t have an account?{" "}
                  <Link
                    to="/register"
                    className="text-indigo-600 hover:underline"
                  >
                    Register
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex-1 bg-indigo-100 hidden lg:flex items-center justify-center px-6 py-4">
          <img
            src={ForgotPassword}
            alt="Forgot password"
            className="max-w-[92%] max-h-[92%] object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
