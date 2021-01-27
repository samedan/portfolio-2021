import Link from "next/link";
import moment from "moment";

const BlogItem = ({ blog }) => {
  return (
    <div>
      <div className="post-preview clickable">
        <Link href="/blogs/[slug]" as={`/blogs/${blog.slug}`}>
          <a>
            <h2 className="post-title">{blog.title}</h2>
            <h3 className="post-subtitle">{blog.subTitle}</h3>
          </a>
        </Link>
        <p className="post-meta">
          Posted by
          <a href="#"> {blog.author.name} </a>-
          {/* "2021-01-23T09:19:18.915Z".split('T')[0].split('-).join(':') */}
          {/* "2021:01:23" */}
          {moment(blog.createdAt).format("LLLL")}
        </p>
      </div>
    </div>
  );
};

export default BlogItem;
