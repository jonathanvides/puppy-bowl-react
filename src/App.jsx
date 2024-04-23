import { Routes, Route } from "react-router-dom"
import AllPlayers from "./components/AllPlayers"
import SinglePlayer from "./components/SinglePlayer"
import NewPlayer from "./components/NewPlayer"
import './App.css'


function App() {

  //TODO
  //Create Player Form
  //Form to create a new player and it gets added to the all players list without refreshing page

  return (
    <>
      <h1>Puppy Bowl</h1>
      <NewPlayer />

      <Routes>
        <Route path="/" element={<AllPlayers />} />
        <Route path="/players" element={<AllPlayers />} />
        <Route path="/players/:playerId" element={<SinglePlayer />} />
      </Routes>
    </>
  )
}

export default App 
