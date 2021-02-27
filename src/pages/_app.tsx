import './../styles/global.css';
import { ChallengesContext, ChallengesProvider } from '../contexts/ChallengesContext';
import { CountdownProvider } from '../contexts/CountdownContext';


export default function MyApp ({ Component, pageProps}) {
    return (
        <ChallengesProvider>
            <CountdownProvider>
                <Component {...pageProps} />
            </CountdownProvider>
        </ChallengesProvider>
    )
};