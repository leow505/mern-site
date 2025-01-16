import { Box } from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom"
import CreatePage from "./pages/CreatePage"
import HomePage from "./pages/HomePage"
import Navbar from "./components/Navbar"
import LoginPage from "./pages/LoginPage"
import AboutPage from "./pages/AboutPage"

function App() {

  return (
    <Box minH={"100vh"} bg="#a2cfd4" w="full">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Box>
  );
}

export default App
