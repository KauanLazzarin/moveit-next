import styles from './../styles/components/ChallengeBox.module.css';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { useContext } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';

export default function ChallengeBox () {
    const { currentChallenge, resetChallenge, completeChallenge } = useContext(ChallengesContext);
    const {resetCountdown} = useContext(CountdownContext);

    function handleChallengeDone () {
        completeChallenge();
        resetCountdown();
    };

    function handleChallengeFailed () {
        resetChallenge();
        resetCountdown();
    };

    return (
        <div className={styles.challengeBoxContainer}>
            {
                currentChallenge ? (
                    <div className={styles.challengeActive}>
                        <header>Ganhe {currentChallenge.amount} xp</header>

                        <main>
                            <img src={`icons/${currentChallenge.type}.svg`} alt="body"/>
                            <strong>Novo desafio</strong>
                            <p>{currentChallenge.description}</p>
                        </main>

                        <footer>
                            <button
                                type="button" 
                                className={styles.challengeFailed} 
                                onClick={handleChallengeFailed}
                            >
                                Falhei
                            </button>

                            <button 
                                type="button" 
                                className={styles.challengeDone}
                                onClick={handleChallengeDone}
                            >
                                Completei
                            </button>
                            
                        </footer>
                    </div>
                ) : (
                    <div className={styles.challengeNotActive}>
                        <strong>
                            Finalize um ciclo para receber um desafio
                        </strong>
        
                        <p>
                            <img src="icons/level-up.svg" alt="level up"/>
                            Avance de level completando desafios
                        </p>
                    </div>
                )
            }
        </div>
    )
}