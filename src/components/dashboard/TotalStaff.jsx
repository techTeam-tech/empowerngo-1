import { FaUsers } from 'react-icons/fa';

const TotalStaff = () => {
  return (
    <div className="bg-gradient-to-r from-green-600 to-green-800 p-8 rounded-lg shadow-lg text-white h-full flex flex-col justify-between bg-opacity-80 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')]">
      <div className="flex items-center space-x-4">
        <FaUsers className="text-4xl" />
        <h2 className="text-3xl font-semibold">Total Staff</h2>
      </div>
      <div>
        <p className="text-2xl mt-4">Total Staff Members: 120</p>
      </div>
    </div>
  );
};

export default TotalStaff;
