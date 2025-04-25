import { Routes, Route } from "react-router-dom"
import Home from "../src/pages/Home"
import Adopta from "../src/pages/Adopta"
import Dona from "../src/pages/Dona"
import Voluntario from "../src/pages/Voluntario"
import NotFound from "../src/pages/NotFound"

function App() {
  return (
    <Routes>
      <Route path="/patitas-unidas" element={<Home />} />
      <Route path="/adopta" element={<Adopta />} />
      <Route path="/dona" element={<Dona />} />
      <Route path="/voluntario" element={<Voluntario />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
