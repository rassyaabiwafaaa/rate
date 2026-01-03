import { useEffect, useState } from "react";
import "./App.css";

type Rating = {
  label: string;
  value: string;
  numeric?: number;
};

const ratings: Rating[] = [
  // === LOOKS / PENAMPILAN ===
  { label: "Cantik Natural", value: "10000/10", numeric: 999999 },
  { label: "Senyum", value: "10000/10", numeric: 999999 },
  { label: "Mata", value: "10000/10", numeric: 999999 },
  { label: "Gaya Berpakaian", value: "10000/10", numeric: 900000 },

  // === KEPRIBADIAN ===
  { label: "Lemah lembut", value: "10/10", numeric: 95 },
  { label: "Pengertian", value: "10000/10", numeric: 85 },
  { label: "Sabar", value: "10000/10", numeric: 900000 },
  { label: "Nurut", value: "10000/10", numeric: 80 },
  { label: "Cerewet", value: "10000/10", numeric: 45 },
  { label: "Galak", value: "10000/10", numeric: 65 },
  { label: "Nyebelin", value: "10000/10", numeric: 55 },
  { label: "Cemburu", value: "10000/10", numeric: 15 },
  { label: "Lucu", value: "10000/10", numeric: 10000000 },
  { label: "Keras Kepala", value: "10000/10", numeric: 75 },
  { label: "Manja", value: "10000/10", numeric: 38 },
  { label: "Kalo Marah / Ngambek", value: "10000/10", numeric: 85 },

  // === FINAL BOSS ===
  { label: "Kesayangan Aku", value: "Selamanya 💖" }
];


export default function App() {
  const [started, setStarted] = useState(false);
  const [animatedValues, setAnimatedValues] = useState<number[]>(
    ratings.map(() => 0)
  );

  useEffect(() => {
  if (!started) return;

  ratings.forEach((item, index) => {
    if (!item.numeric) return;

    let current = 0;

    // 🔥 STEP DINAMIS (ini kuncinya)
    const step = Math.max(1, Math.floor(item.numeric / 60));
    const intervalTime = 16; // ~60fps

    const interval = setInterval(() => {
      current += step;

      if (current >= item.numeric!) {
        current = item.numeric!;
        clearInterval(interval);
      }

      setAnimatedValues(prev => {
        const copy = [...prev];
        copy[index] = current;
        return copy;
      });
    }, intervalTime);
  });
}, [started]);

  return (
    <div className="container">
      <div className="card">
        {!started ? (
          <>
            <h1>Rate MY Girlfriend 💕</h1>
            <p>Girlfriend Name : Syifa Rizky Amelia</p>
            <button className="start-btn" onClick={() => setStarted(true)}>
              Mulai
            </button>
          </>
        ) : (
          <>
            <h1>Rate MY Girlfriend 💕</h1>
            <p className="subtitle">Jawaban ini dijawab sejujur jujurnya 😌🙏</p>

            <div className="list">
              {ratings.map((item, index) => (
                <div className="row fade" key={index}>
                  <span className="label">{item.label}</span>
                  <span className="value">
                    {item.numeric
                      ? `${animatedValues[index]}%`
                      : item.value}
                  </span>
                </div>
              ))}
            </div>

            <p className="footer">
              *hasil ini hanya bisa diubah dari yang rating saja.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
