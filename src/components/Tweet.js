import Nav from "./Nav";
import { useCookies } from "react-cookie";
import React, { useState, useEffect } from "react";
import user from "../assets/user.png";
import verified from "../assets/verified.svg";
import chief from "../assets/cheif_tweet.svg";
import { useSearchParams } from "react-router-dom";
import { Navigate } from "react-router-dom";

const Tweet = () => {
  const [cookies] = useCookies(["userId"]);
  const token = cookies.userId;
  const [searchparams] = useSearchParams();
  const [tweet, setTweet] = useState({});
  const [comment, setComment] = useState({});
  const [loading, setLoading] = useState(true);

  const id = searchparams.get("id");

  useEffect(() => {
    const fetchTweet = async () => {
      try {
        const res = await fetch(`http://localhost:7000/api/v1/tweet/${id}`);
        const data = await res.json();
        setTweet(data.data);
        setComment(data.cmnts);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTweet();
  }, [id]);

  if (!tweet) {
    return <div>Loading...</div>;
  }

  if (!cookies.userId) {
    return <Navigate to="/signin" />;
  }
  return (
    <>
      <Nav />
      <div className="h-screen grid grid-cols-12 text-white pb-10">
        <div className="col-span-2 ml-10"></div>
        <div className="col-span-8 h-auto w-full px-10">
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
            <div className="bg-[#1B2730] w-auto p-10 rounded-2xl mx-auto">
              <div className="flex space-x-6 bg-[#1B2730] p-10 mt-5 w-full rounded-2xl flex-col">
                <div className="flex w-full">
                  <img src={tweet.owner.profile} className="h-14 w-14 rounded-full" />
                  <div className="flex mx-4 space-y-1 flex-col">
                    <div className="flex">
                      <p className="font-inter text-xl">{tweet.owner.name}</p>
                      <img className="h-5 w-5 my-1 mx-2" src={verified} />
                      <img className="h-5 w-5 my-1 mx-1" src={chief} />
                    </div>
                    <p className="font-figtree text-[#738A9E]">
                      @{tweet.owner.name.replace(/\s+/g, "").toLowerCase()}
                    </p>
                  </div>
                </div>
                <div className="h-auto px-12 mt-10 mb-5 font-figtree text-[#BEBEBE] font-light">
                  <p className="text-xl">{tweet.text}</p>
                </div>

                {/* <div className="px-10 pt-4 mb-5 flex space-x-5">
                                    <div className=" flex space-x-3 cursor-pointer">
                                        <img src={like} className=""/>
                                        <p className="text-[#738A9E] font-satoshi">{tweet.likes.length}</p>
                                    </div>

                                    <div className=" flex space-x-3">
                                        <img src={comment} className=""/>
                                        <p className="text-[#738A9E] font-satoshi">0</p>
                                    </div>

                                    <div className=" flex space-x-3">
                                        <img src={retweet} className=""/>
                                        <p className="text-[#738A9E] font-satoshi">{tweet.retweets.length}</p>
                                    </div>
                                </div> */}
                <div className="w-full px-12 my-5">
                  <textarea
                    className="h-28 w-full outline-none rounded-xl border border-gray-600 text-white bg-[#28343E] px-10 py-5 font-satoshi text-xl"
                    placeholder="Tweet Reply"
                  ></textarea>
                  <button className="px-6 py-2 bg-sky-600 font-satoshi text-2xl rounded-3xl absolute mt-8 -mx-36">
                    Reply
                  </button>
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
                  comment.map((comment) => (
                    <div className="px-12 w-full">
                      <div className="flex space-x-6 bg-[#1B2730] p-10 rounded-2xl flex-col border border-gray-400">
                        <div className="flex w-full">
                          <img src={comment.owner.profile} className="h-12 w-12 rounded-full" />
                          <div className="flex mx-4 my-3">
                            <p className="font-inter text-xl">
                              {comment.owner.name}
                            </p>
                            <p className="font-figtree text-[#738A9E] mx-2">
                              @
                              {comment.owner.name
                                .replace(/\s+/g, "")
                                .toLowerCase()}
                            </p>
                          </div>
                        </div>
                        <div className="h-auto px-12 font-figtree text-[#BEBEBE] font-light">
                          <p className="-ml-2">{comment.text}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <div className="col-span-2 mr-10"></div>
      </div>
    </>
  );
};

export default Tweet;
