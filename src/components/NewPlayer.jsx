import { useState } from "react";
import PlayerCard from "./PlayerCard";

const cohortCode = "2401-FTB-MT-WEB-PT";
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortCode}`;

function NewPlayer() {
    const [formInfo, setFormInfo] = useState({
        name: "",
        breed: "",
        imageUrl: "",
    })
    const [players, setPlayers] = useState([]);

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
            const response = await fetch(`${APIURL}/players`, {
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
            <div className="puppySearch">
                {players.map((player, index) => <PlayerCard key={index} player={player} />)}
            </div>
        </>
    )
}

export default NewPlayer