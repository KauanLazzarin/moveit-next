import './../styles/global.css';
import { ChallengesContext, ChallengesProvider } from '../contexts/ChallengesContext';


export default function MyApp ({ Component, pageProps}) {
    return (
        <ChallengesProvider>
            <Component {...pageProps} />
        </ChallengesProvider>
    )
};