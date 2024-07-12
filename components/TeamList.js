import React, { useState, useEffect } from 'react';
import Player from './Player';
import teamNames from '@/utils/teamNames';
import axios from 'axios';

const TeamList = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
          {teamNames.map((team, index) => (
            <div key={index} className="flex justify-center items-center bg-gray-100 rounded-lg shadow-md">
              <button 
                className={`${index % 2 === 0 ? 'bg-gray-500 hover:bg-gray-700' : 'bg-orange-300 hover:bg-orange-400'} text-white w-full h-48 rounded-lg transition-colors duration-300 flex justify-center items-center`}
                onClick={() => alert(`You clicked on ${team}`)}
              >
                {team}
              </button>
            </div>
          ))}
        </div>
      );
};

export default TeamList;
