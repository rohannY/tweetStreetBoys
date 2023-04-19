import twitter from "../assets/Twitter.svg";
import home from "../assets/Home.svg";
import bell from "../assets/Bell.svg";
import mssg from "../assets/mssg.svg";
import log from "../assets/log.svg";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";

const Nav = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["userId"]);

  if (!cookies.userId) {
    return <Navigate to="/signin" />;
  }

  function handleLogout() {
    removeCookie("userId");
    window.location.reload();
  }

  return (
    <>
      <div className="w-full bg-[#06141D] grid grid-cols-12 py-10">
        <div className="col-span-3 ml-10 flex space-x-10">
          <img src={twitter} className="h-12 w-12 mt-1" />
          <input
            type="text"
            placeholder="# Explore"
            className="bg-[#1B2730] font-figtree text-xl text-white py-4 px-7 w-full rounded-xl outline-none"
          />
        </div>

        <div className="col-span-6 ">
          <div className="flex justify-end space-x-5 mr-10">
            <button className="flex space-x-2 rounded-full font-poppins font-medium text-xl py-3 pl-4 pr-6 mt-1 bg-white ">
              <img src={home} />
              <p className="">Home</p>
            </button>

            <button className="">
              <img src={bell} />
            </button>

            <button className="">
              <img src={mssg} />
            </button>

            <button className="" onClick={handleLogout}>
              <img src={log} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
