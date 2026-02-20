import { BrowserRouter, Routes, Route } from "react-router-dom"
import ProtectedRoute from "./routes/ProtectedRoute"

import Login from "./pages/Login"
import Register from "./pages/Register"
import AdminDashboard from "./pages/AdminDashboard"
import Stores from "./pages/Stores"
import OwnerDashboard from "./pages/OwnerDashboard"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Route */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Normal User Route */}
        <Route
          path="/stores"
          element={
            <ProtectedRoute role="USER">
              <Stores />
            </ProtectedRoute>
          }
        />

        {/* Store Owner Route */}
        <Route
          path="/owner"
          element={
            <ProtectedRoute role="OWNER">
              <OwnerDashboard />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App