import React, { useState } from 'react';
import CryptoJS from 'crypto-js';

const SECRET_KEY = `${import.meta.env.VITE_AES_SECRET_KEY}`;

function TransaccionForm() {
  const [cuentaRemitente, setCuentaRemitente] = useState("");
  const [cuentaDestinatario, setCuentaDestinatario] = useState("");
  const [monto, setMonto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [mensaje, setMensaje] = useState("");

  const encriptar = (texto) => {
    const clave = CryptoJS.enc.Utf8.parse(SECRET_KEY);
    const iv = CryptoJS.lib.WordArray.random(16);

    const encrypted = CryptoJS.AES.encrypt(
      CryptoJS.enc.Utf8.parse(texto),
      clave,
      {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      }
    );

    return {
      texto: encrypted.toString(), // Base64
      iv: CryptoJS.enc.Base64.stringify(iv)
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const remitente = encriptar(cuentaRemitente);
    const destinatario = encriptar(cuentaDestinatario);

    const transaccionBancaria = {
      cuentaRemitente: remitente.texto,
      ivCuentaRemitente: remitente.iv,
      cuentaDestinatario: destinatario.texto,
      ivCuentaDestinatario: destinatario.iv,
      monto,
      descripcion
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/transacciones`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transaccionBancaria),
      });

      if (response.ok) {
        const data = await response.json();
        setMensaje(`Transacción guardada con éxito! ID: ${data.id}`);
      } else {
        setMensaje("Hubo un error al guardar la transacción.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMensaje("Error al comunicarse con el servidor.");
    }
  };

  return (
    <div>
      <h2>Formulario de Transacción Bancaria</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Cuenta Remitente:
            <input
              type="text"
              value={cuentaRemitente}
              onChange={(e) => setCuentaRemitente(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Cuenta Destinatario:
            <input
              type="text"
              value={cuentaDestinatario}
              onChange={(e) => setCuentaDestinatario(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Monto:
            <input
              type="number"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Descripción:
            <input
              type="text"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Enviar Transacción</button>
      </form>
      <p>{mensaje}</p>
    </div>
  );
}

export default TransaccionForm;
