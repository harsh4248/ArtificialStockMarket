import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { Line, Candlestick } from 'react-chartjs-2';
import Highcharts from "highcharts/highstock";
import HighchartsReact from 'highcharts-react-official';

// import ReactHighcharts from 'react-highcharts';
import moment from 'moment';

function StockDetails(props) {
  const [data, setData] = useState({});
  const [candleStickData, setCandleStickData] = useState([]);
  const [lineAreaData, setLineAreaData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [chartType, setChartType] = useState('area');
  const params = useParams();

  const options = { style: 'currency', currency: 'USD' };
  const numberFormat = new Intl.NumberFormat('en-US', options);

  const getLineAreaData = (historical_data) => {
    const lineAreaDataList = [];

    for (let i in historical_data) {
      lineAreaDataList.push([historical_data[i][0], historical_data[i][4]]);
    }
    return lineAreaDataList;
  }

  useEffect(() => {
    async function fetchData() {
      console.log("stocks/" + params.id);
      await fetch("" + params.id).then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            setData(data);
            setCandleStickData(data['historical_data']);
            setLineAreaData(getLineAreaData(data['historical_data']))
            setIsLoading(false);
          });
        }
      });
    }
    fetchData();
  }, []);

  const configPrice = {
    series: [{ type: chartType, data: chartType === 'candlestick' ? candleStickData : lineAreaData }],
    rangeSelector: {
      allButtonsEnabled: true,
      selected: 5
    },
    title: {
      text: data['companyName']
    },
  };
  const chartTypeButtonHandler = () => { 
    if (chartType === 'candlestick') { setChartType('area') } else { setChartType('candlestick') } 
  }

  

  return isLoading ? <>Loading....</> : <div>
    <HighchartsReact highcharts={Highcharts} options={configPrice} constructorType={'stockChart'} />
    <button onClick={() => {chartTypeButtonHandler()}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">{chartType}</button>
  </div>;
}

export default StockDetails;
