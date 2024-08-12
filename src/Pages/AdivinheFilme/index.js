import { useState} from "react";
import Container from "../../Components/Container";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import styles from "./AdivinheFilme.module.css";

function AdivinheFilme() {
  const movies = [
    {
      emotes: ["🦁", "👑", "🌍"],
      options: ["O Rei Leão", "O Rei do Show", "O Mágico de Oz"],
      correctOption: "O Rei Leão"
    },
    {
      emotes: ["🧙", "💍", "🌋"],
      options: ["O Senhor dos Anéis", "Harry Potter", "O Hobbit"],
      correctOption: "O Senhor dos Anéis"
    },
    {
      emotes: ["🚢", "❤️", "🌊"],
      options: ["Titanic", "Poseidon", "Náufrago"],
      correctOption: "Titanic"
    },
    {
      emotes: ["👽", "💉", "🦸‍♂️"],
      options: ["Vingadores", "O Justiceiro", "Deadpool"],
      correctOption: "Vingadores"
    },
    {
      emotes: ["🦸‍♂️", "🦹‍♂️", "🌆"],
      options: ["Batman", "O Homem-Aranha", "O Justiceiro"],
      correctOption: "Batman"
    },
    {
      emotes: ["🚀", "👨‍🚀", "🌌"],
      options: ["Interestelar", "Gravidade", "Apollo 13"],
      correctOption: "Interestelar"
    },
    {
      emotes: ["👸", "🕯️", "🐸"],
      options: ["A Bela e a Fera", "Cinderela", "A Pequena Sereia"],
      correctOption: "A Bela e a Fera"
    },
    {
      emotes: ["👽", "🎨", "🖌️"],
      options: ["A Corrente do Bem", "A Vida é Bela", "A Fantástica Fábrica de Chocolate"],
      correctOption: "A Fantástica Fábrica de Chocolate"
    },
    {
      emotes: ["🌊", "🦈", "🏝️"],
      options: ["Tubarão", "A Praia", "Procurando Nemo"],
      correctOption: "Tubarão"
    },
    {
      emotes: ["👨‍🎤", "🎸", "🎵"],
      options: ["Bohemian Rhapsody", "Rocketman", "The Doors"],
      correctOption: "Bohemian Rhapsody"
    },
    {
      emotes: ["🌵", "🚀", "👽"],
      options: ["Guardiões da Galáxia", "O Hobbit", "Star Wars"],
      correctOption: "Guardiões da Galáxia"
    },
    {
      emotes: ["🦄", "🌈", "🎠"],
      options: ["O Mágico de Oz", "Alice no País das Maravilhas", "Peter Pan"],
      correctOption: "Alice no País das Maravilhas"
    },
    {
      emotes: ["👻", "🎃", "😱"],
      options: ["O Exorcista", "Halloween", "Poltergeist"],
      correctOption: "Halloween"
    },
    {
      emotes: ["🐾", "🌟", "🦒"],
      options: ["Madagascar", "O Rei Leão", "A Era do Gelo"],
      correctOption: "Madagascar"
    },
    {
      emotes: ["👮", "🚔", "🎥"],
      options: ["Duro de Matar", "Bad Boys", "Rush Hour"],
      correctOption: "Duro de Matar"
    }
  ];

  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const currentMovie = movies[currentMovieIndex];

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    const correct = option === currentMovie.correctOption;
    setIsCorrect(correct);

    setTimeout(() => {
      setSelectedOption(null);
      setIsCorrect(null);
      setCurrentMovieIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 4000); 
  };

  return (
    <>
      <Header />
      <Container>
        <div className={styles.filme}>
          <header className={styles.header}>
            <h1>Adivinhe o Filme com Emojis</h1>
          </header>
          <main className={styles.main}>
            <div className={styles.emojiContainer}>
              {currentMovie.emotes.map((emote, index) => (
                <span key={index} className={styles.emoji}>{emote}</span>
              ))}
            </div>
            <div className={styles.options}>
              {currentMovie.options.map((option, index) => (
                <button
                  key={index}
                  className={`${styles.option} ${selectedOption === option ? (isCorrect ? styles.correct : styles.incorrect) : ''}`}
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </main>
        </div>
      </Container>
      <Footer />
    </>
  );
}

export default AdivinheFilme;
