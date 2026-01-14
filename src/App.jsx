import { Navbar } from "./components/ui";
import { Routes, Route } from "react-router";
import { HomePage, DetailsPage, CataloguePage, LoginPage, ProfilePage, RegisterPage } from "./pages/index";

function App() {

  return (
    <>
      <header>
        <Navbar />
      </header>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/details/:id" element={<DetailsPage />} />
          <Route path="/catalogue" element={<CataloguePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/register" element={< RegisterPage />} />
        </Routes>
    </>
  )
}

export default App
