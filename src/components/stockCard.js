import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
function StockCard(params) {

    const [data, setData] = useState(params.data);
    const navigate = useNavigate();
    function singleStock(id) {
        console.log('stocks/'+id);
        
        navigate('stocks/'+id);
      }
  return (
    <div
      className="max-w-md rounded overflow-hidden shadow-lg bg-white mx-5 my-5 cursor-pointer hover:bg-gray-100"
      onClick={() => {
        singleStock(data._id);
      }}
    >
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{data.companyName}</div>
        <div className="flex justify-between">
          <div>
            <p className="text-gray-600 text-sm">Current Price</p>
            <p className="text-gray-900 font-semibold text-lg">${data.price}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Change</p>
            <p className="text-green-500 font-semibold text-lg">+5.00 (+5%)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StockCard;
