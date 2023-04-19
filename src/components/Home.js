import send from "../assets/send.svg";
import user from "../assets/user.png";
import chief from "../assets/cheif_tweet.svg";
import like from "../assets/Like.svg";
import comment from "../assets/Comment.svg";
import retweet from "../assets/Retweet.svg";
import verified from "../assets/verified.svg";
import Nav from "./Nav";
import { useCookies } from "react-cookie";
import React, { useState, useEffect } from "react";
import { createSearchParams, Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [cookies] = useCookies(["userId"]);
  const [tweets, setTweets] = useState("");
  const [loading, setLoading] = useState(true);
  const [createTweet, setCrTweet] = useState("");
  const navigate = useNavigate();
  const token = cookies.userId;

  useEffect(() => {
    setTimeout(() => {
      fetch("http://localhost:7000/api/v1/tweet")
        .then((res) => res.json())
        .then((data) => {
          setTweets(data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }, 2000);
  }, []);

  const postTweet = async (event) => {
    event.preventDefault();
    const tweet = { text: createTweet };

    const response = await fetch("http://localhost:7000/api/v1/tweet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(tweet),
    });

    if (response.ok) {
      window.location.reload();
    } else {
      console.error("Error posting tweet");
    }
  };

  const handleLike = async (tweetId) => {
    try {
      const response = await fetch(`http://localhost:7000/api/v1/tweet/${tweetId}/like`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({}),
      });

      const data = await response.json();
      console.log(data);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleTweet = (id) => {
    console.log(id);
    navigate({
      pathname: "/tweet",
      search: createSearchParams({
        id: id,
      }).toString(),
    });
  };

  return (
    <>
      <Nav />
      <div className="h-max grid grid-cols-12 text-white pb-10">
        <div className="col-span-3 ml-10">
          <div className="bg-[#1B2730] w-auto p-10 rounded-2xl">
            <p className="font-poppins font-bold text-2xl mb-10">
              Who to follow
            </p>

            <div className="flex space-x-7 mt-8">
              <img src={user} className="h-14 w-14" />
              <div>
                <p className="font-poppins font-medium">Elon Musk</p>
                <p className="font-poppins font-thin">@elonmusk</p>
              </div>
              <button class="shadow bg-white focus:shadow-outline focus:outline-none text-[#4F5D69] px-6 h-12 rounded-3xl font-bold">
                Follow
              </button>
            </div>

            <div className="flex space-x-7 mt-8">
              <img src={user} className="h-14 w-14" />
              <div>
                <p className="font-poppins font-medium">Elon Musk</p>
                <p className="font-poppins font-thin">@elonmusk</p>
              </div>
              <button class="shadow bg-white focus:shadow-outline focus:outline-none text-[#4F5D69] px-6 h-12 rounded-3xl font-bold">
                Follow
              </button>
            </div>

            <div className="flex space-x-7 mt-8">
              <img src={user} className="h-14 w-14" />
              <div>
                <p className="font-poppins font-medium">Elon Musk</p>
                <p className="font-poppins font-thin">@elonmusk</p>
              </div>
              <button class="shadow bg-white focus:shadow-outline focus:outline-none text-[#4F5D69] px-6 h-12 rounded-3xl font-bold">
                Follow
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-6 h-auto w-full px-10">
          <div className="flex space-x-6 bg-[#1B2730] p-10 w-full rounded-2xl">
            <div className="flex space-x-5 w-full">
              <textarea
                onChange={(event) => setCrTweet(event.target.value)}
                className="h-20 w-full outline-none rounded-2xl text-white bg-[#28343E] px-10 py-4 font-satoshi text-xl"
                placeholder="What's Happening?"
              ></textarea>
              <div className="h-16 w-20 mt-2 px-5 py-3 bg-[#0D1E29] rounded-xl cursor-pointer">
                <img
                  src={send}
                  onClick={postTweet}
                  className="h-10 w-10 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {loading ? (
            <div className="p-10 mt-5 w-full rounded-2xl">
              <div className="status flex justify-center">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            tweets.map((tweet) => (
              <div className="flex space-x-6 bg-[#1B2730] p-10 mt-5 w-full rounded-2xl flex-col">
                <div className="flex w-full">
                  <img
                    src={tweet.owner.profile}
                    className="h-14 w-14 rounded-full"
                  />
                  <div className="flex mx-4 my-3">
                    <p className="font-inter text-xl">{tweet.owner.name}</p>
                    {tweet.owner.name === "elon" && (
                      <div>
                        <img className="h-5 w-5 my-1 mx-2" src={verified} />
                        <img className="h-5 w-5 my-1 mx-1" src={chief} />
                      </div>
                    )}
                    <p className="font-figtree text-[#738A9E] mx-2">
                      @{tweet.owner.name.replace(/\s+/g, "").toLowerCase()}
                    </p>
                  </div>
                </div>
                <div className="h-auto px-12 font-figtree text-[#BEBEBE] font-light">
                  <p
                    key={tweet._id}
                    onClick={() => handleTweet(tweet._id)}
                    className="cursor-pointer"
                  >
                    {tweet.text}
                  </p>
                </div>
                <div className="px-10 pt-4 flex space-x-5">
                  <div
                    className=" flex space-x-3 cursor-pointer"
                    key={tweet._id}
                    onClick={() => handleLike(tweet._id)}
                  >
                    <img src={like} className="" />
                    <p className="text-[#738A9E] font-satoshi">
                      {tweet.likes.length}
                    </p>
                  </div>

                  <div className=" flex space-x-3">
                    <img src={comment} className="" />
                    <p className="text-[#738A9E] font-satoshi">0</p>
                  </div>

                  <div className=" flex space-x-3">
                    <img src={retweet} className="" />
                    <p className="text-[#738A9E] font-satoshi">
                      {tweet.retweets.length}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="col-span-3 mr-10">
          <div className="bg-[#1B2730] w-full p-10 rounded-2xl">
            <p className="font-poppins font-bold text-2xl mb-10">
              What's Happening
            </p>

            <div className="mt-8 mx-2 space-y-2">
              <p className="font-poppins font-medium text-2xl">#IPL</p>
              <p className="font-poppins font-thin text-lg">190k Tweets</p>
            </div>

            <div className="mt-8 mx-2 space-y-2">
              <p className="font-poppins font-medium text-2xl">#SRHvMI</p>
              <p className="font-poppins font-thin text-lg">190k Tweets</p>
            </div>

            <div className="mt-8 mx-2 space-y-2">
              <p className="font-poppins font-medium text-2xl">#AppleBKC</p>
              <p className="font-poppins font-thin text-lg">190k Tweets</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
