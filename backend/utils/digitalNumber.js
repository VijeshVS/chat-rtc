const generateDigitalNumber = ()=> {
    let number = 0;

    for (let i = 0; i < 5; i++) {
        number += Number.parseInt(Math.random() * 10) * Math.pow(10, i);
    }

    return number;
}

export default generateDigitalNumber