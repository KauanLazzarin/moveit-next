import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from './../styles/components/ExperienceBar.module.css';

export default function ExperienceBar () {
    const {currentExperience, experienceToNextLevel} = useContext(ChallengesContext);
    const experienceBarPercentage = Math.round((Number(currentExperience) * 100) / Number(experienceToNextLevel));

    return (
        <header className={styles.experienceBar}>
            <span>0 xp</span>
            <div>
                <div style={{ width:`${experienceBarPercentage}%`}} />

                <span className={styles.currentExperience} style={{left: `${experienceBarPercentage}%`}}>{currentExperience}</span>
            </div>
            <span>{experienceToNextLevel} xp    </span>
        </header>
    );
};