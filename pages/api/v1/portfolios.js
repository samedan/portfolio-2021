import PortfolioApi from "@/lib/api/portfolios";

export default async function createPortfolio(req, res) {
  try {
    const data = req.body;
    await new PortfolioApi().createPortfolio(data);
    return res.json({ message: "Portfolio was created" });
  } catch (error) {
    console.log("Error here");
    return res.status(error.status || 400).end(error.message);
  }
}
