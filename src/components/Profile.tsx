import styles from './../styles/components/profile.module.css';

export default function Profile () {
    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/KauanLazzarin.png" alt="profile image"/>

            <div>
                <strong>Kauan Lazzarin</strong>
                <p>
                    <img src="icons/level.svg" alt="profile level icon"/>
                    Level: 1
                </p>
            </div>
        </div>
    );
};