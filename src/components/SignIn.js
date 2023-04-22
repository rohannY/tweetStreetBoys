import show from "../assets/show.svg";
import hide from "../assets/hide.svg";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const SignIn = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [cookie, setCookie] = useCookies(["user"]);
  const [loginError, setLoginError] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (cookie.userId) {
      navigate("/");
    }
  }, [navigate]);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:7000/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (data.success) {
        setIsLoading(false);
        setCookie("userId", data.token, { path: "/" });
        navigate("/");
      } else {
        setIsLoading(false);
        setLoginError(true);
      }
    } catch (error) {}
  }

  return (
    <>
      <div className="min-h-screen overflow-hidden flex items-center bg-white dark:bg-gray-900 font-satoshi">
        <div className="container mx-auto">
          <div className="max-w-md mx-auto my-10 border border-white p-10 rounded-xl">
            <div className="flex justify-center">
              <svg
                viewBox="0 0 24 24"
                className=" h-12 w-12 text-white"
                fill="currentColor"
              >
                <g>
                  <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
                </g>
              </svg>
            </div>
            <div className="text-center">
              <h1 className="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">
                Log in to Twitter
              </h1>
            </div>
            <div className="m-7">
              <form action="">
                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="you@company.com"
                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <label
                      htmlFor="password"
                      className="text-sm text-gray-600 dark:text-gray-400"
                    >
                      Password
                    </label>
                  </div>
                  <div className="relative flex items-center justify-center">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      placeholder="Your Password"
                      className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                      onChange={(event) => setPassword(event.target.value)}
                    />
                    <button
                      type="button"
                      className="absolute right-0 mt-1 mr-3 text-gray-600 focus:outline-none"
                      onClick={handleTogglePassword}
                    >
                      {showPassword ? <img src={show} /> : <img src={hide} />}
                    </button>
                  </div>
                </div>
                {loginError && (
                  <div>
                    <p className="mb-4 flex justify-center text-red-400">
                      Error! Invalid Credentials
                    </p>
                  </div>
                )}

                <div className="mb-6">
                  <button
                    type="button"
                    className="w-full px-3 py-4 flex justify-center text-white bg-sky-600 rounded-md focus:bg-blue-900 focus:outline-none"
                    onClick={handleSubmit}
                  >
                    {isLoading ? (
                      <div
                        style={{ borderTopColor: "transparent" }}
                        className="w-6 h-6 border-2 border-blue-200 rounded-full animate-spin"
                      />
                    ) : (
                      <span className="font-semibold text-xl">Log in</span>
                    )}
                  </button>
                </div>
                <p className="text-sm text-center text-gray-400">
                  Don't have an account yet?{" "}
                  <a
                    href="http://localhost:3000/signUp"
                    className="text-indigo-400 focus:outline-none focus:underline focus:text-indigo-500 dark:focus:border-indigo-800"
                  >
                    Sign up
                  </a>
                  .
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
