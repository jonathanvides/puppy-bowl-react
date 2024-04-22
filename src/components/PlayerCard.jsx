import { useNavigate } from "react-router-dom"

function PlayerCard({ player, remove }) {

    //TODO
    //Click a details button on each puppy thats leads you to another page view with specific details on that puppy
    const navigate = useNavigate()

    const handleClick = async () => {
        try {
            const response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2401-FTB-MT-WEB-PT/players/${player.id}`, {
                method: 'DELETE',
            })
            const result = await response.json()
            if (result) {
                remove(player.id);
            }
        } catch (error) {
            console.error("Failed to delete player!", error);
        }
    }
 
    return (
        <div className="single-player-card">
            <div className="header-info">
                <p className="pup-title">{player.name}</p>
                <p className="pup-number">{`#${player.id}`}</p>
            </div>
            <img className="image" src={player.imageUrl} alt={`photo of ${player.name} the puppy`} />
            <button className="detail-button" data-id={player.id} onClick={() => navigate(`/players/${player.id}`)}>See details</button>
            <button className="delete-button" data-id={player.id} onClick={handleClick}>Remove from roster</button>
            <button className="back-button" data-id={player.id} onClick={() => navigate("../")}>Back</button>
        </div>
    )
}

export default PlayerCard