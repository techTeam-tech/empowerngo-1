import { FaDollarSign} from 'react-icons/fa';

const MonthlyDonations = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 rounded-lg shadow-lg text-white h-full flex flex-col justify-between bg-opacity-80 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')]">
      <div className="flex items-center space-x-4">
        <FaDollarSign className="text-4xl" />
        <h2 className="text-3xl font-semibold">Monthly Donations</h2>
      </div>
      <div>
        <p className="text-2xl mt-4">Total Donations: ₹50,000</p>
        <p className="text-xl mt-2">Received: ₹30,000</p>
        <p className="text-xl">Pending: ₹20,000</p>
      </div>
    </div>
  );
};

export default MonthlyDonations;
