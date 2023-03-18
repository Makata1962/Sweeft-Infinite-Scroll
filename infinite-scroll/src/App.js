import CardList from "./components/CardList/CardList";
import { Routes, Route } from "react-router-dom";
import UserDetails from "./components/UserDetails/UserDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<CardList />} />
      <Route path="/user/:userId" element={<UserDetails />} />
    </Routes>
  );
}

export default App;
