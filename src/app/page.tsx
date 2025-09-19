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
  const [ adder3, setAdder3 ] = useState<boolean>(false)
  const [ adder4, setAdder4 ] = useState<boolean>(false)
  const [ calcState, setCalcState ] = useState<boolean>(false)
  const [ epcBase, setEpcBase ] = useState<number>(0)
  const [ epcTotalBase, setEpcTotalBase ] = useState<number>(0)
  const [ solarAjustado, setSolarAjustado ] = useState<number>(0)
  const [ epcVendido, setEpcVendido ] = useState<number>(0)
  const [ totalComision, setTotalComision ] = useState<number>(0)

  const [ tipoTecho, setTipoTecho ] = useState<string>("Cemento")

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

      if (paneles <= 23) {
        // Obligatorio 1
        setCantBateria(1)
        setCatnBatBloq(true)
        setListOpciones(["1"])
      }

      if (paneles >= 25 && paneles <= 30) {
        // Opcional 2
        setCantBateria(2)
        setCatnBatBloq(false)
        setListOpciones(["1", "2"])
      }


      if (paneles >= 31 && paneles <= 49) {
        // Obligatorio 2
        setCantBateria(2)
        setCatnBatBloq(true)
        setListOpciones(["2"])
      }

      if (paneles >= 50) {
        // Opcional 3
        setCantBateria(3)
        setCatnBatBloq(false)
        setListOpciones(["2", "3"])
      }

      //if (paneles >= 62 && paneles <= 73) {
      //  // Obligatorio 3
      //  setCantBateria(3)
      //  setCatnBatBloq(true)
      //  setListOpciones(["3"])
      //}
//
      //if (paneles >= 74) {
      //  // Opcional 4
      //  setCantBateria(4)
      //  setCatnBatBloq(false)
      //  setListOpciones(["3", "4"])
      //}
    }

    //if (bateria == "Solar_Edge") {
    //  
    //  if (paneles <= 25) {
    //    // Obligatorio 1
    //    setCantBateria(1)
    //    setCatnBatBloq(true)
    //    setListOpciones(["1"])
    //  }
//
    //  if (paneles >= 26 && paneles <= 37) {
    //    // Opcional 2
    //    setCantBateria(2)
    //    setCatnBatBloq(false)
    //    setListOpciones(["1", "2"])
    //  }
//
    //  if (paneles >= 38) {
    //    // Obligatorio 2
    //    setCantBateria(2)
    //    setCatnBatBloq(true)
    //    setListOpciones(["2"])
    //  }
//
    //}
//


  }, [paneles, bateria]);

  // Funcionalidad de Checkboxes
  const handleCheck1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdder1(e.target.checked)
  };
  const handleCheck2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdder2(e.target.checked)
  };
  const handleCheck3 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdder3(e.target.checked)
  };
   const handleCheck4 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdder4(e.target.checked)
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


      if ( cantBateria == 1 ) {
        //if ( paneles >= 10 && paneles <= 13 ) {
        //  setEpcBase(5)
        //}
        //if ( paneles >= 14 && paneles <= 17 ) {
        //  setEpcBase(4.5)
        //}
        //if ( paneles >= 18 && paneles <= 37 ) {
        //  setEpcBase(4)
        //}
        
       
        paneles == 10 ? setEpcBase(5.16) : null
        paneles == 11 ? setEpcBase(4.89) : null
        paneles == 12 ? setEpcBase(4.67) : null
        paneles == 13 ? setEpcBase(4.48) : null
        paneles == 14 ? setEpcBase(4.32) : null
        paneles == 15 ? setEpcBase(4.18) : null
        paneles == 16 ? setEpcBase(4.05) : null
        paneles == 17 ? setEpcBase(3.94) : null
        paneles == 18 ? setEpcBase(3.85) : null
        paneles == 19 ? setEpcBase(3.76) : null
        paneles == 20 ? setEpcBase(3.68) : null
        paneles == 21 ? setEpcBase(3.61) : null
        paneles == 22 ? setEpcBase(3.55) : null
        paneles == 23 ? setEpcBase(3.49) : null
        paneles == 24 ? setEpcBase(3.43) : null
        paneles == 25 ? setEpcBase(3.39) : null
        paneles == 26 ? setEpcBase(3.34) : null
        paneles == 27 ? setEpcBase(3.30) : null
        paneles == 28 ? setEpcBase(3.26) : null
        paneles == 29 ? setEpcBase(3.22) : null
        paneles == 30 ? setEpcBase(3.19) : null


      }

      if ( cantBateria == 2 ) {
        //if ( paneles >= 25 && paneles <= 65 ) {
        //  setEpcBase(4)
        //}
        paneles == 24 ? setEpcBase(4.46) : null
        paneles == 25 ? setEpcBase(4.37) : null
        paneles == 26 ? setEpcBase(4.29) : null
        paneles == 27 ? setEpcBase(4.21) : null
        paneles == 28 ? setEpcBase(4.14) : null
        paneles == 29 ? setEpcBase(4.07) : null
        paneles == 30 ? setEpcBase(4.01) : null
        paneles == 31 ? setEpcBase(3.95) : null
        paneles == 32 ? setEpcBase(3.90) : null
        paneles == 33 ? setEpcBase(3.85) : null
        paneles == 34 ? setEpcBase(3.80) : null
        paneles == 35 ? setEpcBase(3.75) : null
        paneles == 36 ? setEpcBase(3.71) : null
        paneles == 37 ? setEpcBase(3.67) : null
        paneles == 38 ? setEpcBase(3.63) : null
        paneles == 39 ? setEpcBase(3.59) : null
        paneles == 40 ? setEpcBase(3.56) : null
        paneles == 41 ? setEpcBase(3.52) : null
        paneles == 42 ? setEpcBase(3.49) : null
        paneles == 43 ? setEpcBase(3.46) : null
        paneles == 44 ? setEpcBase(3.43) : null
        paneles == 45 ? setEpcBase(3.41) : null
        paneles == 46 ? setEpcBase(3.38) : null
        paneles == 47 ? setEpcBase(3.36) : null
        paneles == 48 ? setEpcBase(3.33) : null
        paneles == 49 ? setEpcBase(3.31) : null
        paneles == 50 ? setEpcBase(3.29) : null
        paneles == 51 ? setEpcBase(3.27) : null
        paneles == 52 ? setEpcBase(3.24) : null
        paneles == 53 ? setEpcBase(3.22) : null
        paneles == 54 ? setEpcBase(3.21) : null
        paneles == 55 ? setEpcBase(3.19) : null
        paneles == 56 ? setEpcBase(3.17) : null
        paneles == 57 ? setEpcBase(3.15) : null
        paneles == 58 ? setEpcBase(3.14) : null
        paneles == 59 ? setEpcBase(3.12) : null
        paneles == 60 ? setEpcBase(3.11) : null
        paneles == 61 ? setEpcBase(3.09) : null
        paneles == 62 ? setEpcBase(3.08) : null
        paneles == 66 ? setEpcBase(3.02) : null
        paneles == 67 ? setEpcBase(3.01) : null
        paneles == 68 ? setEpcBase(3.00) : null
        paneles == 69 ? setEpcBase(2.99) : null
        paneles == 70 ? setEpcBase(2.98) : null
        paneles == 71 ? setEpcBase(2.97) : null
        paneles == 72 ? setEpcBase(2.95) : null
        paneles == 73 ? setEpcBase(2.94) : null
        paneles == 74 ? setEpcBase(2.93) : null

      }

      if ( cantBateria >= 3 ) {
        //setEpcBase(4)

        paneles == 50 ?  setEpcBase(3.78) : null
        paneles == 51 ?  setEpcBase(3.75) : null
        paneles == 52 ?  setEpcBase(3.72) : null
        paneles == 53 ?  setEpcBase(3.69) : null
        paneles == 54 ?  setEpcBase(3.66) : null
        paneles == 55 ?  setEpcBase(3.64) : null
        paneles == 56 ?  setEpcBase(3.61) : null
        paneles == 57 ?  setEpcBase(3.59) : null
        paneles == 58 ?  setEpcBase(3.56) : null
        paneles == 59 ?  setEpcBase(3.54) : null
        paneles == 60 ?  setEpcBase(3.52) : null
        paneles == 61 ?  setEpcBase(3.50) : null
        paneles == 62 ?  setEpcBase(3.47) : null
        paneles == 66 ?  setEpcBase(3.40) : null
        paneles == 67 ?  setEpcBase(3.38) : null
        paneles == 68 ?  setEpcBase(3.36) : null
        paneles == 69 ?  setEpcBase(3.35) : null
        paneles == 70 ?  setEpcBase(3.33) : null
        paneles == 71 ?  setEpcBase(3.31) : null
        paneles == 72 ?  setEpcBase(3.30) : null
        paneles == 73 ?  setEpcBase(3.28) : null
        paneles == 74 ?  setEpcBase(3.27) : null

      }


      //if (bateria == "Tesla") {
      //  
      //  if ( cantBateria == 1 ) {
//
      //    if ( paneles >= 10 && paneles <= 13 ) {
      //      setEpcBase(5)
      //    }
//
      //    if ( paneles >= 14 && paneles <= 17 ) {
      //      setEpcBase(4.5)
      //    }
//
      //    if ( paneles >= 18 && paneles <= 37 ) {
      //      setEpcBase(4)
      //    }
      //    
      //  }
//
      //  if ( cantBateria == 2 ) {
      //    if ( paneles >= 25 && paneles <= 65 ) {
      //      setEpcBase(4)
      //    }
      //  }
//
      //  if ( cantBateria >= 3 ) {
      //    setEpcBase(4)
      //  }
      //}

      //if (bateria == "Solar_Edge") {
      //  
      //  if ( cantBateria == 1 ) {
//
      //    if ( paneles >= 10 && paneles <= 13 ) {
      //      setEpcBase(5)
      //    }
//
      //    if ( paneles >= 14 && paneles <= 17 ) {
      //      setEpcBase(4.5)
      //    }
//
      //    if ( paneles >= 18 && paneles <= 22 ) {
      //      setEpcBase(4)
      //    }
      //    
      //  }
//
      //  if ( cantBateria == 2 ) {
      //    if ( paneles >= 23 && paneles <= 49 ) {
      //      setEpcBase(4)
      //    }
      //    if ( paneles >= 50 ) {
      //      setEpcBase(4)
      //    }
      //  }
//
      //}
    

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

    if (adder3) {
      baseTotal = baseTotal - 1000
    }

    if (adder4) {
      baseTotal = baseTotal - 1000
    }

    if (tipoTecho == "Zinc") {
      baseTotal = baseTotal - 2000
    }

    if (epcVendido < epcBase) {
      //baseTotal = baseTotal - 5000
      console.log("menor");
    }

    const totalBaseDesc = baseTotal
    setSolarAjustado(totalBaseDesc)

    



    //r - % de comision = comision


    const rangoSelec = rangos.find(item => item.id == idVendedor)

    if (rangoSelec && typeof rangoSelec.porcentaje === 'number') {
      const percent = rangoSelec.porcentaje / 100;
      //setTotalComision(Math.round(totalBaseDesc * percent));
      setTotalComision(totalBaseDesc * percent);
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
    setTipoTecho("Cemento")
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
                    onChange={handleCheck4}
                    checked={adder4}
                  />
                  <span>UP Front Payment</span>
                </label> 
                <label>
                  <input
                    type="checkbox"
                    name="adder1"
                    onChange={handleCheck1}
                    checked={adder1}
                  />
                  <span>Zanja</span>
                </label> 
                <label>
                  <input
                    type="checkbox"
                    name="adder1"
                    onChange={handleCheck3}
                    checked={adder3}
                  />
                  <span>Equipo existente</span>
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

                <label className="epcVendido">
                  <span>EPC Vendido</span>
                  <input type="number"  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setEpcVendido(parseFloat(e.target.value))}} value={epcVendido}/>
                </label>

                <button className="calculaCom" type="button" onClick={calcularComision}>Calcular comisión</button>

                {solarAjustado > 0 ? (
                  <>
                  <div className="epctotal" style={{display: "none"}}>
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