import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Highcharts from "highcharts/highstock";
import HighchartsReact from 'highcharts-react-official';

// import ReactHighcharts from 'react-highcharts';
import moment from 'moment';

function StockDetails(props) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();

  const options = { style: 'currency', currency: 'USD' };
  const numberFormat = new Intl.NumberFormat('en-US', options);

  const configPrice = {
    yAxis: [
      {
        offset: 20,
        labels: {
          formatter: function () {
            return numberFormat.format(this.value);
          },
          x: -15,
          style: {
            color: '#000',
            position: 'absolute'
          },
          align: 'left'
        }
      }
    ],
    tooltip: {
      shared: true,
      formatter: function () {
        return (
          numberFormat.format(this.y, 0) +
          '</b><br/>' +
          moment(this.x).format('MMMM Do YYYY, h:mm')
        );
      }
    },
    plotOptions: {
      series: {
        showInNavigator: true,
        gapSize: 6
      }
    },
    rangeSelector: {
      selected: 1
    },
    title: {
      text: 'Bitcoin stock price'
    },
    chart: {
      height: 600
    },
    credits: {
      enabled: false
    },
    legend: {
      enabled: true
    },
    xAxis: {
      type: 'datetime'
    },
    rangeSelector: {
      buttons: [
        {
          type: 'day',
          count: 1,
          text: '1d'
        },
        {
          type: 'day',
          count: 7,
          text: '7d'
        },
        {
          type: 'month',
          count: 1,
          text: '1m'
        },
        {
          type: 'month',
          count: 3,
          text: '3m'
        },
        {
          type: 'all',
          text: 'All'
        }
      ],
      selected: 4
    },
    series: [
      {
        name: 'Price',
        type: 'spline',
        data: data,
        tooltip: {
          valueDecimals: 2
        }
      }
    ]
  };

  useEffect(() => {
    async function fetchData() {
      console.log("stocks/" + params.id);
      await fetch("" + params.id).then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            setData(data);
            setIsLoading(false);
          });
        }
      });
    }
    fetchData();
  }, []);
  return isLoading ? <>Loading....</> : <div>
  <HighchartsReact highcharts={Highcharts} options={configPrice} />
</div>;
}

export default StockDetails;
