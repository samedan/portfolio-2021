import { Container } from "reactstrap";
import Head from "next/head";
import { useRouter } from "next/router";

const BasePage = (props) => {
  const router = useRouter();

  const {
    indexPage,
    className = "",
    header,
    title = "Portfolio - Popescu Daniel",
    metaDescription = "My name is Popescu Daniel and I am an experienced software engineer and freelance developer. Throughout my career, I have acquired advanced technical knowledge and the ability to explain programming topics clearly and in detail.",
    canonicalPath,
    children,
  } = props;

  const pageType = indexPage ? "indexPage" : "base-page";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="title" key="title" content={title} />
        <meta name="description" key="description" content={metaDescription} />
        <meta property="og:title" key="og:title" content={title} />
        <meta property="og:locale" key="og:locale" content="en_EU" />
        <meta
          property="og:url"
          key="og:url"
          content={`${process.env.BASE_URL}${router.asPath}`}
        />
        <meta property="og:type" key="og:type" content="website" />
        <meta
          property="og:description"
          key="og:description"
          content={metaDescription}
        />
        <meta
          property="og:image"
          key="og:image"
          content={`${process.env.BASE_URL}/images/section-1.png`}
        />
        <link href="https://fonts.googleapis.com/css?family=Montserrat" />
        <link rel="icon" type="image/x-icon" href="/images/favicon.ico" />
        <link
          rel="canonical"
          href={`${process.env.BASE_URL}${
            canonicalPath ? canonicalPath : router.asPath
          }`}
        />
      </Head>
      <div className={`${pageType} ${className}`}>
        <Container>
          {header && (
            <div className="page-header">
              <h2 className="page-header-title">{header}</h2>
            </div>
          )}
          {children}
        </Container>
      </div>
    </>
  );
};

export default BasePage;
