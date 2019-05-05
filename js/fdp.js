const generate_ip = () => {
    const R = Math.random();
    return ( Math.pow( ( 8.21963 * R ) , 1.09643) + 5 )
}

const generate_tfm = () => {
    const R = Math.random();
    return ( 15 / (Math.pow( (1 - R), (0.28132) ) ) )
}

const generate_tfd = () => {
    const R = Math.random();
    return ( Math.pow( Math.E, (0.69315 * R) + 4.78749 ) )
}