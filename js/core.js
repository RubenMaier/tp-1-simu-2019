
window.addEventListener("load", function() {
    let permits = 1
    document.getElementById('run').addEventListener('click', () => {
        if(permits) {
            permits = 0;
            const attributes = initial_conditions()
            const iterate_resutls = iterate_simulation(...attributes)
            const results = calculate_results(...iterate_resutls)
            print_interfaces(...results)
        }
    })
})

const print_interfaces = (PTOM, PTOD, PRTM, PRTD, PNR, PT) => {
    document.getElementById('PTOM').innerHTML = PTOM
    document.getElementById('PTOD').innerHTML = PTOD
    document.getElementById('PRTM').innerHTML = PRTM
    document.getElementById('PRTD').innerHTML = PRTD
    document.getElementById('PNR').innerHTML = PNR
    document.getElementById('PT').innerHTML = PT
}