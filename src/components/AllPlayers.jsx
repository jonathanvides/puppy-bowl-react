import { useState, useEffect } from "react"
import PlayerCard from "./PlayerCard"
import { fetchAllPlayers } from "../API"

const cohortCode = "2401-FTB-MT-WEB-PT";
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortCode}`;

function AllPlayers() {
    const [players, setPlayers] = useState([])
    const [filteredPlayers, setFilteredPlayers] = useState([])

    useEffect(() => {
        const getPlayers = async () => {
            try {
                const playersInfo = await fetchAllPlayers()
                setPlayers(playersInfo)
                setFilteredPlayers(playersInfo);
            } catch (error) {
                console.error("Failed to fetch players!", error)
            }
        }
        getPlayers()
    }, [])

    const removePlayer = async (id) => {
        const updatedPlayers = players.filter((player) => player.id !== id);
        setPlayers(updatedPlayers);
        setFilteredPlayers(updatedPlayers);

        try {
            await fetch(`${APIURL}/players/${id}`, {
                method: "DELETE",
            });
        } catch (error) {
            console.error("Failed to delete player!", error);
        }
    };

    const onInputChange = (event) => {
        const searchTerm = event.target.value.toLowerCase()
        const filteredPlayers = players.filter(player => player.name.toLowerCase().includes(searchTerm))

        setFilteredPlayers(filteredPlayers)
    }

    // const handleChange = (event) => {
    //     const { name, value } = event.target
    //     setFormInfo({
    //         ...formInfo,
    //         [name]: value,
    //     })
    // }

    // const handleSubmit = async (event) => {
    //     event.preventDefault()
    //     try {
    //         const response = await fetch("https://fsa-puppy-bowl.herokuapp.com/api/2401-FTB-MT-WEB-PT/players", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify(formInfo),
    //         })
    //         const result = await response.json()
    //         if (result) {
    //             setPlayers([...players, result.data.player])
    //             setFormInfo({
    //                 name: "",
    //                 breed: "",
    //                 imageUrl: "",
    //             })
    //         }
    //     } catch (error) {
    //         console.error("Failed to add player!", error)
    //     }
    // }

    return (
        <>
            <div className="puppyForm">
                <div>
                    <h2>Search</h2>
                    <input className="searchTerm" label="Search" onChange={onInputChange} />
                    {filteredPlayers.map(player => <PlayerCard key={player.id} player={player} removePlayer={removePlayer} />)}
                </div>
            </div>
        </>
    )
}

export default AllPlayers