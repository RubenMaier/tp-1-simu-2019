const initial_conditions = () => {
    const attributes = []

    attributes.push(Number(document.getElementById('q').value))
    attributes.push(Number(document.getElementById('TPLL').value))
    attributes.push(Number(document.getElementById('TCM').value))
    attributes.push(Number(document.getElementById('TCD').value))
    attributes.push(Number(document.getElementById('T').value))
    attributes.push(Number(document.getElementById('TF').value))

    return attributes
}

const iterate_simulation = (Q, TPLL, TCM, TCD, T, TF) => {
    let
        ESPERA_LOTE = false,
        M_OCIOSA = false,
        P = 0, // pedidos
        PT = 0, // pedidos totales
        ITOM = 0, // inicio de tiempo ocioso de la maquina
        PTM = 0, // produccion total del maquina
        PTD = 0,  // produccion total del dueño
        STOM = 0, // sumatoria de tiempo ocioso maquina
        STOD = 0 // sumatoria de tiempo ocioso dueño

    while (T < TF) {
        T = TPLL
        let IP = Math.round(generate_ip())
        TPLL = T + IP
        P = P + 1
        PT = PT + 1
        if (TCM < TCD || ESPERA_LOTE == true) {
            if (TCM < TF) {
                // produce la maquina
                if (M_OCIOSA == false) {
                    M_OCIOSA = true
                    ITOM = T
                    ESPERA_LOTE = true
                }
                if (P >= Q) {
                    let TFM = 0;
                    for (let i = 0; i < Q; i++) { // genero Q cantidad de veces la fdp
                        TFM = TFM + Math.round(generate_tfm())
                    }
                    if (T > TCM) {
                        // maquina disponible para atender ya
                        STOM = STOM + (T - ITOM)
                        M_OCIOSA = false
                        TCM = T + TFM
                    } else {
                        // maquina ocupada, termina y atiende
                        TCM = TCM + TFM
                    }
                    P = P - Q // resto Q pedidos hechos
                    PTM = PTM + Q
                    ESPERA_LOTE = false
                }
            }
        } else {
            if (TCD < TF) {
                // produce el dueño
                let TFD = Math.round(generate_tfd())
                if (T > TCD) {
                    // dueño disponible para atender ya
                    STOD = STOD + (T - TCD)
                    TCD = T + TFD
                } else {
                    // dueño ocupado, termina y atiende
                    TCD = TCD + TFD
                }
                P = P - 1 // resto un pedido realizado
                PTD = PTD + 1
            }
        }
    }
    console.log(TCD - TF, TCM - TF, T - TF)

    return [T, STOD, STOM, PTM, PTD, PT, P]
}

const calculate_results = (T, STOD, STOM, PTM, PTD, PT, P) => {
    const
        PTOM = Math.round((100 * STOM) / T) + " %", // porcentaje tiempo ocioso maquina
        PTOD = Math.round((100 * STOD) / T) + " %", // porcentaje tiempo ocioso dueño
        PPM = Math.round((30 * 24 * 60 * 60 * PTM) / T) + " piezas", // promedio porcentual produccion maquina
        PPD = Math.round((30 * 24 * 60 * 60 * PTD) / T) + " piezas", // promedio porcentual produccion dueño
        PNRM = Math.round((P * 30 * 24 * 60 * 60) / T) + " piezas" // produccion no realizado mensual
    console.log(STOM, STOD, T)
    console.log("totales " + PT + " - no hechos " + P)
    return [PTOM, PTOD, PPM, PPD, PNRM, PT + " piezas"]
}