import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../src/components/Layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import SignUp from "./pages/signUp/SignUp";
import SignIn from "./pages/signIn/SignIn";
// import Beneficiaries from "./pages/Beneficiaries";
// import Projects from "./pages/Projects";
// import Finance from "./pages/Finance";
// import Reports from "./pages/Reports";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/signin" element={<SignIn/>} />
          {/* <Route path="beneficiaries" element={<Beneficiaries />} />
          <Route path="projects" element={<Projects />} />
          <Route path="finance" element={<Finance />} />
          <Route path="reports" element={<Reports />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
