export default function numberWithCommas(x) {

    if (typeof x === 'string') {
        x = parseFloat(x)
    }

    if (typeof x === 'number') {
        return x.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return 0.00;

}