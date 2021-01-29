import BaseLayout from "@/components/layouts/BaseLayout";
import BasePage from "@/components/BasePage";
import { useGetUser } from "@/actions/user";
import { formatDate } from "helpers/functions";
import PortfolioApi from "@/lib/api/portfolios";

const Portfolio = ({ portfolio }) => {
  const { data: dataU, loading: loadingU } = useGetUser();

  // TODO: styling
  return (
    <>
      <BaseLayout navClass="transparent" user={dataU} loading={loadingU}>
        <BasePage
          noWrapper
          indexPage
          title={`${portfolio.title} - Popescu Daniel`}
          // header="Portfolio Detail"
          metaDescription={portfolio.description.substr(0, 160)}
        >
          <div className="portfolio-detail">
            <div class="cover-container d-flex h-100 p-3 mx-auto flex-column">
              <main role="main" class="inner page-cover">
                <h1 class="cover-heading">{portfolio.title}</h1>
                <p class="lead dates">
                  {formatDate(portfolio.startDate)} -{" "}
                  {formatDate(portfolio.endDate) || "Today"}
                </p>
                <p class="lead info mb-0">
                  {portfolio.jobTitle} | {portfolio.company} |{" "}
                  {portfolio.location}
                </p>
                <p class="lead">{portfolio.description}</p>
                <p class="lead">
                  <a
                    href={portfolio.companyWebsite}
                    class="btn btn-lg btn-secondary"
                  >
                    Visit Company
                  </a>
                </p>
              </main>
            </div>
          </div>
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
