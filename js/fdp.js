const generate_ip = () => {
    const R = Math.random();
    return ( 10* (Math.pow ( R , 1.0243) + 3.5) )
}

const generate_tfm = () => {
    const R = Math.random();
    return ( 15 / (Math.pow( (1 - R), (0.28132) ) ) )
}

const generate_tfd = () => {
    const R = Math.random();
    return ( 5 * Math.pow( 2 , 3 - R ) * Math.pow(3 , R + 1) )
}