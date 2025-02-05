// /* eslint-disable no-unused-vars */
// import React from 'react'

// const SearchVisitors = () => {
//   return (
//     <div>SearchVisitors</div>
//   )
// }

// export default SearchVisitors
// import { useState } from "react";

// export default function SearchVisitors() {
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [selectedNGO, setSelectedNGO] = useState("");
//   const [ngoList] = useState(["NGO A", "NGO B", "NGO C", "NGO D"]);
//   const [selectedRole, setSelectedRole] = useState("");
//   const adminRoles = ["NGO User", "NGO Staff", "CA"];

//   const handleOptionChange = (option) => {
//     setSelectedOption(option);
//     setSelectedNGO("");
//     setSelectedRole("");
//   };

//   return (
//     <div className="flex flex-col items-center p-4 min-h-screen bg-gray-100">
//       <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md">
//         <h2 className="text-xl font-semibold mb-4">Select an Option</h2>
//         <div className="flex space-x-4">
//           <label className="flex items-center space-x-2">
//             <input
//               type="radio"
//               name="option"
//               value="showNGOs"
//               checked={selectedOption === "showNGOs"}
//               onChange={() => handleOptionChange("showNGOs")}
//               className="w-4 h-4"
//             />
//             <span>Show NGOs</span>
//           </label>
//           <label className="flex items-center space-x-2">
//             <input
//               type="radio"
//               name="option"
//               value="ngoAdmin"
//               checked={selectedOption === "ngoAdmin"}
//               onChange={() => handleOptionChange("ngoAdmin")}
//               className="w-4 h-4"
//             />
//             <span>NGO Admin</span>
//           </label>
//         </div>

//         {selectedOption === "showNGOs" && (
//           <div className="mt-4 bg-gray-100 p-4 rounded-lg shadow-md">
//             <h3 className="text-lg font-medium">Select an NGO</h3>
//             <div className="bg-gray-200 p-3 rounded-md">
//               <ul className="list-disc pl-5">
//                 {ngoList.map((ngo) => (
//                   <li 
//                     key={ngo} 
//                     className={`cursor-pointer p-2 rounded-md ${selectedNGO === ngo ? 'bg-blue-300' : 'hover:bg-gray-300'}`}
//                     onClick={() => setSelectedNGO(ngo)}
//                   >
//                     {ngo}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         )}

//         {selectedOption === "ngoAdmin" && (
//           <div className="mt-4 bg-gray-100 p-4 rounded-lg shadow-md">
//             <h3 className="text-lg font-medium">Select an Admin Role</h3>
//             <div className="bg-gray-200 p-3 rounded-md">
//               <ul className="list-disc pl-5">
//                 {adminRoles.map((role) => (
//                   <li 
//                     key={role} 
//                     className={`cursor-pointer p-2 rounded-md ${selectedRole === role ? 'bg-blue-300' : 'hover:bg-gray-300'}`}
//                     onClick={() => setSelectedRole(role)}
//                   >
//                     {role}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         )}

//         <button
//           className="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg disabled:bg-gray-400"
//           disabled={(selectedOption === "showNGOs" && !selectedNGO) || (selectedOption === "ngoAdmin" && !selectedRole)}
//         >
//           Submit
//         </button>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";

export default function SearchVisitors() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedNGO, setSelectedNGO] = useState("");
  const [ngoList] = useState(["NGO A", "NGO B", "NGO C", "NGO D"]);
  const [selectedRole, setSelectedRole] = useState("");
  const adminRoles = ["NGO User", "NGO Staff", "CA"];

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setSelectedNGO("");
    setSelectedRole("");
  };

  return (
    <div className="p-8 max-w-screen-lg mx-auto bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800">
        Select an Option
      </h1>
      <div className="bg-white p-8 rounded-2xl shadow-md">
        {/* Always visible radio buttons */}
        <div className="flex justify-center space-x-6 mb-6">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="option"
              value="showNGOs"
              checked={selectedOption === "showNGOs"}
              onChange={() => handleOptionChange("showNGOs")}
              className="w-5 h-5"
            />
            <span className="text-lg">Show NGOs</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="option"
              value="ngoAdmin"
              checked={selectedOption === "ngoAdmin"}
              onChange={() => handleOptionChange("ngoAdmin")}
              className="w-5 h-5"
            />
            <span className="text-lg">NGO Admin</span>
          </label>
        </div>

        {/* Popup for Show NGOs */}
        {selectedOption === "showNGOs" && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-2xl font-medium mb-4 text-gray-800">
              Select an NGO
            </h2>
            <div className="bg-gray-200 p-4 rounded-md">
              <ul className="list-disc pl-5">
                {ngoList.map((ngo) => (
                  <li
                    key={ngo}
                    className={`cursor-pointer p-2 rounded-md text-lg ${
                      selectedNGO === ngo ? "bg-white font-bold" : "hover:bg-gray-300"
                    }`}
                    onClick={() => setSelectedNGO(ngo)}
                  >
                    {ngo}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Popup for NGO Admin */}
        {selectedOption === "ngoAdmin" && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-2xl font-medium mb-4 text-gray-800">
              Select an Admin Role
            </h2>
            <div className="bg-gray-200 p-4 rounded-md">
              <ul className="list-disc pl-5">
                {adminRoles.map((role) => (
                  <li
                    key={role}
                    className={`cursor-pointer p-2 rounded-md text-lg ${
                      selectedRole === role ? "bg-white font-bold" : "hover:bg-gray-300"
                    }`}
                    onClick={() => setSelectedRole(role)}
                  >
                    {role}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300"
          disabled={
            (selectedOption === "showNGOs" && !selectedNGO) ||
            (selectedOption === "ngoAdmin" && !selectedRole)
          }
          onClick={() => console.log("Submit clicked")}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
