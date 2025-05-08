'use client'

import { useState, useEffect, useRef } from "react";
import { rangos } from "@/app/data/ranks";
import Image from 'next/image'
import logoColor from "@/app/img/logoC.png";
import logoBlanco from "@/app/img/logoB.png";

export default function Home() {

  const [ idVendedor, setIdVendedor ] = useState<number>(0)
  const [ paneles, setPaneles ] = useState<number>(10)
  const [ bateria, setBateria ] = useState<string>("")
  const [ cantBateria, setCantBateria ] = useState<number>(1)
  const [ catnBatBloq, setCatnBatBloq ] = useState<boolean>(false)
  const [ listOpciones, setListOpciones ] = useState<string[]>(["1"])
  const [ adder1, setAdder1 ] = useState<boolean>(false)
  const [ adder2, setAdder2 ] = useState<boolean>(false)
  const [ calcState, setCalcState ] = useState<boolean>(false)
  const [ epcBase, setEpcBase ] = useState<number>(0)
  const [ epcTotalBase, setEpcTotalBase ] = useState<number>(0)
  const [ solarAjustado, setSolarAjustado ] = useState<number>(0)
  const [ epcVendido, setEpcVendido ] = useState<number>(0)
  const [ totalComision, setTotalComision ] = useState<number>(0)

  const [ tipoTecho, setTipoTecho ] = useState<string>("")

  const [ valiCamp1, setValiCamp1 ] = useState<boolean>(false)
  const [ valiCamp2, setValiCamp2 ] = useState<boolean>(false)
  const [ valiCamp3, setValiCamp3 ] = useState<boolean>(false)
  const [ valiCamp4, setValiCamp4 ] = useState<boolean>(false)

  const formRef = useRef<HTMLFormElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const [altura, setAltura] = useState(0);



  useEffect(() => {
    setTimeout(() => {
      if (formRef.current) {
        setAltura(formRef.current.offsetHeight);
      }
    }, 50)
  }, []);


  // Verificacion si la cantidad de paneles es menor a 10

  useEffect(()=>{

    if (paneles < 10) {
      setValiCamp2(true)
    } else {
      setValiCamp2(false)
    }

  },[paneles])



  // Lógica de cantidad de baterias vs cantidad de paneles segun el tipo de batería
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

  // Funcionalidad de Checkboxes
  const handleCheck1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdder1(e.target.checked)
  };
  const handleCheck2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdder2(e.target.checked)
  };

  // Funcionalidad de botones
  const generaCotizacion = ()=>{
    
    // Verificación de campos

    setValiCamp1(idVendedor == 0);
    setValiCamp2(paneles < 10 || paneles == null);
    setValiCamp3(bateria == "");
    setValiCamp4(tipoTecho == "");

    console.log(paneles < 10 || paneles == null);
    

    if (!valiCamp1 && !valiCamp2 && !valiCamp3 && !valiCamp4 && idVendedor != 0 && bateria != "" && tipoTecho != "" && (paneles >= 10 || paneles != null) ) {
      
      
      if (divRef.current) {
        setAltura(divRef.current.offsetHeight);
      }

      setCalcState(true)

      // Establecemos el EPC Base segun tipo de batería y cantidad de baterias
      if (bateria == "Tesla") {
        
        if ( cantBateria == 1 ) {

          if ( paneles >= 10 && paneles <= 12 ) {
            setEpcBase(5.2)
          }

          if ( paneles >= 13 && paneles <= 37 ) {
            setEpcBase(4.5)
          }
          
        }

        if ( cantBateria == 2 ) {
          if ( paneles >= 25 && paneles <= 65 ) {
            setEpcBase(4.55)
          }
        }

        if ( cantBateria >= 3 ) {
          setEpcBase(4.5)
        }
      }
      if (bateria == "Solar_Edge") {
        
        if ( cantBateria == 1 ) {

          if ( paneles >= 10 && paneles <= 12 ) {
            setEpcBase(4.8)
          }

          if ( paneles >= 13 && paneles <= 37 ) {
            setEpcBase(4.25)
          }
          
        }

        if ( cantBateria == 2 ) {
          if ( paneles >= 23 && paneles <= 49 ) {
            setEpcBase(4.3)
          }
          if ( paneles >= 50 ) {
            setEpcBase(4.25)
          }
        }

      }
    

      // Calcularmos el Size
      setEpcTotalBase(paneles * 405)
      setEpcVendido(0)
      setSolarAjustado(0)
      setTotalComision(0)

    }
  }


  const calcularComision = () =>{


    setTimeout(() => {
      if (divRef.current) {
        setAltura(divRef.current.offsetHeight);
      }
    }, 50);

    // solar ajustado al epc vendido
    let baseTotal = epcVendido * epcTotalBase

    baseTotal = Math.round(baseTotal)


    if (adder1) {
      baseTotal = baseTotal - 1000
    }

    if (adder2) {
      baseTotal = baseTotal - 2500
    }

    if (tipoTecho != "") {
      if(tipoTecho == "Cemento") {
        baseTotal = baseTotal - 2500
      }
      if (tipoTecho == "Zinc") {
        baseTotal = baseTotal - 2000
      }
    }

    if (epcVendido < epcBase) {
      baseTotal = baseTotal - 5000
      console.log("menor");
      
    }

    const totalBaseDesc = baseTotal
    setSolarAjustado(totalBaseDesc)

    



    //r - % de comision = comision


    const rangoSelec = rangos.find(item => item.id == idVendedor)

    if (rangoSelec && typeof rangoSelec.porcentaje === 'number') {
      const percent = rangoSelec.porcentaje / 100;
      setTotalComision(Math.round(totalBaseDesc * percent));
    } else {
      console.error('No se encontró el rango o porcentaje inválido');
      setTotalComision(0); // o maneja el error como prefieras
    }
    

  }

  const modificaValores = ()=>{
    setCalcState(false)
    if (formRef.current) {
      setAltura(formRef.current.offsetHeight);
    }
  }

  const nuevaCotiazcion = ()=>{
    setCalcState(false)
    setEpcVendido(0)
    setSolarAjustado(0)
    setTotalComision(0)
    setPaneles(10)
    setBateria("")
    setCantBateria(1)
    setAdder1(false)
    setAdder2(false)
    setIdVendedor(0)
    setEpcBase(0)
    if (formRef.current) {
      setAltura(formRef.current.offsetHeight);
    }
  }

  // verificar si es client o no

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? (
    
    <div className={calcState ? "activo contenedor" : "contenedor"}>
      <div className="sec">
        <div className="logo">
          <Image
            src={logoColor}
            width={200}
            height={100}
            alt="Logo Up Home Solution."
            className="logoColor"
          />
          <Image
            src={logoBlanco}
            width={200}
            height={100}
            alt="Logo Up Home Solution blanco."
            className="logoBlanco"
          />
        </div>
        <div className="bloqueForm" style={{ height: `${altura + 60}px` }}>
            <form onSubmit={(e) => e.preventDefault()} ref={formRef}>
              <label className={valiCamp1 ? "error" : ""}>
                <select name="tipoVendedor" value={idVendedor} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {setIdVendedor(parseInt(e.target.value)); setValiCamp1(false)}}>
                  <option value="0"></option>
                  {rangos.map((item) => (
                    <option key={item.id} value={item.id}>{item.nombre}</option>
                  ))}
                </select>
                <span className={idVendedor != 0 ? "activo" : ""}>Rango de Vendedor</span>
              </label>

              <label className={valiCamp2 ? "error" : ""}>
                  <input
                    type="number"
                    name="paneles"
                    min="10"
                    max="75"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setPaneles(parseInt(e.target.value))}}
                    value={paneles}
                  />
                  <span className={paneles != 0 ? "activo" : ""}>Cantidad de Paneles</span>
              </label>

              <label className={valiCamp3 ? "error" : ""}>
                  <select name="tipoBateria" value={bateria} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {setBateria(e.target.value); setValiCamp3(false)}}>
                    <option value=""></option>
                    <option value="Solar_Edge">S. Edge</option>
                    <option value="Tesla">Tesla</option>
                  </select>
                  <span className={bateria != "" ? "activo" : ""}>Tipo de Batería</span>
              </label>
                  
              <label>
                <select
                  name="numeroBaterias"
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {setCantBateria(parseInt(e.target.value))}}
                  disabled={catnBatBloq}
                  value={cantBateria}
                >
                  {listOpciones.map(item=>(
                    <option value={item} key={item}>{item}</option>
                  ))}
                </select>
                <span className={cantBateria != 0 ? "activo" : ""}>Número de Baterías</span>
              </label>
              
              <div className="selectores">
                <p>Seleciona los adders (opcional)</p>
                <label>
                  <input
                    type="checkbox"
                    name="adder1"
                    onChange={handleCheck1}
                    checked={adder1}
                  />
                  <span>Zanja o equipo existente</span>
                </label> 
                <label>
                  <input
                    type="checkbox"
                    name="adder2"
                    onChange={handleCheck2}
                    checked={adder2}
                  />
                  <span>Sellado de Techo</span>
                </label>
              </div>

              <label className={valiCamp4 ? "error" : ""}>
                <select
                  name="tipoTecho"
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {setTipoTecho(e.target.value); setValiCamp4(false)}}
                  value={tipoTecho}
                >
                  <option value=""></option>
                  <option value="Cemento">Cemento</option>
                  <option value="Zinc">Zinc</option>
                </select>
                <span className={tipoTecho != "" ? "activo" : ""}>Tipo de techo</span>
              </label>

              <button className="botonGenerar" type="button" onClick={generaCotizacion}>Generar cotización</button>
            </form>

          <div className="visualizador" ref={divRef}>
                <div className="epcBase">
                  <p>EPC Base</p>
                  <p>${epcBase}</p>
                </div>

                <label>
                  <span>EPC Vendido</span>
                  <input type="number"  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setEpcVendido(parseFloat(e.target.value))}} value={epcVendido}/>
                </label>

                <button className="calculaCom" type="button" onClick={calcularComision}>Calcular comisión</button>

                {solarAjustado > 0 ? (
                  <>
                  <div className="epctotal">
                    <p>Total Solar Ajustado</p>
                    <p>${solarAjustado}</p>
                  </div>

                  <div className="comision">
                    <p>Comisión del %</p>
                    <p>${totalComision}</p>
                  </div>
                  </>
                ): (<p>EPC Vendido demasiado bajo.</p>)}


                

                <p>Valor estimado de comision. (Puede variar respecto a la comision real)</p>

                <button className="accionAtras" type="button" onClick={modificaValores}>Modificar valores</button>
                <button className="accionAtras" type="button" onClick={nuevaCotiazcion}>Nueva cotización</button>

          </div>

        </div>
      </div>
    </div>

  ) : null
}