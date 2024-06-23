import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/config";
import { PostCard, Container } from "../components";

const AllPost = () => {
  const [posts, setposts] = useState([]);
  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setposts(posts.documents);
        // console.log(posts);
      }
    });
  }, []);

  return (
    <div className="w-full py-8">
      <Container>
        <div className="check flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 sm:w-1/4  w-screen flex flex-col" >
              <PostCard {...post} />     
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default AllPost;
