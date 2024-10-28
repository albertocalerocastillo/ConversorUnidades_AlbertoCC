import React, { useState, useEffect } from 'react';
import './App.css';

function ConversorUnidades() {
    const [valor, setValor] = useState('');
    const [valorConvertido, setValorConvertido] = useState('');
    const [tipoConversion, setTipoConversion] = useState("km → millas");
    const [conversionGuardada, setConversionGuardada] = useState(() => {
        const conversionesAlmacenadas = localStorage.getItem('conversionGuardada');
        return conversionesAlmacenadas ? JSON.parse(conversionesAlmacenadas) : [];
    });

    const valoresConversion = {
        "km → millas": 0.621371,
        "millas → km": 1.60934,
        "pies → metros": 0.3048,
        "metros → pies": 3.28084,
        "centímetros → pulgadas": 0.393701,
        "pulgadas → centímetros": 2.54,
    };

    const medidas = {
        "km → millas": { from: "km", to: "millas" },
        "millas → km": { from: "millas", to: "km" },
        "pies → metros": { from: "pies", to: "metros" },
        "metros → pies": { from: "metros", to: "pies" },
        "centímetros → pulgadas": { from: "cm", to: "pulgadas" },
        "pulgadas → centímetros": { from: "pulgadas", to: "cm" },
    };

    const actualizarResultado = (e) => {
        setValor(e.target.value);
        calcularConversion(e.target.value, tipoConversion);
    };

    const actualizarTipoConversion = (e) => {
        setTipoConversion(e.target.value);
        calcularConversion(valor, e.target.value);
    };

    const calcularConversion = (valorInput, tipoConversion) => {
        const factor = valoresConversion[tipoConversion];
        let convertido = 0;

        if (tipoConversion in valoresConversion) {
            convertido = (valorInput * factor).toFixed(2);
        }

        setValorConvertido(convertido);
    };

    const guardarConversion = () => {
        const medidaDesde = medidas[tipoConversion].from;
        const medidaHasta = medidas[tipoConversion].to;
        const nuevaConversion = `${valor} ${medidaDesde} = ${valorConvertido} ${medidaHasta}`;
        const conversionesActualizadas = [...conversionGuardada, nuevaConversion];
        setConversionGuardada(conversionesActualizadas);
    };

    const borrarConversion = (index) => {
        const conversionesActualizadas = conversionGuardada.filter((_, i) => i !== index);
        setConversionGuardada(conversionesActualizadas);
    };

    useEffect(() => {
        localStorage.setItem('conversionGuardada', JSON.stringify(conversionGuardada));
    }, [conversionGuardada]);

    return (
        <div className="contenedor-principal">
            <header>
                <h1>Unit Converter</h1>
            </header>

            <div className="conversor">
                <h2>Conversor</h2>
                <div className="conversor-input">
                    <select value={tipoConversion} onChange={actualizarTipoConversion}>
                        <option>km → millas</option>
                        <option>millas → km</option>
                        <option>pies → metros</option>
                        <option>metros → pies</option>
                        <option>centímetros → pulgadas</option>
                        <option>pulgadas → centímetros</option>
                    </select>
                    <input
                        type="number"
                        value={valor}
                        onChange={actualizarResultado}
                    />
                    <p>
                        {medidas[tipoConversion].from}
                    </p>
                </div>
                <div className="resultados">
                    <button className="boton-guardar" onClick={guardarConversion}>❤️</button>
                    <span className="resultado-convertido">
                        {valorConvertido} {medidas[tipoConversion].to}
                    </span>
                </div>
            </div>

            <div className="guardado">
                <h3>Guardado</h3>
                <ul>
                    {conversionGuardada.map((conversion, index) => (
                        <li key={index}>
                            {conversion}
                            <button onClick={() => borrarConversion(index)}>x</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ConversorUnidades;
