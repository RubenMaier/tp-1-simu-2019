
window.addEventListener("load", function() {
    console.log(generate_ip())
    console.log(generate_tfm())
    console.log(generate_tfd())
    let permits = 1
    document.getElementById('run').addEventListener('click', () => {
        if(permits) {
            permits = 0;
            const attributes = initial_conditions()
            console.log(attributes)
            const iterate_resutls = iterate_simulation(...attributes)
            console.log(iterate_resutls)
            //const results = calculate_results(...iterate_resutls)
            //print_interfaces(...results)
        }
    })
})

const initial_conditions = () => {
    const attributes = []
    attributes.push(document.getElementById('q').value)
    attributes.push(document.getElementById('TPLL').value)
    attributes.push(document.getElementById('TCM').value)
    attributes.push(document.getElementById('TCD').value)
    attributes.push(document.getElementById('T').value)
    attributes.push(document.getElementById('TF').value)

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
    const results = []

    results.PTOM = (STOM * 100) / T
    results.PTOD = (STOD * 100) / T
    results.PRTM = PTM / PT
    results.PRTD = PTD / PT
    results.PNR = P
    results.PT = PT

    return results
}

const print_interfaces = (PTOM, PTOD, PRTM, PRTD, PNR, PT) => {
    document.getElementById('PTOM').innerHTML = PTOM
    document.getElementById('PTOD').innerHTML = PTOD
    document.getElementById('PRTM').innerHTML = PRTM
    document.getElementById('PRTD').innerHTML = PRTD
    document.getElementById('PNR').innerHTML = PNR
    document.getElementById('PT').innerHTML = PT
}