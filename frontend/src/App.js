import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//pages
import NewUser from "./pages/NewUser";
import Home from "./pages/Home";
import Login from "./pages/Login";

//components
import Header from "./components/Header";

//react-toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/new-user" element={<NewUser />} />
                <Route path="/login" element={<Login />} />
            </Routes>
            <ToastContainer />
        </Router>
    );
}

export default App;
