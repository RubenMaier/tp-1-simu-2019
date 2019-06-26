
window.addEventListener("load", function () {
    document.getElementById('run').addEventListener('click', () => {
        const attributes = initial_conditions()
        const iterate_resutls = iterate_simulation(...attributes)
        const results = calculate_results(...iterate_resutls)
        print_interfaces(...results)
    })
})

const print_interfaces = (PTOM, PTOD, PPM, PPD, PNRM, PT) => {
    document.getElementById('PTOM').innerHTML = PTOM
    document.getElementById('PTOD').innerHTML = PTOD
    document.getElementById('PPM').innerHTML = PPM
    document.getElementById('PPD').innerHTML = PPD
    document.getElementById('PNRM').innerHTML = PNRM
}