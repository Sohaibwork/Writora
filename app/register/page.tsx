"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import "@/app/styles/signup.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function handleRegister(e: any) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      const data = await res.json();
      setLoading(true);
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.error("Registration failed. Please try again.");
      }
      setError(data.error);
    } else {
      toast.success("Registration successful,Please login");

      router.push("/sign-in");
    }
  }

  return (
    <div className="h-[100vh] flex">
      {/* Left Panel */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          {/* Thumbs up icon */}
          <div className="absolute bottom-20 left-10 w-16 h-16 bg-purple-400/30 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-white/70"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558-.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z" />
            </svg>
          </div>

          {/* Lock icon */}
          <div className="absolute top-32 right-20 w-20 h-20 bg-pink-300/40 rounded-2xl flex items-center justify-center transform rotate-12">
            <svg
              className="w-10 h-10 text-white/70"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3V12.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm-3.75 8.25v-3a3.75 3.75 0 117.5 0v3h-7.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          {/* Leaf decoration */}
          <div className="absolute bottom-32 right-16 w-24 h-32 bg-pink-300/30 rounded-full transform rotate-45"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
          {/* Logo */}
          <div className="flex items-center space-x-3"></div>

          {/* Welcome text and phone mockup */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="mb-6">
              <h1 className="text-4xl font-bold mb-4">Welcome to Writora</h1>
              <p className="text-xl text-white/90">Join Us Now !</p>
            </div>

            {/* Phone mockup */}
            <div className="flex justify-center ">
              <div className="relative">
                <div className="w-64 h-[450px] bg-gray-800 rounded-[3rem] p-2 shadow-2xl">
                  <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
                    {/* Phone screen content */}
                    <div className="p-6 space-y-4">
                      {/* Profile section */}
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center">
                          <svg
                            className="w-6 h-6 text-purple-600"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fillRule="evenodd"
                              d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div className="h-3 bg-purple-300 rounded w-24"></div>
                      </div>

                      {/* Content bars */}
                      <div className="space-y-3">
                        <div className="h-2 bg-purple-200 rounded w-16"></div>
                        <div className="h-2 bg-purple-200 rounded w-20"></div>
                        <div className="h-2 bg-purple-200 rounded w-12"></div>
                        <div className="h-2 bg-purple-200 rounded w-18"></div>
                        <div className="h-2 bg-purple-200 rounded w-14"></div>
                      </div>

                      {/* Dots */}
                      <div className="flex space-x-1 mt-6">
                        {[...Array(8)].map((_, i) => (
                          <div
                            key={i}
                            className="w-2 h-2 bg-purple-200 rounded-full"
                          ></div>
                        ))}
                      </div>

                      {/* Bottom section */}
                      <div className="mt-8">
                        <div className="h-16 bg-purple-300 rounded-lg"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Create New Account
            </h2>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={form.password}
                  minLength={8}
                  maxLength={16}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
                />
                {error && <p className="text-red-500">{error}</p>}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform cursor-pointer -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              className="w-full bg-purple-600 cursor-pointer hover:bg-purple-700 text-white py-3 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    ></path>
                  </svg>
                  Loading...
                </div>
              ) : (
                "Register"
              )}
            </button>

            <div className="text-center text-gray-600">
              Already have an account?
              <button className="text-blue-500 hover:underline ml-1">
                <Link href={"/sign-in"}>Login</Link>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
