import Post from "../post/Post";
import "./posts.scss";
import { makeRequest } from "../../axios.js";
import {useQuery} from '@tanstack/react-query'

const Posts = ({userId}) => {
  //TEMPORARY
  const { isLoading, error, data } = useQuery({
    queryKey: ["posts"],
    queryFn: () =>
      makeRequest.get("/posts?userId=" + userId).then((res) => {
        return res.data;
      }),
  });

  console.log(error)

  return <div className="posts">
    {error
    ? "something went wrong!":
    isLoading
    ?"loadinng"
  :data.map((post)=> <Post post={post} key={post.id}/>)}
  </div>;
};

export default Posts;
