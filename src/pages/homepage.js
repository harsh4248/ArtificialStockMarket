import { useEffect, useRef, useState } from "react";
import {io} from 'socket.io-client';

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
  const t = useRef([])
  const [isLoading, setIsLoading] = useState(true);
  const [webSocket, setWebSocket] = useState(io('http://127.0.0.1:5001',{autoConnect: false}));
  const [server, setServer] = useState('');
  const [liveData, setLiveData] = useState(0);

  useEffect(() => {
    async function fetchData() {
      await fetch("/stocks").then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            t.current = data
            setStocksList(t.current);
            setIsLoading(false);
          });
        }
      });
    }
    fetchData();
    webSocket.connect();
    webSocket.on('hi server', (data) => {setServer(data.id)})
    webSocket.on('live list', (dat) => {
      console.log(dat);
      setStocksList(dat)
    })
  }, []);

  function getList(d) {
    console.log("this")
    return <StockCard data={[d]}/>
  }
  
  return isLoading ? (
    <>Loading...</>
  ) : (
    <>
      <div className="mx-10">This is connected to {server} and this is live data {liveData}</div>
      {stocksList.map((data) => {console.log(data);return getList(data)})}
    </>
  );
}
export default Hompage;
