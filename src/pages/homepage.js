import { useEffect, useState } from "react";

import StockCard from "../components/stockCard";

function Hompage(params) {
  const [stocksList, setStocksList] = useState([
    {
      _id: null,
      companyLogo: "",
      companyName: "",
      marketCap: "",
      price: "",
      volume: "",
    },
  ]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    async function fetchData() {
      await fetch("/stocks").then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            setStocksList(data);
            setIsLoading(false);
          });
        }
      });
    }

    fetchData();
  }, []);
  return isLoading ? (
    <>Loading...</>
  ) : (
    <>
      {stocksList.map((data) => {
        console.log(data);
        return (
          <StockCard data={data}/>
        );
      })}
    </>
  );
}
export default Hompage;
