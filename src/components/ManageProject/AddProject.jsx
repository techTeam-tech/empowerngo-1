import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaTrash, FaSpinner } from "react-icons/fa";
import { manageProject, managePurpose, getProjects, getPurposes } from "../../api/masterApi";

const ProjectAndPurpose = () => {
  const [ngoID, setNgoID] = useState(null);
  const [createdBy, setUserID] = useState(null);
  const [projects, setProjects] = useState([]);
  const [purposes, setPurposes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [editingPurpose, setEditingPurpose] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData?.NGO_ID && userData?.USER_ID) {
      setNgoID(userData.NGO_ID);
      setUserID(userData.USER_ID);
      loadProjects(userData.NGO_ID);
    }
  }, []);

  const { register: registerProject, handleSubmit: handleSubmitProject, reset: resetProject } = useForm();
  const { register: registerPurpose, handleSubmit: handleSubmitPurpose, reset: resetPurpose } = useForm();

  const loadProjects = async (ngoID) => {
    try {
      setLoading(true);
      const fetchedProjects = await getProjects(ngoID);
      if (Array.isArray(fetchedProjects)) {
        setProjects(fetchedProjects);
      } else {
        setProjects([]); // Ensure projects is always an array
      }
      setLoading(false);
    } catch (error) {
      console.error("Error loading projects:", error);
      toast.error("Failed to load projects.");
      setLoading(false);
    }
  };

  const loadPurposes = async (ngoID, projectID) => {
    try {
      setLoading(true);
      const fetchedPurposes = await getPurposes(ngoID, projectID);
      setPurposes(fetchedPurposes);
      setLoading(false);
    } catch (error) {
      console.error("Error loading purposes:", error);
      toast.error("Failed to load purposes.");
      setLoading(false);
    }
  };

  // const onSubmitProject = async (data) => {
  //   try {
  //     setLoading(true);
  //     let formData = new FormData();
  //     formData.append("ngoID", ngoID);
  //     formData.append("projectName", data.projectName);
  //     formData.append("createdBy", createdBy);

  //     // 🛠️ FIX: Convert projectID to number before sending
  //     if (editingProject) {
  //       formData.append("projectID", Number(editingProject.PROJECT_ID));
  //       await manageProject(formData, "u"); // Update Project
  //     } else {
  //       await manageProject(formData, "s"); // Add New Project
  //     }

  //     toast.success(editingProject ? "Project updated successfully" : "Project added successfully");
  //     setEditingProject(null);
  //     resetProject();
  //     loadProjects(ngoID);
  //   } catch (error) {
  //     toast.error(error.message || "Failed to save project.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const onSubmitProject = async (data) => {
    try {
      setLoading(true);
      let formData = new FormData();
      formData.append("ngoID", ngoID);
      formData.append("projectName", data.projectName);
      formData.append("createdBy", createdBy);
  
      let response;
      if (editingProject) {
        formData.append("projectID", Number(editingProject.PROJECT_ID));
        response = await manageProject(formData, "u"); // Update Project
        setProjects((prev) =>
          prev.map((proj) =>
            proj.PROJECT_ID === editingProject.PROJECT_ID ? { ...proj, projectName: data.projectName } : proj
          )
        );
      } else {
        response = await manageProject(formData, "s"); // Add New Project
        setProjects((prev) => [
          ...prev,
          { PROJECT_ID: response.projectID, projectName: data.projectName, ngoName: "Your NGO Name" }, // Adjust NGO name accordingly
        ]);
      }
  
      toast.success(editingProject ? "Project updated successfully" : "Project added successfully");
      setEditingProject(null);
      resetProject();
    } catch (error) {
      toast.error(error.message || "Failed to save project.");
    } finally {
      setLoading(false);
    }
  };
  

  const onSubmitPurpose = async (data) => {
    try {
      setLoading(true);
      let formData = new FormData();
      formData.append("ngoID", ngoID);
      formData.append("projectID", Number(data.projectID)); // 🛠️ FIX: Convert projectID to number
      formData.append("purposeName", data.purposeName);
      formData.append("createdBy", createdBy);

      // 🛠️ FIX: Convert purposeID to number before sending
      if (editingPurpose) {
        formData.append("purposeID", Number(editingPurpose.PURPOSE_ID));
        await managePurpose(formData, "u"); // Update Purpose
      } else {
        await managePurpose(formData, "s"); // Add New Purpose
      }

      toast.success(editingPurpose ? "Purpose updated successfully" : "Purpose added successfully");
      setEditingPurpose(null);
      resetPurpose();
      loadPurposes(ngoID, data.projectID);
    } catch (error) {
      toast.error(error.message || "Failed to save purpose.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-wrap justify-center min-h-screen bg-gray-100 py-10 gap-10">
      {/* Project Section */}
      <div className="max-w-2xl w-full bg-white p-8 rounded-2xl shadow-xl border relative">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Project Management</h2>
        <form onSubmit={handleSubmitProject(onSubmitProject)} className="grid grid-cols-1 gap-6 mb-8">
          <input {...registerProject("projectName")} placeholder="Enter project name" className="border p-3 rounded-lg w-full" />
          <button type="submit" className="p-3 rounded-lg w-full bg-blue-600 text-white">
            {editingProject ? "Update Project" : "Add Project"}
          </button>
        </form>

        {/* <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Project List</h2>
        <ul>
          {projects.map((project) => (
            <li key={project.PROJECT_ID}>
              {project.PROJECT_NAME}{" "}
              <button onClick={() => setEditingProject(project)}>✏️ Edit</button>{" "}
              <button onClick={() => loadPurposes(ngoID, project.PROJECT_ID)}>📋 View Purposes</button>
            </li>
          ))}
        </ul> */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Project List</h2>
         {projects.length > 0 ? (
          <table className="w-full table-auto border-collapse shadow-lg rounded-lg">
            <thead>
              <tr className="bg-yellow-600 text-white">
                <th className="px-6 py-3 text-left border-b">Project Name</th>
                <th className="px-6 py-3 text-left border-b">NGO Name</th>
                <th className="px-6 py-3 text-left border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, index) => (
                <tr key={index} className="border-b hover:bg-gray-100">
                  <td className="px-6 py-3 text-left font-semibold">{project.projectName || project.PROJECT_NAME}</td>
                  <td className="px-6 py-3 text-left">{project.ngoName}</td>
                  <td className="px-6 py-3 text-left flex space-x-4">
                  <button onClick={() => setEditingProject(project)} className="text-blue-600 hover:opacity-75">
                      <FaEdit size={18} />
                    </button>
                    <button onClick={() => setProjects(projects.filter((_, i) => i !== index))} className="text-red-600 hover:opacity-75">
                      <FaTrash size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600 text-center">No projects added yet.</p>
        )}
      </div>

      {/* Purpose Section */}
      <div className="max-w-2xl w-full bg-white p-8 rounded-2xl shadow-xl border relative">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Purpose Management</h2>
        <form onSubmit={handleSubmitPurpose(onSubmitPurpose)} className="grid grid-cols-1 gap-6 mb-8">
          <select {...registerPurpose("projectID")} className="border p-3 rounded-lg w-full">
            <option value="">Select Project</option>
            {projects.map((proj) => (
              <option key={proj.PROJECT_ID} value={proj.PROJECT_ID}>
                {proj.PROJECT_NAME}
              </option>
            ))}
          </select>
          <input {...registerPurpose("purposeName")} placeholder="Enter purpose name" className="border p-3 rounded-lg w-full" />
          <button type="submit" className="p-3 rounded-lg w-full bg-green-600 text-white">
            {editingPurpose ? "Update Purpose" : "Add Purpose"}
          </button>
        </form>

        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Purpose List</h2>
        <ul>
          {purposes.map((purpose) => (
            <li key={purpose.PURPOSE_ID}>{purpose.PURPOSE_NAME}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProjectAndPurpose;








// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { FaEdit, FaTrash, FaSpinner } from "react-icons/fa";

// const ProjectAndPurpose = () => {
//   const {
//     register: registerProject,
//     handleSubmit: handleSubmitProject,
//     setValue: setProjectValue,
//     reset: resetProject,
//   } = useForm();

//   const {
//     register: registerPurpose,
//     handleSubmit: handleSubmitPurpose,
//     setValue: setPurposeValue,
//     reset: resetPurpose,
//   } = useForm();

//   const [projects, setProjects] = useState([]);
//   const [purposes, setPurposes] = useState([]);
//   const [editingProjectIndex, setEditingProjectIndex] = useState(null);
//   const [editingPurposeIndex, setEditingPurposeIndex] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // Add or Update Project
//   const onSubmitProject = (data) => {
//     setLoading(true);
//     setTimeout(() => {
//       if (editingProjectIndex !== null) {
//         const updatedProjects = [...projects];
//         updatedProjects[editingProjectIndex] = data;
//         setProjects(updatedProjects);
//         toast.success("Project updated successfully!");
//         setEditingProjectIndex(null);
//       } else {
//         setProjects([...projects, data]);
//         toast.success("Project added successfully!");
//       }
//       resetProject();
//       setLoading(false);
//     }, 1000);
//   };

//   // Handle Edit Project
//   const handleEditProject = (index) => {
//     const project = projects[index];
//     setProjectValue("projectName", project.projectName);
//     setProjectValue("ngoName", project.ngoName);
//     setEditingProjectIndex(index);
//   };

//   // Add or Update Purpose
//   const onSubmitPurpose = (data) => {
//     setLoading(true);
//     setTimeout(() => {
//       if (editingPurposeIndex !== null) {
//         const updatedPurposes = [...purposes];
//         updatedPurposes[editingPurposeIndex] = data;
//         setPurposes(updatedPurposes);
//         toast.success("Purpose updated successfully!");
//         setEditingPurposeIndex(null);
//       } else {
//         setPurposes([...purposes, data]);
//         toast.success("Purpose added successfully!");
//       }
//       resetPurpose();
//       setLoading(false);
//     }, 1000);
//   };

//   // Handle Edit Purpose
//   const handleEditPurpose = (index) => {
//     const purpose = purposes[index];
//     setPurposeValue("purposeName", purpose.purposeName);
//     setPurposeValue("ngoName", purpose.ngoName);
//     setEditingPurposeIndex(index);
//   };

//   // Handle Delete Purpose
//   const handleDeletePurpose = (index) => {
//     setPurposes(purposes.filter((_, i) => i !== index));
//     toast.error("Purpose deleted!");
//   };

//   return (
//     <div className="flex flex-wrap justify-center min-h-screen bg-gray-100 py-10 gap-10">
//       {/* Project Section */}
//       <div className="max-w-2xl w-full bg-white p-8 rounded-2xl shadow-xl border relative">
//         <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Project Registration</h2>
//         {loading && (
//           <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
//             <FaSpinner className="animate-spin text-4xl text-blue-600" />
//           </div>
//         )}
//         <form onSubmit={handleSubmitProject(onSubmitProject)} className="grid grid-cols-1 gap-6 mb-8">
//           <input {...registerProject("projectName")} placeholder="Enter project name" className="border p-3 rounded-lg w-full" />
//           <input {...registerProject("ngoName")} placeholder="Enter NGO name" className="border p-3 rounded-lg w-full" />
//           <button type="submit" className={`p-3 rounded-lg w-full ${editingProjectIndex !== null ? "bg-yellow-600" : "bg-blue-600"} text-white`}>
//             {editingProjectIndex !== null ? "Update" : "Submit"}
//           </button>
//         </form>

//         <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Project List</h2>
//         {projects.length > 0 ? (
//           <table className="w-full table-auto border-collapse shadow-lg rounded-lg">
//             <thead>
//               <tr className="bg-yellow-600 text-white">
//                 <th className="px-6 py-3 text-left border-b">Project Name</th>
//                 <th className="px-6 py-3 text-left border-b">NGO Name</th>
//                 <th className="px-6 py-3 text-left border-b">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {projects.map((project, index) => (
//                 <tr key={index} className="border-b hover:bg-gray-100">
//                   <td className="px-6 py-3 text-left font-semibold">{project.projectName}</td>
//                   <td className="px-6 py-3 text-left">{project.ngoName}</td>
//                   <td className="px-6 py-3 text-left flex space-x-4">
//                     <button onClick={() => handleEditProject(index)} className="text-blue-600 hover:opacity-75">
//                       <FaEdit size={18} />
//                     </button>
//                     <button onClick={() => setProjects(projects.filter((_, i) => i !== index))} className="text-red-600 hover:opacity-75">
//                       <FaTrash size={18} />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           <p className="text-gray-600 text-center">No projects added yet.</p>
//         )}
//       </div>

//       {/* Purpose Section */}
//       <div className="max-w-2xl w-full bg-white p-8 rounded-2xl shadow-xl border relative">
//         <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Purpose Registration</h2>
//         <form onSubmit={handleSubmitPurpose(onSubmitPurpose)} className="grid grid-cols-1 gap-6 mb-8">
//           <input {...registerPurpose("purposeName")} placeholder="Enter purpose name" className="border p-3 rounded-lg w-full" />
//           <input {...registerPurpose("ngoName")} placeholder="Enter NGO name" className="border p-3 rounded-lg w-full" />
//           <button type="submit" className={`p-3 rounded-lg w-full ${editingPurposeIndex !== null ? "bg-yellow-600" : "bg-green-600"} text-white`}>
//             {editingPurposeIndex !== null ? "Update" : "Submit"}
//           </button>
//         </form>

//         <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Purpose List</h2>
//         {purposes.length > 0 ? (
//           <table className="w-full table-auto border-collapse shadow-lg rounded-lg">
//             <thead>
//               <tr className="bg-green-600 text-white">
//                 <th className="px-6 py-3 text-left border-b">Purpose Name</th>
//                 <th className="px-6 py-3 text-left border-b">NGO Name</th>
//                 <th className="px-6 py-3 text-left border-b">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {purposes.map((purpose, index) => (
//                 <tr key={index} className="border-b hover:bg-gray-100">
//                   <td className="px-6 py-3 text-left font-semibold">{purpose.purposeName}</td>
//                   <td className="px-6 py-3 text-left">{purpose.ngoName}</td>
//                   <td className="px-6 py-3 text-left flex space-x-4">
//                     <button onClick={() => handleEditPurpose(index)} className="text-blue-600 hover:opacity-75">
//                       <FaEdit size={18} />
//                     </button>
//                     <button onClick={() => handleDeletePurpose(index)} className="text-red-600 hover:opacity-75">
//                       <FaTrash size={18} />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           <p className="text-gray-600 text-center">No purposes added yet.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProjectAndPurpose;

