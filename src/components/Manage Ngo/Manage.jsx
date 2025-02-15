import React, { useState } from "react";
import ManageNGOForm from "../Manage Ngo/ManageNgo";
import ManageNGOTable from "../Manage Ngo/ManageNGOTable";

const Manage = () => {
  const [ngoList, setNgos] = useState([]);
  const [editData, setEditData] = useState(null);

  const addNGO = (ngo) => {
    if (editData) {
      setNgos(ngoList.map((item) => (item.email === editData.email ? ngo : item)));
      setEditData(null);
    } else {
      setNgos([...ngoList, ngo]);
    }
  };

  return (
    <div className="p-6">
      <ManageNGOForm addNGO={addNGO} editData={editData} />
      <ManageNGOTable ngoList={ngoList} setEditNGO={setEditData} />
    </div>
  );
};

export default Manage;
