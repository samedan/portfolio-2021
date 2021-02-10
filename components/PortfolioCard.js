import {
  Col,
  Card,
  CardHeader,
  CardBody,
  CardText,
  CardTitle,
} from "reactstrap";

const PortfolioCard = ({ portfolio, children }) => {
  return (
    <Card className="portfolio-card">
      <CardHeader className="portfolio-card-header">
        {portfolio.jobTitle}
      </CardHeader>
      {/* {portfolio.images[0] !== undefined ? portfolio.images : ""} */}

      <CardBody
        style={{
          // width: "200px",
          // height: "200px",
          display: "block",
          position: "relative",
        }}
        // "url(https://articole-smart.eu/web-design-brainiacs.ro/duval/xml/8242-01-10177505-a.jpg) !important",
      >
        {/* <div
          style={{
            backgroundImage: `url(${
              portfolio.images[0] !== undefined ? portfolio.images[0].url : ""
            }) `,
            opacity: "0.5",
            top: "0",
            left: "0",
            bottom: "0",
            right: "0",
            position: "absolute",
            zIndex: "-1",
          }}
        > */}
        <p className="portfolio-card-city">{portfolio.location}</p>
        <CardTitle className="portfolio-card-title">
          {portfolio.title}
        </CardTitle>
        <CardText className="portfolio-card-text">
          {portfolio.description}
        </CardText>
        {children}
        {/* </div> */}
        {portfolio.images[0] !== undefined ? (
          <img src={portfolio.images[0].url} className="image-cardbody" />
        ) : null}
      </CardBody>
    </Card>
  );
};

export default PortfolioCard;
