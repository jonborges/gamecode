import React, { useState, useRef } from "react";
import Container from "../../Components/Container";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import styles from "./AdivinheMusica.module.css";

function AdivinheMusica() {
  const songs = [
    {
      emotes: ["💃", "🏋️‍♂️", "👨"],
      options: ["Envolver", "Downtown", "Paradinha"],
      correctOption: "Envolver",
      audioClip: "/audio/envolver.mp3"
    },
    {
      emotes: ["🍞", "🧈", "🎶"],
      options: ["Café da Manhã", "Feijão Maravilha", "Pão de Queijo"],
      correctOption: "Pão de Queijo",
      audioClip: "/audio/pao-de-queijo.mp3"
    },
    {
      emotes: ["🌧️", "🌪️", "🎤"],
      options: ["Chove Chuva", "Garota de Ipanema", "Temporal"],
      correctOption: "Chove Chuva",
      audioClip: "/audio/chove-chuva.mp3"
    },
    {
      emotes: ["🌍", "🤝", "🎸"],
      options: ["Aquarela do Brasil", "We are the world", "Alagados"],
      correctOption: "We are the world",
      audioClip: "/audio/world.mp3"
    },
    {
      emotes: ["💃", "🏝️", "🌞"],
      options: ["Mas Que Nada", "Festa no Apê", "País Tropical"],
      correctOption: "País Tropical",
      audioClip: "/audio/pais-tropical.mp3"
    },
    {
      emotes: ["👩‍🦰", "🌟", "🗣️"],
      options: ["Menina Veneno", "Dormi na Praça", "Pedro P"],
      correctOption: "Pedro P",
      audioClip: "/audio/pedrop.mp3"
    },
    {
      emotes: ["💔", "🗡️", "🌹"],
      options: ["Coração partido", "Alibi", "Choram as Rosas"],
      correctOption: "Alibi",
      audioClip: "/audio/alibi.mp3"
    },
  ];

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const audioRef = useRef(new Audio(songs[currentSongIndex].audioClip));
  const isAudioPlaying = useRef(false);

  const currentSong = songs[currentSongIndex];

  const handleOptionClick = (option) => {
    if (isAudioPlaying.current) return; // Se o áudio está tocando, não faça nada
    setSelectedOption(option);
    const correct = option === currentSong.correctOption;
    setIsCorrect(correct);
    
    // Recria o áudio para a música atual
    audioRef.current.src = currentSong.audioClip;
    audioRef.current.play();
    isAudioPlaying.current = true;

    audioRef.current.onended = () => {
      isAudioPlaying.current = false;
    };

    setTimeout(() => {
      setSelectedOption(null);
      setIsCorrect(null);
      setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
    }, 6000);
  };

  return (
    <>
      <Header />
      <Container>
        <div className={styles.musica}>
          <header className={styles.header}>
            <h1>Adivinhe a música com Emojis!</h1>
          </header>
          <main className={styles.main}>
            <div className={styles.emojiContainer}>
              {currentSong.emotes.map((emote, index) => (
                <span key={index} className={styles.emoji}>{emote}</span>
              ))}
            </div>
            <div className={styles.options}>
              {currentSong.options.map((option, index) => (
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

export default AdivinheMusica;