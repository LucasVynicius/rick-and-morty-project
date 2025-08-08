import { Routes, Route, Navigate } from "react-router-dom";
import { Header } from "./Components/Header";
import { CharacterList } from "./Page/Characters/CharacterList";
import { CharacterDetail } from "./Page/Characters/CharacterDetail";
import { EpisodeList } from "./Page/Episodes/EpisodeList";
import { EpisodeDetail } from "./Page/Episodes/EpisodeDetail";
import { LocationList } from "./Page/Locations/LocationList";
import { LocationDetail } from "./Page/Locations/LocationDetail";

function App() {
  return (
    <>
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/characters" />} />
          
          <Route path="/characters" element={<CharacterList />} />
          <Route path="/characters/:id" element={<CharacterDetail />} />
          
          <Route path="/episodes" element={<EpisodeList />} />
          <Route path="/episodes/:id" element={<EpisodeDetail />} />

          <Route path="/locations" element={<LocationList />} />
          <Route path="/locations/:id" element={<LocationDetail />} />
        </Routes>
      </main>
    </>
  );
}

export default App;