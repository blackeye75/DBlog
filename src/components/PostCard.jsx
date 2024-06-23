import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  // console.log($id);
  return (
    <div className="p-2" >
      <Link to={`/post/${$id}`}>
        <div className="w-full md:w-full  flex flex-col  bg-gray-100 rounded-xl  p-4">
          <div className="w-full justify-center mb-4">
            <img
              src={appwriteService.getFilePreview(featuredImage)}
              alt={title}
              className="rounded-xl w-"
            />
          </div>
          <h2 className="text-xl font-bold" >{title}</h2>
        </div>
      </Link>
    </div>
  );
}

export default PostCard;
