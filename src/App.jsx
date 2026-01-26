import { Navbar } from "./components/ui";
import { Routes, Route } from "react-router";
import { HomePage, DetailsPage, CataloguePage, LoginPage, ProfilePage, RegisterPage } from "./pages/index";
import { AuthContextProvider } from "./components/context";

function App() {

  return (
    <AuthContextProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/books/:id" element={<DetailsPage />} />
        <Route path="/books" element={<CataloguePage />} />
        <Route path="/register" element={< RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </AuthContextProvider>
  )
}

export default App
