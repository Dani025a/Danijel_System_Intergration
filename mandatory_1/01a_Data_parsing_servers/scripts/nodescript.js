    const fs = require('fs');
    const yaml = require('js-yaml');
    const xml2js = require('xml2js');
    const csv = require('csv-parser');

    const parser = new xml2js.Parser();
    const results = [];

    try {
    const fileContents = fs.readFileSync('../me.yaml', 'utf8');
    const data = yaml.load(fileContents);
    console.log(data);
    } catch (e) {
    console.error(e);
    }

    fs.readFile('../me.json', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(JSON.parse(data));
    });

    fs.readFile('../me.xml', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    parser.parseString(data, (err, result) => {
        if (err) {
        console.error(err);
        return;
        }
        console.log(result);
    });
    });

    fs.createReadStream('../me.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
        console.log(results);
    });
