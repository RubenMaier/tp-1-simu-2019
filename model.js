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
        P = 0, 
        PT = 0, 
        ITOM = 0, 
        PTM = 0, 
        PTD = 0, 
        STOM = 0, 
        STOD = 0

    while(T < TF) {
        T = TPLL
        let IP = generate_ip()
        TPLL = T + IP
        P = P + 1
        PT = PT + 1
        if (TCM < TCD) {
            if (P < Q) {
                IOTM = T
            } else {
                let TFM = generate_tfm()
                if (T < TCM) {
                    STOM = STOM + (T - ITOM)
                    TCM = T + TFM
                } else {
                    TCM = TCM + TFM
                }
                P = P - Q
                PTM = PTM + Q
            }
        } else {
            let TFD = generate_tfd()
            if (T < TCD) {
                STOD = STOD + (T - TCD)
                TCD = T + TFD
            } else {
                TCD = TCD + TFD
            }
            P = P - 1
            PTD = PTD + 1
        }
    }

    return [T, STOD, STOM, PTM, PTD, PT, P]
}

const calculate_results = (T, STOD, STOM, PTM, PTD, PT, P) => {
    const 
        PTOM = (STOM * 100) / T,
        PTOD = (STOD * 100) / T,
        PRTM = PTM / PT,
        PRTD = PTD / PT,
        PNR = P

    return [PTOM, PTOD, PRTM, PRTD, PNR, PT]
}