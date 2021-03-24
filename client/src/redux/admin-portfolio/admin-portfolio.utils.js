export const editPortfolio = (portfolioList, portfolio) => {
  console.log(portfolioList, portfolio)
  return portfolioList.map((portfolioItem) => {
    if (portfolioItem._id.toString() === portfolio._id.toString()) {
      portfolioItem = { ...portfolio };
    }
    return portfolioItem;
  });
};

export const removePortfolio = (portfolioList, portfolioId) => {
  return portfolioList.filter(
    (portfolioItem) => portfolioItem._id.toString() !== portfolioId.toString()
  );
};
