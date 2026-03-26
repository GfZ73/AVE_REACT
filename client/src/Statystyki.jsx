import React from 'react';
import { stylesKonto } from './styleskonto';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, Cell
} from 'recharts';

const Statystyki = ({
  statystyki,
  kategorieMiesiac,
  wybranyMiesiac,
  setWybranyMiesiac,
  miesiace,
  daneRoczne,
  wybranyRok,
  setWybranyRok
}) => {

  const daneKategorie = Object.entries(kategorieMiesiac).map(([k, v]) => ({
    kategoria: k,
    kwota: v
  }));

  return (
    <div style={stylesKonto.sekcja}>

      {/* GÓRA */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px"
      }}>

        <div style={stylesKonto.tytulSekcji}>Statystyki</div>

        <select
          value={wybranyMiesiac}
          onChange={(e)=>setWybranyMiesiac(Number(e.target.value))}
          style={{
            padding:"4px 8px",
            fontSize:"12px",
            borderRadius:"6px",
            background:"#222",
            color:"#fff",
            border:"1px solid #444"
          }}
        >
          {miesiace.map((m,i)=>(
            <option key={i} value={i}>{m}</option>
          ))}
        </select>

      </div>

      {/* SUMA */}
      <div style={stylesKonto.kartaStatystyki}>
        <div style={stylesKonto.wartoscStatystyki}>
          {(statystyki.sumaWydatkow || 0).toLocaleString('pl-PL',{minimumFractionDigits:2})} zł
        </div>
        <div style={stylesKonto.etykietaStatystyki}>
          Suma wydatków w miesiącu
        </div>
      </div>

      {/* WYKRES KATEGORII */}
      <div style={{ marginTop: "30px" }}>
        <div style={stylesKonto.tytulSekcji}>Kategorie</div>

        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={daneKategorie}>
            
            <XAxis dataKey="kategoria" stroke="#aaa" />
            <YAxis stroke="#aaa" />

            <Tooltip
              contentStyle={{
                backgroundColor: "#222",
                border: "1px solid #444",
                borderRadius: "8px",
                color: "#fff"
              }}
              labelStyle={{ color: "#aaa" }}
              formatter={(value) => [`${value} zł`, "Kwota"]}
            />

            <Bar
              dataKey="kwota"
              fill="#3498db"
              activeBar={{ fill: "#5dade2" }}
            >
              {daneKategorie.map((entry, index) => (
                <Cell key={index} fill="#3498db" style={{ cursor: "pointer" }} />
              ))}
            </Bar>

          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* WYKRES ROCZNY */}
      <div style={{ marginTop: "30px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={stylesKonto.tytulSekcji}>Rok</div>

          <select
            value={wybranyRok}
            onChange={(e) => setWybranyRok(Number(e.target.value))}
            style={{
              background:"#222",
              color:"#fff",
              border:"1px solid #444",
              borderRadius:"6px",
              padding:"4px 8px"
            }}
          >
            {[2023, 2024, 2025, 2026].map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={daneRoczne}>

            <XAxis dataKey="miesiac" stroke="#aaa" />
            <YAxis stroke="#aaa" />

            <Tooltip
              contentStyle={{
                backgroundColor: "#222",
                border: "1px solid #444",
                borderRadius: "8px",
                color: "#fff"
              }}
              formatter={(value) => [`${value} zł`, "Kwota"]}
            />

            <Line
              type="monotone"
              dataKey="kwota"
              stroke="#3498db"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />

          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default Statystyki;