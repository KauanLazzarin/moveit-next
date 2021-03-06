import CompletedChallenges from "../components/CompletedChallenges";
import Countdown from "../components/Countdown";
import ExperienceBar from "../components/ExperienceBar";
import Profile from "../components/Profile";
import styles from './../styles/components/Home.module.css';
import Head from 'next/head';
import ChallengeBox from "../components/ChallengeBox";

export default function Index (){
    return (
        <div className={styles.container}>
            <Head>
                <title>Home | move.it</title>
            </Head>

            <ExperienceBar />

            <section>
                <div>
                    <Profile />
                    <CompletedChallenges />
                    <Countdown />
                </div>

                <div>
                    <ChallengeBox />
                </div>
            </section>
        </div>
    )
};