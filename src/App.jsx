import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import TopUp from "./pages/Topup";
import Layout from "./components/Layout";
import ServiceDetailPayment from "./pages/ServiceDetailPayment";
import TransactionHistory from "./pages/TransactionHistory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/topup" element={<TopUp />} />
          <Route path="/servicedetailpayment" element={<ServiceDetailPayment />} />
          <Route path="/transaction" element={<TransactionHistory />} />
        </Route>
        
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 2000,
            },
            error: {
              duration: 2000,
            },
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          }}
        />
    </BrowserRouter>
  )
}

export default App
