import { BrowserRouter, Route, Routes } from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Categories from "./pages/Categories"


function App() {

  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path="/register" element={<Register />}/>
      <Route path="/login" element={<Login />} />
      <Route path="/categories" element={<Categories />} />
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
