import React, { useContext } from 'react';
import styles from './../styles/components/Countdown.module.css';
import { ChallengesContext } from '../contexts/ChallengesContext';

let countdownTimeout: NodeJS.Timeout;

export default function Countdown () {
    const [time, setTime] = React.useState(0.05 * 60);
    const [isActive, setIsActive] = React.useState(false);
    const [hasFinished, setHasFinished] = React.useState(false); 

    const challengeContext = useContext(ChallengesContext)

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const [minutesLeft, minutesRight] = String(minutes).padStart(2,'0').split('');
    const [secondsLeft, secondsRight] = String(seconds).padStart(2,'0').split('');

    function startCountdown () {
        setIsActive(true);
    };

    function stopCountdown () {
        setIsActive(false);
        clearTimeout(countdownTimeout);
        setTime(25 * 60);
    }

    React.useEffect(() => {
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
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minutesLeft}</span>
                    <span>{minutesRight}</span>
                </div>

                <span>:</span>
                
                <div>
                    <span>{secondsLeft}</span>
                    <span>{secondsRight}</span>
                </div>
            </div>

            {
                hasFinished ? (
                    <button className={styles.countdownButton} disabled > 
                        Ciclo terminado 
                    </button>
                ) : (
                    <>
                        {
                            isActive ? (
            
                            <button 
                                type="button" 
                                className={`${styles.countdownButton} ${styles.countdownActiveButton}`} 
                                onClick={stopCountdown}> 
                                Abandonar ciclo 
                            </button>
            
                            ) : (
            
                            <button 
                                type="button" 
                                className={styles.countdownButton} 
                                onClick={startCountdown}> 
                                Iniciar um ciclo 
                            </button>
            
                            )
                        }
                    </>
                )
            }
            

        </div>
    );  
}