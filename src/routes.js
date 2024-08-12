import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import CampoMinado from "./Pages/CampoMinado";
import JogoDaVelha from "./Pages/JogoDaVelha";
import Forca from "./Pages/Forca";
import AdivinheMusica from "./Pages/AdivinheMusica";
import AdivinheFilme from "./Pages/AdivinheFilme";

function AppRoutes() {
    return (
        <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/campo" element={<CampoMinado />}> </Route>
                    <Route path="/forca" element={<Forca />}></Route>
                    <Route path="/jogodavelha" element={<JogoDaVelha />}></Route>
                    <Route path="/adivinhemusica" element={<AdivinheMusica />}></Route>
                    <Route path="/adivinhefilme" element={<AdivinheFilme />}></Route>
                </Routes>
        </BrowserRouter>
    );
}
export default AppRoutes;
