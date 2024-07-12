import Appbar from '../components/Appbar'
import {BlogCard} from '../components/BlogCard'
import { useBlogs } from "../hooks";
import BlogSkeleton from "../components/Blogskeleton";


const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return <div>
        <Appbar /> 
        <div  className="flex justify-center">
            <div>
                <BlogSkeleton />
                <BlogSkeleton />
                <BlogSkeleton />
                <BlogSkeleton />
                <BlogSkeleton />
            </div>
        </div>
    </div>
}

  return (
    <>
     <div>
        <Appbar />
        <div  className="flex justify-center">
            <div>
                {blogs.map(blog => <BlogCard
                    id={blog.id}
                    authorName={blog.author.name || "Anonymous"}
                    title={blog.title}
                    content={blog.content}
                    publishedDate={"2nd Feb 2024"}
                />)}
            </div>
        </div>
    </div>
    </>
  )
}

export default Blogs
