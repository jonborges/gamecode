import React, { useState } from 'react';
import Container from "../../Components/Container";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import styles from "./Forca.module.css";

const palavras = ['neon', 'javascript', 'react', 'programacao', 'desenvolvimento'];

function Forca() {
    const [palavra, setPalavra] = useState(palavras[Math.floor(Math.random() * palavras.length)]);
    const [letrasErradas, setLetrasErradas] = useState([]);
    const [letrasCorretas, setLetrasCorretas] = useState([]);
    const [tentativas, setTentativas] = useState(6);
    const [jogoPerdido, setJogoPerdido] = useState(false);
    const [jogoGanho, setJogoGanho] = useState(false);

    const handleInputChange = (e) => {
        if (jogoPerdido || jogoGanho) return; // Não processa entradas se o jogo estiver perdido ou ganho

        const letra = e.target.value.toLowerCase();
        if (/^[a-z]$/.test(letra)) { // Permite apenas letras
            if (letra && !letrasErradas.includes(letra) && !letrasCorretas.includes(letra)) {
                if (palavra.includes(letra)) {
                    setLetrasCorretas([...letrasCorretas, letra]);
                } else {
                    setLetrasErradas([...letrasErradas, letra]);
                    setTentativas(prevTentativas => {
                        const novasTentativas = prevTentativas - 1;
                        if (novasTentativas <= 0) {
                            setJogoPerdido(true);
                        }
                        return Math.max(novasTentativas, 0); // Impede tentativas negativas
                    });
                }
            }
        }
        e.target.value = '';
    };

    const renderForca = () => {
        return (
            <>
                {tentativas <= 5 && <div className={`${styles.head} ${styles.visible}`}></div>}
                {tentativas <= 4 && <div className={`${styles.body} ${styles.visible}`}></div>}
                {tentativas <= 3 && <div className={`${styles.leftArm} ${styles.visible}`}></div>}
                {tentativas <= 2 && <div className={`${styles.rightArm} ${styles.visible}`}></div>}
                {tentativas <= 1 && <div className={`${styles.leftLeg} ${styles.visible}`}></div>}
                {tentativas <= 0 && <div className={`${styles.rightLeg} ${styles.visible}`}></div>}
            </>
        );
    };

    const palavraExibida = palavra.split('').map(letra => letrasCorretas.includes(letra) ? letra : '_').join(' ');

    const handleRecomeçar = () => {
        setPalavra(palavras[Math.floor(Math.random() * palavras.length)]);
        setLetrasErradas([]);
        setLetrasCorretas([]);
        setTentativas(6);
        setJogoPerdido(false);
        setJogoGanho(false);
    };

    // Verifica se o jogo foi ganho
    React.useEffect(() => {
        if (palavraExibida.replace(/\s/g, '') === palavra) {
            setJogoGanho(true);
        }
    }, [letrasCorretas, palavra, palavraExibida]);

    return (
        <>
            <Header />
            <Container>
                <div className={styles.jogo}>
                    <div className={styles.forca}>
                        {renderForca()}
                    </div>
                    <div className={styles.palavra}>
                        {palavraExibida}
                    </div>
                    <input 
                        type="text" 
                        maxLength="1" 
                        onChange={handleInputChange} 
                        className={styles.input} 
                        disabled={jogoPerdido || jogoGanho}
                    />
                    <div className={styles.info}>
                        Tentativas restantes: {tentativas}
                        <br />
                        Letras erradas: {letrasErradas.join(', ')}
                    </div>
                    {jogoPerdido && 
                        <div className={styles.message}>
                            Você perdeu! A palavra era: {palavra}
                            <button onClick={handleRecomeçar} className={styles.recomeçarButton}>Recomeçar</button>
                        </div>
                    }
                    {jogoGanho && 
                        <div className={styles.message}>Você ganhou!</div>
                    }
                </div>
            </Container>
            <Footer />
        </>
    );
}

export default Forca;
