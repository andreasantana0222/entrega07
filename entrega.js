const express = require('express');

// creo una app de tipo express
const app = express();

const puerto = 8080;

//libreria FS
const fs=require ('fs');

//variables

let visitasItems=0;
let visitasItem=0;
let archivo='productos.txt';



// CONSIGNA 1)-------------
app.get('/items', async (req, res) => {
    //adicion contador de visitas
    visitasItems++;

    //leo archivo
    const contenido = await fs.promises.readFile(archivo,'utf-8');
    const productos=JSON.parse(contenido);
    const cant=productos.length;

    //armo objeto para enviar
    const objeto={
          items: productos,
          cantidad: cant
    };
    //console.log(objeto);
    //res.send(objeto);

    //Envio objeto
    res.type('json').send(JSON.stringify(objeto, null, 2) + '\n');
});


// CONSIGNA 2)-------------
app.get('/item-random', async (req, res) => {
    //adicion contador de visitas
    visitasItem++;
    //leo archivo
    const contenido = await fs.promises.readFile(archivo,'utf-8');
    const productos=JSON.parse(contenido);
    const cant=productos.length;
    const item=Math.floor(Math.random() * (productos.length));

    //console.log(productos[item]);

    //armo objeto para enviar
    const objeto={
      item: productos[item]
    };

    //Envio objeto
    res.type('json').send(JSON.stringify(productos[item], null, 2) + '\n');
});


// CONSIGNA 3)-------------
app.get('/visitas', (req, res) => {
  //armo objeto para enviar
  const objeto={
    visitas: {
      items: visitasItems,
      item: visitasItem
    }
  };
    //console.log(`visitas items:${visitasItems}, visitas item:${visitasItem}`);

    //Envio objeto
    res.type('json').send(JSON.stringify(objeto, null, 2) + '\n');
});

// pongo a escuchar el servidor en el puerto indicado
const server = app.listen(puerto, () => {
    console.log(`servidor escuchando en http://localhost:${puerto}`);
});

// en caso de error, avisar
server.on('error', error => {
    console.log('error en el servidor:', error);
});
