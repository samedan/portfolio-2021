import BaseLayout from "@/components/layouts/BaseLayout";
import Link from "next/link";
import BasePage from "@/components/BasePage";
import { useGetPosts } from "@/actions";
import { useGetUser } from "@/actions/user";

const Portfolios = () => {
  const { data: dataU, loading: loadingU } = useGetUser();
  // cache is stored in the 'data'
  const { data, error, loading } = useGetPosts();

  const renderPosts = (posts) => {
    return posts.map((post) => (
      <li key={post.id}>
        {/* [id] comes from [id].js */}
        <Link as={`/portfolios/${post.id}`} href="/portfolios/[id]">
          <a>{post.title}</a>
        </Link>
      </li>
    ));
  };

  return (
    <BaseLayout user={dataU} loading={loadingU}>
      <BasePage>
        <h1>Portfolios</h1>
        {loading && <p>Loading...</p>}
        {data && <u>{renderPosts(data)}</u>}
        {error && <div className="alert alert-danger">{error.message}</div>}
      </BasePage>
    </BaseLayout>
  );
};

export default Portfolios;
