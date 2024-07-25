const express = require('express');
const { urlencoded } = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

mongoose.connect('mongodb+srv://rubenreyy:Paragon8.@cluster0.idvocgo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const bmiSchema = new mongoose.Schema({
    weight: Number,
    height: Number,
    bmi: Number,
    date: { type: Date, default: Date.now }
});

const Bmi = mongoose.model('Bmi', bmiSchema);

app.set('view engine', 'ejs');
app.use(urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.render('index', { bmi: null }));

app.post('/calculate', async (req, res) => {
    const { weight, height } = req.body;
    const bmi = parseFloat(weight) / (parseFloat(height) ** 2);

    await Bmi.create({ weight, height, bmi });

    res.render('index', { bmi: bmi.toFixed(2) });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
