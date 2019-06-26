const generate_ip = () => {
    const R = Math.random();
    //return random(35, 70)
    return (10 * (Math.pow(R, 1.0243) + 3.5))
}

const generate_tfm = () => {
    const R = Math.random();
    //return random(44, 60)
    return (15 / (Math.pow((1 - R), (0.28132))))
}

const generate_tfd = () => {
    const R = Math.random();
    //return random(150, 200)
    return (5 * Math.pow(2, 3 - R) * Math.pow(3, R + 1))
}

function random(min, max) {
    return Math.random() * (max - min) + min;
}
