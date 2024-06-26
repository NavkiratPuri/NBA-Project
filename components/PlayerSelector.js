import React, {useState, useEffect, useRef} from 'react';

// component definition
const PlayerSelector = ({ players, onSelectPlayer, label }) => {
    // state variables
    const [inputValue, setInputValue] = useState('');
    const [filteredPlayers, setFilteredPlayers] = useState([]);
    const dropdown = useRef(null);
    
    // function to update input value and filter player list
    // also makes dropdown reapper when in focus
    // first if-else block checks if value is defined
    // second if-else block filters based on value
    const filterPlayers = (e) => {
        let value;
    
        if (e) {
            value = e.target.value.toLowerCase();
        } else {
            value = inputValue;
        }
        setInputValue(value);

        if (value) {
            setFilteredPlayers(
                players.filter(player =>{
                    const fullName = player.Player.toLowerCase();
                    const [firstName, lastName] = fullName.split(' ');
                    return fullName.startsWith(value) || firstName.startsWith(value) || lastName.startsWith(value);
                })
            );
        } else {
            setFilteredPlayers([]);
        }
    };
    
    // function to up set input value to the selected player
    // updates field with selected players name
    // clears the player list
    // call onSelectPlayer and pass the new selected player as arg
    const selectPlayer = (player) => {
        setInputValue(player.Player);
        setFilteredPlayers([]);
        onSelectPlayer(player);
    };

    // function to make dropdown go away if cursor is clicked outside component
    // and also to select first player in list if enter key pressed
    // first if block clears players list to hide dropdown 
    // second if block selects first player in players list when enter key pressed
    const dropdownF = (e) => {
        if(dropdown.current && !dropdown.current.contains(e.target)){
            setFilteredPlayers([]);
        }
        if (event.key === 'Enter' && filteredPlayers.length > 0) {
            selectPlayer(filteredPlayers[0]);
        }
    };

    // event listner to catch clicks outside components
    // calls dropdownDissaper to handle clicks outside component
    // removes eventlistner when component not in use
    useEffect(() => {
        document.addEventListener('click', dropdownF);
        return () => {
            document.removeEventListener('click', dropdownF);
        };
    }, []);


    //render logic
    return (
        <div className="player-selector-container mb-4 relative" ref={dropdown}>

            <label htmlFor="player-select" className="block mb-2 font-medium">{label}</label>

            <input 

                id='player-input' 
                type='text' 
                className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                value={inputValue} 
                onChange={filterPlayers} 
                placeholder='Enter Player'
                onFocus={filterPlayers}
                onKeyDown={dropdownF}/>

            {filteredPlayers.length > 0 && (

                <ul className="absolute bg-white border border-gray-300 rounded w-full max-h-40 overflow-auto">

                {filteredPlayers.map(player => (

                    <li 
                        key={player.id} 
                        className='p-2 cursor-pointer hover:bg-blue-100'
                        onClick={() => selectPlayer(player)}
                    >
                        {player.Player} - {player.Tm}
                    </li>

                ))}

                </ul>
            )}

        </div>
        );
    };


export default PlayerSelector;
