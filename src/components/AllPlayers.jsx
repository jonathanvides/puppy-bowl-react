import { useState, useEffect } from "react"
import PlayerCard from "./PlayerCard"
import { fetchAllPlayers } from "../API"

function AllPlayers() {
    const [players, setPlayers] = useState([])
    const [filteredPlayers, setFilteredPlayers] = useState([])
    const [formInfo, setFormInfo] = useState({
        name: "",
        breed: "",
        imageUrl: "",
    })

    useEffect(() => {
        const getPlayers = async () => {
            const players = await fetchAllPlayers()
            setPlayers(players)
            setFilteredPlayers(players);
        }
        getPlayers()
    },[])

    const onInputChange = (event) => {
        const searchTerm = event.target.value.toLowerCase()
        const filteredPlayers = players.filter(player => player.name.toLowerCase().includes(searchTerm))

        setFilteredPlayers(filteredPlayers)
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormInfo({
            ...formInfo,
            [name]: value,
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await fetch("https://fsa-puppy-bowl.herokuapp.com/api/2401-FTB-MT-WEB-PT/players", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formInfo),
            })
            const result = await response.json()
            if (result) {
                setPlayers([...players, result.data.player])
                setFormInfo({
                    name: "",
                    breed: "",
                    imageUrl: "",
                })
            }
        } catch (error) {
            console.error("Failed to add player!", error)
        }
    }
    
    return ( 
        <>
            <div className="puppyForm">
                <h2>Search</h2>
                <input className="searchTerm" onChange={onInputChange} />
                <h2>Add New Player</h2>
                <form id="addPuppyForm" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formInfo.name}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="breed"
                        placeholder="Breed"
                        value={formInfo.breed}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="imageUrl"
                        placeholder="Image URL"
                        value={formInfo.imageUrl}
                        onChange={handleChange}
                    />
                    <button className="addPlayer" type="submit">Add Player</button>
                </form>
            </div>
            <div className="puppySearch">
                {filteredPlayers.map(player => <PlayerCard key={player.id} player={player} />)}
            </div>
        </>
    )
}

export default AllPlayers