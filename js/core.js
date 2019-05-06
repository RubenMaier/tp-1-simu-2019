
window.addEventListener("load", function() {
    console.log(generate_ip())
    console.log(generate_tfm())
    console.log(generate_tfd())
    document.getElementById('run').addEventListener('click', () => {
        const attributes = initial_conditions()
        console.log(attributes)
        const iterate_resutls = iterate_simulation(...attributes)
        console.log(iterate_resutls)
        const results = calculate_results(...iterate_resutls)
        console.log(results)
        print_interfaces(...results)
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