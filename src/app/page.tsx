'use client'

import { useState, useEffect } from "react";
import { rangos } from "@/app/data/ranks";
import Image from 'next/image'
import logoColor from "@/app/img/logoC.png";


export default function Home() {

  const [idVendedor, setIdVendedor] = useState<string>("")
  const [paneles, setPaneles] = useState<number>(10)
  const [bateria, setBateria] = useState<string>("")
  const [cantBateria, setCantBateria] = useState<number>(0)
  const [catnBatBloq, setCatnBatBloq] = useState<boolean>(false)
  const [listOpciones, setListOpciones] = useState<any[]>(["1"])
  const [adder1, setAdder1] = useState<boolean>(false)
  const [adder2, setAdder2] = useState<boolean>(false)
  const [valorCampo, setValorCampo] = useState<string>("")

  useEffect(() => {


    // Effect número de baterias
    if (bateria == "Tesla") {


      if (paneles <= 24) {
        // Obligatorio 1
        setCantBateria(1)
        setCatnBatBloq(true)
        setListOpciones(["1"])
      }

      if (paneles >= 25 && paneles <= 34) {
        // Opcional 2
        setCantBateria(2)
        setCatnBatBloq(false)
        setListOpciones(["1", "2"])
      }


      if (paneles >= 35 && paneles <= 49) {
        // Obligatorio 2
        setCantBateria(2)
        setCatnBatBloq(true)
        setListOpciones(["2"])
      }

      if (paneles >= 50 && paneles <= 61) {
        // Opcional 3
        setCantBateria(3)
        setCatnBatBloq(false)
        setListOpciones(["2", "3"])
      }

      if (paneles >= 62 && paneles <= 73) {
        // Obligatorio 3
        setCantBateria(3)
        setCatnBatBloq(true)
        setListOpciones(["3"])
      }

      if (paneles >= 74) {
        // Opcional 4
        setCantBateria(4)
        setCatnBatBloq(false)
        setListOpciones(["3", "4"])
      }
    }



    if (bateria == "Solar_Edge") {
      
      if (paneles <= 25) {
        // Obligatorio 1
        setCantBateria(1)
        setCatnBatBloq(true)
        setListOpciones(["1"])
      }

      if (paneles >= 26 && paneles <= 37) {
        // Opcional 2
        setCantBateria(2)
        setCatnBatBloq(false)
        setListOpciones(["1", "2"])
      }

      if (paneles >= 38) {
        // Obligatorio 2
        setCantBateria(2)
        setCatnBatBloq(true)
        setListOpciones(["2"])
      }

    }



  }, [paneles, bateria]);



  const handleCheck1 = (e:any) => {
    setAdder1(e.target.checked)
  };
  const handleCheck2 = (e:any) => {
    setAdder2(e.target.checked)
  };


  const handleClick = ()=>{
    
  }

  return (
    
    <div className="container">
      <div className="logo">
        <Image
          src={logoColor}
          width={200}
          height={100}
          alt="Logo Up Home Solution."
        />
      </div>

      <div className="bloqueForm">
        <form onSubmit={(e) => e.preventDefault()}>
          <label>
            <span>Rango de Vendedor</span>

            <select name="tipoVendedor" onChange={(e:any) => {setIdVendedor(e.target.value)}}>
              <option value=""></option>
              {rangos.map((item) => (
                <option key={item.id} value={item.id}>{item.nombre}</option>
              ))}
            </select>
          </label>

          <label>
            <span>Cantidad de Paneles</span>

              <input
                type="number"
                name="paneles"
                min="10"
                max="75"
                onChange={(e:any) => {setPaneles(e.target.value)}}
                value={paneles}
              />
          </label>

          <label>
            <span>Tipo de Batería</span>

              <select name="tipoBateria" onChange={(e:any) => {setBateria(e.target.value)}}>
                <option value=""></option>
                <option value="Solar_Edge">S. Edge</option>
                <option value="Tesla">Tesla</option>
              </select>

          </label>
              
          <label>
            <span>Número de Baterías</span>
            <select
              name="numeroBaterias"
              onChange={(e:any) => {setCantBateria(e.target.value)}}
              disabled={catnBatBloq}
              value={cantBateria}
            >
              
              {listOpciones.map(item=>(
                <option value={item} key={item}>{item}</option>
              ))}

            </select>
          </label>

          <div className="selectores">
            <label>
              <span>Adder 1</span>
              <input
                type="checkbox"
                name="adder1"
                onChange={handleCheck1}
                checked={adder1}
              />
            </label> 
            <label>
              <span>Adder 2</span>
              <input
                type="checkbox"
                name="adder2"
                onChange={handleCheck2}
                checked={adder2}
              />
            </label>
          </div>

        </form>

        <div className="visualizador">
              <div className="epcBase"></div>
              <div className="totalBase"></div>

              <label>
                <span>EPC Vemdodo</span>
                <input type="number"  onChange={(e:any) => {setValorCampo(e.target.value)}} value={valorCampo}/>
              </label>

              <button type="button" onClick={handleClick}>Hola mundo</button>

              <div className="comision">
                
              </div>
              <div className="epctotal"></div>

              <button type="button" onClick={handleClick}>Modificar valores</button>
              <button type="button" onClick={handleClick}>Nueva cotización</button>

        </div>

      </div>
      </div>

  );
}
