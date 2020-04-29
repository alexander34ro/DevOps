const fetch = require('node-fetch');
const precision = 3;
let time = [];

async function measure() {
    let i = 1;
    while (true) {
        const marker = 'fetch' + i;
        const start = process.hrtime();
        //console.time(marker);
        await fetch('http://janschill.de:1337/latest').then((_) => {
            //console.timeEnd(marker);
            const elapsed = process.hrtime(start)[1] / 1000000;
            time.push(elapsed);
            console.log(marker + ": " + elapsed.toFixed(precision) + "ms");
        }).catch((error) => {
            console.error('Error: ' + error + " " + new Date().toISOString());
        });
        i++;

        if (i % 100 == 0) {
            const average = time.reduce( ( p, c ) => p + c, 0 ) / time.length;
            time = [];
            console.log("Average: " + average.toFixed(precision) + "ms " + new Date().toISOString());
            if (average > 300) console.warn("Warning: SLA not respected! " + average + "ms at " + new Date().toISOString());
        }
    }
}

measure();
