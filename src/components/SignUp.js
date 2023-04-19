import vector from "../assets/vector.svg";
import twitter from "../assets/Twitter.svg";
import { useState } from "react";
import { useCookies } from "react-cookie";

const SignUp = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState();
  const [email, setEmail] = useState();
  const [password, setPass] = useState();
  const [cookie, setCookie] = useCookies(["user"]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = fname.concat(" ", lname);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name, email: email, password: password }),
    };
    fetch("http://localhost:7000/api/v1/auth/register", requestOptions)
      .then((response) => response.json())
      .then((data) => setCookie("userId", data.token, { path: "/" }));
  };

  return (
    <>
      <div className="bg-[#06141D] h-screen">
        <div className="min-w-screen min-h-screen bg-gray-900 flex items-center justify-center px-5 py-5">
          <div className="bg-gray-100 text-gray-500  shadow-xl w-full overflow-hidden max-w-max">
            <div className="md:flex w-full">
              <div className="hidden md:block w-1/2 bg-black py-10 px-10">
                <img src={twitter} className="h-12 w-12 mt-1" />
                <img src={vector} className="h-60 mt-24 ml-10"></img>
              </div>
              <div className="w-full md:w-1/2 py-10 px-5 md:px-10 font-figtree">
                <div className="text-center mb-10">
                  <h1 className="font-bold text-3xl text-gray-900">Sign Up</h1>
                  <p>Enter your information to register</p>
                </div>
                <div>
                  <div className="flex -mx-3">
                    <div className="w-1/2 px-3 mb-5">
                      <label for="" className="text-xs font-semibold px-1">
                        First name
                      </label>
                      <div className="flex">
                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                          <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
                        </div>
                        <input
                          onChange={(event) => setFname(event.target.value)}
                          type="text"
                          className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                          placeholder="John"
                        />
                      </div>
                    </div>
                    <div className="w-1/2 px-3 mb-5">
                      <label for="" className="text-xs font-semibold px-1">
                        Last name
                      </label>
                      <div className="flex">
                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                          <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
                        </div>
                        <input
                          onChange={(event) => setLname(event.target.value)}
                          type="text"
                          className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                          placeholder="Smith"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex -mx-3">
                    <div className="w-full px-3 mb-5">
                      <label for="" className="text-xs font-semibold px-1">
                        Email
                      </label>
                      <div className="flex">
                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                          <i className="mdi mdi-email-outline text-gray-400 text-lg"></i>
                        </div>
                        <input
                          onChange={(event) => setEmail(event.target.value)}
                          type="email"
                          className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                          placeholder="johnsmith@example.com"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex -mx-3">
                    <div className="w-full px-3 mb-5">
                      <label for="" className="text-xs font-semibold px-1">
                        Password
                      </label>
                      <div className="flex">
                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                          <i className="mdi mdi-lock-outline text-gray-400 text-lg"></i>
                        </div>
                        <input
                          onChange={(event) => setPass(event.target.value)}
                          type="text"
                          className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                          placeholder="************"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex -mx-3">
                    <div className="w-full px-3  mb-12">
                      <label for="" className="text-xs font-semibold px-1">
                        Upload Profile Image
                      </label>
                      <div className="flex">
                        <input
                          type="file"
                          className="file-input file-input-bordered w-full max-w-xs"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex -mx-3">
                    <div className="w-full px-3 mb-5">
                      <button
                        onClick={handleSubmit}
                        className="block w-full max-w-xs mx-auto bg-sky-600 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
                      >
                        REGISTER NOW
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
