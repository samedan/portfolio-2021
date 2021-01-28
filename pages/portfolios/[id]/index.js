import BaseLayout from "@/components/layouts/BaseLayout";
import BasePage from "@/components/BasePage";
import { useGetUser } from "@/actions/user";
import PortfolioApi from "@/lib/api/portfolios";

const Portfolio = ({ portfolio }) => {
  const { data: dataU, loading: loadingU } = useGetUser();

  // TODO: styling
  return (
    <>
      <BaseLayout user={dataU} loading={loadingU}>
        <BasePage
          title={`${portfolio.title} - Popescu Daniel`}
          header="Portfolio Detail"
          metaDescription={portfolio.description.substr(0, 160)}
        >
          {JSON.stringify(portfolio)}
        </BasePage>
      </BaseLayout>
    </>
  );
};

// executed at the BUILD time
export async function getStaticPaths() {
  const json = await new PortfolioApi().getAll();
  const portfolios = json.data;

  // create (pre-render pages) on server, get the dynamic paths
  const paths = portfolios.map((portfolio) => {
    return {
      params: { id: portfolio._id },
    };
  }); // paths = [{params: id:'_id1'},{params: id:'_id2'},{params: id:'_id3'},]

  // falback = page not found, return 404 page
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const json = await new PortfolioApi().getById(params.id);
  const portfolio = json.data;
  return { props: { portfolio } };
}

export default Portfolio;
