'use client'

import { useState, useEffect, useRef } from "react";
import { rangos } from "@/app/data/ranks";
import Image from 'next/image'
import logoColor from "@/app/img/logoC.png";
import "./estilosajustes.css";

export default function Home() {

  const [idVendedor, setIdVendedor] = useState<number>(0)
  const [paneles, setPaneles] = useState<number>(10)
  const [bateria, setBateria] = useState<string>("Tesla")
  const [cantBateria, setCantBateria] = useState<number>(1)
  const [catnBatBloq, setCatnBatBloq] = useState<boolean>(false)
  const [listOpciones, setListOpciones] = useState<string[]>(["1"])
  const [adder1, setAdder1] = useState<boolean>(false)
  const [adder2, setAdder2] = useState<boolean>(false)
  const [adder3, setAdder3] = useState<boolean>(false)
  const [adder4, setAdder4] = useState<boolean>(false)
  const [epcTotalBase, setEpcTotalBase] = useState<number>(0)
  const [precioPorWatt, setPrecioPorWatt] = useState<number>(2.3)
  const [panelWatts, setPanelWatts] = useState<number>(410)

  const [comisionBateria, setComisionBateria] = useState<string>("Full commission")
  const [ventaBateria, setVentaBateria] = useState<number>(12000)
  const [venta2daBateria, setVenta2daBateria] = useState<number>(9000)
  const ajusteComision = 0;

  const [valiCamp1, setValiCamp1] = useState<boolean>(false)
  const [valiCamp2, setValiCamp2] = useState<boolean>(false)

  const formRef = useRef<HTMLFormElement>(null);

  // Verificacion si la cantidad de paneles es menor a 10
  useEffect(() => {
    setValiCamp2(paneles < 10);
  }, [paneles])

  // Lógica de cantidad de baterias vs cantidad de paneles
  useEffect(() => {
    if (paneles <= 23) {
      setCantBateria(1)
      setCatnBatBloq(true)
      setListOpciones(["1"])
    } else if (paneles >= 25 && paneles <= 30) {
      setCantBateria(2)
      setCatnBatBloq(false)
      setListOpciones(["1", "2"])
    } else if (paneles >= 31 && paneles <= 49) {
      setCantBateria(2)
      setCatnBatBloq(true)
      setListOpciones(["2"])
    } else if (paneles >= 50) {
      setCantBateria(3)
      setCatnBatBloq(false)
      setListOpciones(["2", "3"])
    }
  }, [paneles]);

  // Lógica de valores de venta de batería segun el tipo de comisión
  useEffect(() => {
    const mapping: Record<string, { v1: number, v2: number }> = {
      "Full commission": { v1: 12000, v2: 9000 },
      "Flat fee $1,000": { v1: 11000, v2: 8500 },
      "Flat fee $500": { v1: 10000, v2: 7600 },
      "No comisionable": { v1: 9300, v2: 6750 }
    };
    const values = mapping[comisionBateria] || mapping["Full commission"];
    setVentaBateria(values.v1);
    setVenta2daBateria(values.v2);
  }, [comisionBateria]);

  // Cálculo automático de EPC Base
  useEffect(() => {
    if (idVendedor != 0 && bateria != "" && paneles >= 10) {
      let base = 0;
      if (cantBateria == 1) {
        const bases: Record<number, number> = {
          10: 5.36, 11: 5.09, 12: 4.87, 13: 4.68, 14: 4.52, 15: 4.38, 16: 4.25, 17: 4.14, 18: 4.05, 19: 3.96, 20: 3.88, 21: 3.81, 22: 3.75, 23: 3.69, 24: 3.63, 25: 3.59, 26: 3.54, 27: 3.50, 28: 3.46, 29: 3.42, 30: 3.39
        };
        base = bases[paneles] || 0;
      } else if (cantBateria == 2) {
        const bases: Record<number, number> = {
          24: 4.66, 25: 4.57, 26: 4.49, 27: 4.41, 28: 4.34, 29: 4.27, 30: 4.21, 31: 4.15, 32: 4.10, 33: 4.05, 34: 4.00, 35: 3.95, 36: 3.91, 37: 3.87, 38: 3.83, 39: 3.79, 40: 3.76, 41: 3.72, 42: 3.69, 43: 3.66, 44: 3.63, 45: 3.61, 46: 3.58, 47: 3.56, 48: 3.53, 49: 3.51, 50: 3.49, 51: 3.47, 52: 3.44, 53: 3.42, 54: 3.41, 55: 3.39, 56: 3.37, 57: 3.35, 58: 3.34, 59: 3.32, 60: 3.31, 61: 3.29, 62: 3.28, 66: 3.22, 67: 3.21, 68: 3.20, 69: 3.19, 70: 3.18, 71: 3.17, 72: 3.15, 73: 3.14, 74: 3.13
        };
        base = bases[paneles] || 0;
      } else if (cantBateria >= 3) {
        const bases: Record<number, number> = {
          50: 3.98, 51: 3.95, 52: 3.92, 53: 3.89, 54: 3.86, 55: 3.84, 56: 3.81, 57: 3.79, 58: 3.76, 59: 3.74, 60: 3.72, 61: 3.70, 62: 3.67, 66: 3.60, 67: 3.58, 68: 3.56, 69: 3.55, 70: 3.53, 71: 3.51, 72: 3.50, 73: 3.48, 74: 3.47
        };
        base = bases[paneles] || 0;
      }
      setEpcTotalBase(paneles * panelWatts);
    }
  }, [paneles, bateria, idVendedor, cantBateria, panelWatts]);

  // Valores calculados internos y reactivos
  const ventaPV = paneles * panelWatts * precioPorWatt;

  const battCommable = comisionBateria === "Full commission" ? 1440 :
    comisionBateria === "Flat fee $1,000" ? 1000 :
      comisionBateria === "Flat fee $500" ? 500 : 0;

  const expansionCommable = paneles < 30 ? 0 :
    comisionBateria === "Full commission" ? 1480 :
      comisionBateria === "Flat fee $1,000" ? 1000 :
        comisionBateria === "Flat fee $500" ? 500 : 0;

  const venta2daEfectiva = (paneles >= 30 && cantBateria >= 2) ? venta2daBateria : 0;

  const sumAdders = (adder1 ? 1000 : 0) + (adder2 ? 2500 : 0) + (adder3 ? 2000 : 0) + (adder4 ? 500 : 0);

  const ventaTotal = ventaPV + ventaBateria + venta2daEfectiva + sumAdders;

  const montoComisionable = ventaPV + ajusteComision + (battCommable > 1000 ? ventaBateria : 0) + (expansionCommable > 1000 ? venta2daEfectiva : 0);

  const commissionRatePercent = rangos.find(r => r.id === idVendedor)?.porcentaje || 0;
  const commissionRateDecimal = commissionRatePercent / 100;

  const comisionFinal = (montoComisionable * commissionRateDecimal) +
    (battCommable === 500 ? 500 : 0) +
    (battCommable === 1000 ? 1000 : 0) +
    (expansionCommable === 500 ? 500 : 0) +
    (expansionCommable === 1000 ? 100 : 0);

  const epcCalculado = epcTotalBase > 0 ? ventaTotal / epcTotalBase : 0;

  const handleCheck1 = (e: React.ChangeEvent<HTMLInputElement>) => setAdder1(e.target.checked);
  const handleCheck2 = (e: React.ChangeEvent<HTMLInputElement>) => setAdder2(e.target.checked);
  const handleCheck3 = (e: React.ChangeEvent<HTMLInputElement>) => setAdder3(e.target.checked);
  const handleCheck4 = (e: React.ChangeEvent<HTMLInputElement>) => setAdder4(e.target.checked);



  const nuevaCotiazcion = () => {
    setIdVendedor(0);
    setPaneles(10);
    setBateria("");
    setCantBateria(1);
    setAdder1(false);
    setAdder2(false);
    setAdder3(false);
    setAdder4(false);
  }

  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  if (!isClient) return null;

  return (
    <div className="contenedor">
      <div className="sec">
        <div className="logo">
          <Image src={logoColor} width={200} height={100} alt="Logo Up Home Solution" className="logoColor" />
        </div>
        <div className="card">
          <form onSubmit={(e) => e.preventDefault()} ref={formRef}>

            {/* Section 1 — Datos de Entrada */}
            <p className="sectionSubtitle">Datos de Entrada</p>
            <div className="inputGrid">
              <label>
                <span className="labelTitle">Panel Watts</span>
                <select value={panelWatts} onChange={(e) => setPanelWatts(parseInt(e.target.value))}>
                  <option value="410">410 W</option>
                </select>
              </label>

              <label className={valiCamp2 ? "error" : ""}>
                <span className="labelTitle">Cantidad de Paneles</span>
                <input
                  type="number"
                  min="10"
                  max="75"
                  value={paneles}
                  onChange={(e) => setPaneles(parseInt(e.target.value) || 0)}
                  onBlur={() => { if (paneles < 10) setPaneles(10) }}
                />
              </label>

              <label>
                <span className="labelTitle">Precio por Watt ($)</span>
                <input
                  type="number"
                  step="0.01"
                  min="2.3"
                  max="6"
                  value={precioPorWatt}
                  onChange={(e) => setPrecioPorWatt(parseFloat(e.target.value))}
                />
              </label>

              <label>
                <span className="labelTitle">Comisión Batería</span>
                <select value={comisionBateria} onChange={(e) => setComisionBateria(e.target.value)}>
                  <option value="No comisionable">No comisionable</option>
                  <option value="Flat fee $500">Flat fee $500</option>
                  <option value="Flat fee $1,000">Flat fee $1,000</option>
                  <option value="Full commission">Full commission</option>
                </select>
              </label>

              <label className={valiCamp1 ? "error" : ""}>
                <span className="labelTitle">% de Comisión</span>
                <select value={idVendedor} onChange={(e) => { setIdVendedor(parseInt(e.target.value)); setValiCamp1(false) }}>
                  <option value="0">Seleccionar...</option>
                  {rangos.map((item) => (
                    <option key={item.id} value={item.id}>{item.porcentaje}%</option>
                  ))}
                </select>
              </label>

              {/* Adders Section */}
              <p className="labelTitle" style={{ gridColumn: '1 / -1', marginTop: '10px', marginBottom: '4px' }}>Adders</p>
              <div className="addersGrid">
                <label className="checkboxLabel">
                  <input type="checkbox" checked={adder4} onChange={handleCheck4} />
                  <div className="customCheck">UP Front Payment</div>
                </label>
                <label className="checkboxLabel">
                  <input type="checkbox" checked={adder1} onChange={handleCheck1} />
                  <div className="customCheck">Lowfico, Cablería, Tubo...</div>
                </label>
                <label className="checkboxLabel" style={{ display: 'none' }}>
                  <input type="checkbox" checked={adder3} onChange={handleCheck3} />
                  <div className="customCheck">Galvalum y Refuerzo</div>
                </label>
                <label className="checkboxLabel" style={{ display: 'none' }}>
                  <input type="checkbox" checked={adder2} onChange={handleCheck2} />
                  <div className="customCheck">Sellado de Techo</div>
                </label>
              </div>

              {/* Hidden Fields (keeping logic) */}
              <label style={{ display: 'none' }}>
                <select value={cantBateria} disabled={catnBatBloq} onChange={(e) => setCantBateria(parseInt(e.target.value))}>
                  {listOpciones.map(item => <option value={item} key={item}>{item}</option>)}
                </select>
              </label>
            </div>

            {/* Section intermedia — Sistema */}
            <p className="sectionSubtitle">Sistema</p>
            <div className="statusGrid">
              <div className="statusItem">
                <span className="statusLabel">Tamaño de Sistema Watts</span>
                <span className="statusValue">{epcTotalBase} W</span>
              </div>
            </div>

            {/* Section 2 — Resultados */}
            <div className="resultsSection">
              <p className="sectionSubtitle">Resultados</p>
              <div className="statusGrid">
                <div className="statusItem">
                  <span className="statusLabel">Venta PV</span>
                  <span className="statusValue">${ventaPV.toLocaleString()}</span>
                </div>
                <div className="statusItem">
                  <span className="statusLabel">Venta Batería</span>
                  <span className="statusValue">${ventaBateria.toLocaleString()}</span>
                </div>
                {venta2daEfectiva > 0 && (
                  <div className="statusItem animateFade">
                    <span className="statusLabel">Venta 2da Batería</span>
                    <span className="statusValue">${venta2daEfectiva.toLocaleString()}</span>
                  </div>
                )}
                <div className="statusItem highlight">
                  <span className="statusLabel">Venta Total</span>
                  <span className="statusValue">${ventaTotal.toLocaleString()}</span>
                </div>
                <div className="statusItem">
                  <span className="statusLabel">Monto Comisionable</span>
                  <span className="statusValue">${montoComisionable.toLocaleString()}</span>
                </div>
                <div className="statusItem highlight">
                  <span className="statusLabel">EPC $ x Watt</span>
                  <span className="statusValue">${epcCalculado.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                {comisionBateria === "Full commission" && (
                  <div className="statusItem accentBox animateFade">
                    <span className="statusLabel">Ganancia Híbrida</span>
                    <span className="statusValue">${(((precioPorWatt - 2.30) * epcTotalBase) / 70).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                )}
                <div className="statusItem commissionBox animateFade">
                  <span className="statusLabel">Comisión</span>
                  <span className="statusValue">${comisionFinal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              </div>

              <footer className="footerInfo">
                <p>Valor estimado de comisión. Puede variar respecto a la comisión real.</p>
                <button className="btnSecondary" type="button" onClick={nuevaCotiazcion}>Nueva cotización</button>
              </footer>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}