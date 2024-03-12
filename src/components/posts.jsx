import { React, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import DeleteComponent from "./delete";
import UpdateComponent from "./update";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/posts");
      const fetchedPosts = response.data;

      setPosts(fetchedPosts.reverse());

      console.log(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleDelete = (deletedPostId) => {
    setPosts((prevPosts) =>
      prevPosts.filter((post) => post.id !== deletedPostId)
    );
  };

  return (
    <div className="flex flex-col justify-center items-center gap-10 pt-5">
      {posts.map((post) => (
        <div
          key={post.id}
          className="flex flex-col justify-center items-center gap-5 pt-5"
        >
          <div className="flex gap-2  w-11/12 justify-center relative top-6">
            <div className="avatar">
              <div className=" w-8 rounded-full">
                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
            <div className="flex justify-center items-center gap-3 text-slate-400 text-sm">
              <p className="">Katen Doe </p>
              <p>.</p>
              <p>March 11, 2024</p>
              <p>.</p>
              <p className="flex flex-row justify-center items-center">
                <FontAwesomeIcon
                  icon={faComment}
                  style={{ color: "#73008a", fontSize: "20px" }}
                />
                (0)
              </p>
            </div>
          </div>
          <div className="">
            <h1 className=" text-3xl w-full text-fuchsia-900">{post.title}</h1>
          </div>
          <div className="">
            <img src={post.image} alt="" className="rounded-xl" />
          </div>
          <div className=" w-3/6">
            <p>{post.description}</p>
          </div>
          <div className="border-b border-fuchsia-800 w-3/6 opacity-30"></div>
          <div className="flex gap-2">
            {sessionStorage.getItem("postId")?.includes(post.id) && (
              <>
                <DeleteComponent postId={post.id} onDelete={handleDelete} />
                <UpdateComponent postId={post.id} />
              </>
            )}
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
}
