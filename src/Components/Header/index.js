import styles from "./Header.module.css";
import { Link } from "react-router-dom";

function Header() {
    return (
        <div className={styles.header}>
            <header>
                <span><Link to={"/"}><img src="/images/home.png" alt="botão home em formato de controle de videogame" /></Link></span>
                <Link to={"/campo"}><li className={styles.item1}>Campo minado</li></Link>
                <Link to={"/forca"}><li className={styles.item3}>Forca</li></Link>
                <Link to={"/jogodavelha"}><li className={styles.item4}>Jogo da velha</li></Link>
                <Link to={"/adivinhemusica"}><li className={styles.item5}>Adivinhe a música com Emojis</li></Link>
                <Link to={"/adivinhefilme"}><li className={styles.item6}>Adivinhe o filme com Emojis</li></Link>
            </header>
        </div>
    );
}

export default Header;
