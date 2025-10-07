// Cargar las dependencias
const express = require('express')

// Instancia del servidor
const app = express()

// Puerto del servidor
process.loadEnvFile()
const PORT = process.argv[2] || process.env.PORT || 8888

const ventas = require('../data/ventas.json')

console.log(ventas);

