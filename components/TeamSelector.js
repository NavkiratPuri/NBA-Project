import React, {useState, useEffect, useRef} from 'react';

// component definition
const TeamSelector = ({ teams, onSelectTeam, label }) => {
    // state variables
    const [inputValue, setInputValue] = useState('');
    const [filteredTeams, setFilteredTeams] = useState([]);
    const dropdown = useRef(null);
    
    // function to update input value and filter team list
    // also makes dropdown reapper when in focus
    // first if-else block checks if value is defined
    // second if-else block filters based on value
    const filterTeams = (e) => {
        let value;
    
        if (e) {
            value = e.target.value.toLowerCase();
        } else {
            value = inputValue;
        }
        setInputValue(value);

        if (value) {
            setFilteredTeams(
                teams.filter(team =>{
                    const fullName = team.team.toLowerCase();
                    const [firstName, lastName] = fullName.split(' ');
                    return fullName.startsWith(value) || firstName.startsWith(value) || lastName.startsWith(value);
                })
            );
        } else {
            setFilteredTeams([]);
        }
    };
    
    // function to up set input value to the selected team
    // updates field with selected teams name
    // clears the team list
    // call onSelectTeam and pass the new selected team as arg
    const selectTeam = (team) => {
        setInputValue(team.team);
        setFilteredTeams([]);
        onSelectTeam(team);
    };

    // function to make dropdown go away if cursor is clicked outside component
    // and also to select first team in list if enter key pressed
    // first if block clears teams list to hide dropdown 
    // second if block selects first team in teams list when enter key pressed
    const dropdownF = (e) => {
        if(dropdown.current && !dropdown.current.contains(e.target)){
            setFilteredTeams([]);
        }
        if (event.key === 'Enter' && filteredTeams.length > 0) {
            selectTeam(filteredTeams[0]);
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
        <div className="team-selector-container mb-4 relative" ref={dropdown}>

            <label htmlFor="team-select" className="block mb-2 font-medium">{label}</label>

            <input 

                id='team-input' 
                type='text' 
                className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                value={inputValue} 
                onChange={filterTeams} 
                placeholder='Enter Team'
                onFocus={filterTeams}
                onKeyDown={dropdownF}/>

            {filteredTeams.length > 0 && (

                <ul className="absolute bg-white border border-gray-300 rounded w-full max-h-40 overflow-auto">

                {filteredTeams.map(team => (

                    <li 
                        key={team.id} 
                        className='p-2 cursor-pointer hover:bg-blue-100'
                        onClick={() => selectTeam(team)}
                    >
                        {team.team} 
                    </li>

                ))}

                </ul>
            )}

        </div>
        );
    };


export default TeamSelector;
