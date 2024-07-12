import Appbar from "../components/Appbar";
import { FullBlog } from "../components/FullBlog";
import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";
import BlogSkeleton from "../components/Blogskeleton";

const BlogPage = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({
    id: id || ""
  });

  if (loading || !blog) { // Handle the case where blog is null or undefined
    return (
      <div>
        <Appbar /> 
        <div className="flex justify-center">
          <div>
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
          </div>
        </div>
      </div>
    );
  }

  return <FullBlog blog={blog} />;
};

export default BlogPage;
