import styles from './../styles/components/ChallengeBox.module.css';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { useContext } from 'react';

export default function ChallengeBox () {
    const challengeContext = useContext(ChallengesContext);
    const currentChallenge = challengeContext.currentChallenge;

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
                                onClick={challengeContext.resetChallenge}
                            >
                                Falhei
                            </button>

                            <button 
                                type="button" 
                                className={styles.challengeDone}
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