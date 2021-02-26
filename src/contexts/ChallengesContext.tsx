import { parse } from 'path';
import { createContext, ReactNode, useState } from 'react';
import challenges from './../../challenges.json';

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesProviderProps {
    children: ReactNode;
};

interface ChallengesContextData {
    level: Number;
    currentExperience: Number;
    experienceToNextLevel: Number;
    challengesCompleted: Number;
    currentChallenge: Challenge;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider ( { children }:ChallengesProviderProps ) {
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(30);
    const [challengesCompleted, setChallengesCompleted] = useState(0);
    const [currentChallenge, setCurrentChallenge] = useState(null);
    
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    function levelUp () {
        setLevel(level + 1);
    };

    function startNewChallenge () {
        const randomIndex = Math.floor( Math.random() * challenges.length );
        const challenge = challenges[randomIndex];

        setCurrentChallenge(challenge)
    };

    function resetChallenge () {
        setCurrentChallenge(null);
    };

    return (
        <ChallengesContext.Provider 
            value={{
                level, 
                currentExperience, 
                challengesCompleted,
                experienceToNextLevel, 
                currentChallenge,
                levelUp,
                startNewChallenge,
                resetChallenge}}
        >
            { children }
        </ChallengesContext.Provider>
    );
};