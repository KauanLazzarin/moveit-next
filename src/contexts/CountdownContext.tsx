import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownContextData {
    minutes: Number;
    seconds: Number;
    hasFinished: Boolean;
    isActive: Boolean;
    startCountdown: () => void;
    resetCountdown: () => void;
};

interface CountdownProviderProps {
    children: ReactNode;
};

let countdownTimeout: NodeJS.Timeout;

export const CountdownContext = createContext({} as CountdownContextData);

export function CountdownProvider ( { children }: CountdownProviderProps ) {    
    
    const [time, setTime] = useState(0.05 * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false); 

    const challengeContext = useContext(ChallengesContext)

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    function startCountdown () {
        setIsActive(true);
    };

    function resetCountdown () {
        setIsActive(false);
        clearTimeout(countdownTimeout);
        setTime(0.05 * 60);
        setHasFinished(false);
    }

    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000);
        } else if ( isActive && time == 0 ) {
            setHasFinished(true);
            setIsActive(false);
            challengeContext.startNewChallenge();
        }

    }, [isActive, time]);


    return (
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            hasFinished,
            isActive,
            startCountdown,
            resetCountdown
        }}>
            {children}
        </CountdownContext.Provider>
    )
};