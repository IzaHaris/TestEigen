import express from 'express';
const app = express()
const port = 3000
import url from "url";
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

app.set('view engine', 'ejs');


app.get('/', (req, res) => {
  res.render('index');
});

app.get('/inverse', (req, res) => {
  res.sendFile("./page/balik.html", { root: __dirname});
});

app.get('/words', (req, res) => {
  res.sendFile("./page/kata.html", { root: __dirname});
});

app.get('/arrays', (req, res) => {
  res.sendFile("./page/irisan.html", { root: __dirname});
});

app.get('/metrics', (req, res) => {
  res.sendFile("./page/matriks.html", { root: __dirname});
});

app.get('/balik', (req, res) => {
    const input = req.query.balik;
    if (!input) {
        return res.status(400).send({ error: 'Tolong masukan kata.' });
    }
    
    const numberPart = input.slice(-1);
    const parsedValue = parseFloat(numberPart);
    const hasil = 0 ;
    // res.send(!isNaN(parsedValue));
    if (!isNaN(parsedValue)) {
      const letterPart = input.slice(0, -1);
      const reversedLetters = letterPart.split('').reverse().join('');
      const hasil = reversedLetters + numberPart;
      res.render('hasil', { hasil });
    } else {
      const letterPart = input.slice(0); 
      const hasil = letterPart.split('').reverse().join('');
      res.render('hasil', { hasil });
    }
});

app.get('/kata', (req, res) => {
    const input = req.query.kata;
    if (!input) {
        return res.status(400).send({ error: 'Tolong masukan kalimat.' });
    }

    const kata = input.split(' ');
    const hasil = kata.reduce((panjang, baru) => 
        baru.length > panjang.length ? baru : panjang, '');

    res.render('hasil', { hasil });
});

app.get('/irisan', (req, res) => {
    const array1 = req.query.array1;
    const array2 = req.query.array2;
    const data = array1.split(', ').map(word => word.trim());
    const query = array2.split(', ').map(word => word.trim());
    const hasil = query.map(query => {
      const count = data.filter(input => input === query).length;
      return { word: query, count: count };
  });
    res.render('array', { hasil });
});

app.get('/pengurangan', (req, res) => {
    const inputMatriks = req.query.matriks;
    
    const numbersArray = inputMatriks.split(',').map(num => parseInt(num.trim()));

    const matrix = [];
    for (let i = 0; i < 3; i++) {
        matrix.push(numbersArray.slice(i * 3, i * 3 + 3));
    }

    let kiri = 0;
    let kanan = 0;
    const n = matrix.length;

    for (let i = 0; i < n; i++) {
        kiri += matrix[i][i];
        kanan += matrix[i][n - 1 - i];
    }

    const hasil = kiri - kanan;
    res.render('matriks', { matrix, hasil });
});

app.get('/about', (req, res) => {
  res.send('Page 2')
});

app.use('*', (req, res) => {
  res.status(404);
  res.send('Laman tidak ditemukan')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
