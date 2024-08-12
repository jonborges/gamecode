import React, { useEffect, useRef, useCallback } from 'react';
import Container from "../../Components/Container";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import styles from "./CampoMinado.module.css";
import Banner from '../../Components/Banner';


function CampoMinado() {
    
    const canvasRef = useRef(null);
    const gameStartedRef = useRef(false);

    let tiles = [];
    const nTilesX = 10;
    const nTilesY = 10;
    const nBombs = 10;

    class Tile {
        constructor(i, j) {
            this.i = i;
            this.j = j;
            this.isBomb = false;
            this.isOpen = false;
            this.bombsAround = 0;
            this.marked = false;
            this.openedAround = false;
        }
    }

    function generateTiles() {
        tiles = [];
        for (let i = 0; i < nTilesX; i++) {
            for (let j = 0; j < nTilesY; j++) {
                tiles.push(new Tile(i, j));
            }
        }
    }

    function generateBombs() {
        const unmarkedTiles = tiles.filter(t => !t.isBomb);
        for (let i = 0; i < nBombs; i++) {
            let randomIndex = Math.floor(Math.random() * unmarkedTiles.length);
            unmarkedTiles[randomIndex].isBomb = true;
        }
    }

    function generateNBombs() {
        tiles.forEach(t => {
            const nBombs = calculateNBombsAround(t);
            t.bombsAround = nBombs;
        });
    }

    function calculateNBombsAround(tile) {
        let bombCounter = 0;
        for (let i = tile.i - 1; i <= tile.i + 1; i++) {
            for (let j = tile.j - 1; j <= tile.j + 1; j++) {
                if (i >= 0 && i < nTilesX && j >= 0 && j < nTilesY && (i !== tile.i || j !== tile.j)) {
                    if (getTile(i, j)?.isBomb) bombCounter += 1;
                }
            }
        }
        return bombCounter;
    }

    function getTile(i, j) {
        return tiles.find(t => t.i === i && t.j === j);
    }

    function draw() {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, 511, 511);
        tiles.forEach(t => {
            drawTile(t);
        });
    }

    function drawTile(tile) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let x = (tile.i * 51) + 1;
        let y = (tile.j * 51) + 1;
        if (tile.isOpen) {
            ctx.fillStyle = tile.isBomb ? "#ff007f" : "#ffffff"; // Neon vermelho para bombas e branco para tiles abertas sem bomba
        } else {
            ctx.fillStyle = tile.marked ? "#7f00ff" : "#3f007f"; // Neon roxo para tiles marcadas e um roxo escuro para as não abertas
        }
        ctx.fillRect(x, y, 50, 50);
        
        if (tile.isOpen && tile.bombsAround > 0) {
            ctx.font = "30px Arial";
            ctx.textAlign = "center";
            ctx.fillStyle = "black";
            ctx.fillText(tile.bombsAround, x + 25, y + 35);
        }
    }

    function openTile(tile) {
        if (tile.isOpen || tile.marked) return;
        tile.isOpen = true;
        if (!tile.openedAround && tile.bombsAround === 0) openAround(tile);
        checkVictory(); // Check for victory after opening a tile
    }

    function openAround(tile) {
        tile.openedAround = true;
        for (let i = tile.i - 1; i <= tile.i + 1; i++) {
            for (let j = tile.j - 1; j <= tile.j + 1; j++) {
                if (i >= 0 && i < nTilesX && j >= 0 && j < nTilesY) {
                    const currentTile = getTile(i, j);
                    if (currentTile && !currentTile.isBomb) openTile(currentTile);
                }
            }
        }
    }

    const startGame = useCallback(() => {
        generateTiles();
        generateBombs();
        generateNBombs();
        canvasRef.current.style.display = 'block';
        gameStartedRef.current = true; // Atualiza o valor no useRef
        draw();
    }, []);

    function checkVictory() {
        const allNonBombsOpened = tiles.every(tile => {
            return tile.isBomb || tile.isOpen;
        });
        
        if (allNonBombsOpened) {
            canvasRef.current.style.display = 'none';
            gameStartedRef.current = false; // Atualiza o valor no useRef
            alert('Você ganhou!'); // Notify the player of victory
        }
    }

    const handleCanvasClick = useCallback((e) => {
        if (!gameStartedRef.current) return;
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const i = Math.floor((mouseX / 511) * nTilesX);
        const j = Math.floor((mouseY / 511) * nTilesY);

        let tile = getTile(i, j);
        if (tile) {
            if (tile.isBomb) {
                canvas.style.display = 'none';
                gameStartedRef.current = false; // Atualiza o valor no useRef
            } else {
                openTile(tile);
                draw();
            }
        }
    }, [nTilesX, nTilesY]);

    const handleRightClick = useCallback((e) => {
        e.preventDefault();
        if (!gameStartedRef.current) return;
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const i = Math.floor((mouseX / 511) * nTilesX);
        const j = Math.floor((mouseY / 511) * nTilesY);

        let tile = getTile(i, j);
        if (tile) tile.marked = !tile.marked;
        draw();
    }, [nTilesX, nTilesY]);

    useEffect(() => {
        startGame();

        document.addEventListener("click", handleCanvasClick);
        document.addEventListener("contextmenu", handleRightClick);

        return () => {
            document.removeEventListener("click", handleCanvasClick);
            document.removeEventListener("contextmenu", handleRightClick);
        };
    }, [startGame, handleCanvasClick, handleRightClick]);

    return (
        <>
            <Header />
            <Container>
                <div className={styles.campo}>
                    <canvas ref={canvasRef} width="511" height="511"></canvas>
                    <div>
                        <p>Clique direito marca bombas, atualize para recomeçar!</p>
                    </div>
                </div>
            </Container>
            <Banner />
            <Footer />
        </>
    );
}

export default CampoMinado;
