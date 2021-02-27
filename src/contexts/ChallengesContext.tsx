import { parse } from 'path';
import { createContext, ReactNode, useEffect, useState } from 'react';
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
    completeChallenge: () => void;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider ( { children }:ChallengesProviderProps ) {
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);
    const [currentChallenge, setCurrentChallenge] = useState(null);
    
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(() => {
        Notification.requestPermission();
    }, []);

    function levelUp () {
        setLevel(level + 1);
    };

    function startNewChallenge () {
        const randomIndex = Math.floor( Math.random() * challenges.length );
        const challenge = challenges[randomIndex];

        setCurrentChallenge(challenge);

        new Audio('/notification.mp3').play();

        if (Notification.permission === 'granted') {
            new Notification('Here comes a new challenge! 💥', {
                body: `Valendo ${challenge.amount}xp!`
            })
        }
    };

    function resetChallenge () {
        setCurrentChallenge(null);
    };

    function completeChallenge () {
        if (!currentChallenge) {
            return;
        }

        const { amount } = currentChallenge;

        let finalExperience = currentExperience + amount;

        if (finalExperience >= experienceToNextLevel) {
            levelUp();
            finalExperience -= experienceToNextLevel;
        }

        setCurrentExperience(finalExperience);
        setCurrentChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
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
                resetChallenge,
                completeChallenge,
            }}
        >
            { children }
        </ChallengesContext.Provider>
    );
};