import styles from "./Home.module.css"

import Header from "../../Components/Header";
import Banner from "../../Components/Banner";
import Footer from "../../Components/Footer";

function Home() {
    return (
        <div className={styles.home}>
            <Header />
            <div className={styles.welcome}>
                <h1>GameCode Coletânea</h1>
                <p>Escolha um jogo e divirta-se.</p>
            </div>
            <Banner />
            <Footer />
        </div>
    )
}

export default Home;