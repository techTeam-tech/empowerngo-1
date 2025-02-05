import MonthlyDonations from '../../components/dashboard/MonthlyDonations';
import TotalStaff from '../../components/dashboard/TotalStaff';
import DonorList from '../../components/dashboard/DonorList';

const Dashboard = () => {
  return (
    <div className="flex bg-[#f1f1f1]">
      <div className="flex-grow p-10">
        <h1 className="text-4xl font-semibold text-blue-800 mb-8">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-white">
          <div className="col-span-1 md:col-span-2 p-6 rounded-lg shadow-md">
            <div className="flex flex-wrap gap-8 justify-evenly">
              <div className="flex-1 min-w-[250px]">
                <MonthlyDonations />
              </div>
              <div className="flex-1 min-w-[250px]">
                <TotalStaff />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 p-6 rounded-lg shadow-lg bg-white">
          <DonorList />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
