import { useState, useEffect } from "react";
import AddDonor from "./AddDonor";
import DonorTable from "./DonorTable";
import CustomButton from "../CustomButton";

const ManageDonor = () => {
  const [donorList, setDonorList] = useState([]);
  const [editDonor, setEditDonor] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const storedDonors = JSON.parse(localStorage.getItem("donorList")) || [];
    setDonorList(storedDonors);
  }, []);

  const handleAddOrUpdateDonor = (donorData) => {
    let updatedList;
    if (editDonor) {
      updatedList = donorList.map((donor) =>
        donor.email === editDonor.email ? donorData : donor
      );
    } else {
      updatedList = [...donorList, donorData];
    }

    setDonorList(updatedList);
    localStorage.setItem("donorList", JSON.stringify(updatedList));
    setEditDonor(null);
    setShowForm(false);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-left mb-6 text-blue-700 underline">
        Manage Donor
      </h1>
      <CustomButton onClick={toggleForm} className="mb-4">
        {showForm ? "Hide Donor Form" : "Add New Donor"}
      </CustomButton>

      {showForm && (
        <AddDonor
          onAddOrUpdateDonor={handleAddOrUpdateDonor}
          editDonor={editDonor}
          setEditDonor={setEditDonor}
        />
      )}
      <DonorTable donorList={donorList} setEditDonor={setEditDonor} />
    </div>
  );
};

export default ManageDonor;
