import { Navigate, Route, Routes } from "react-router"
import Dashboard from "./pages/Dashboard"
import Layout from "./layout/layout"
import ContactForm from "./pages/ContactForm"


function App() {

  return (
    <Routes>
      <Route element={<Layout />} >
        <Route index element={<Navigate to={"/dashboard"} />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="create-form" element={<ContactForm />} />
      </Route>
    </Routes>
  )
}

export default App
