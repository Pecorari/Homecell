const app = require('./app');
require('dotenv').config();

const PORTA = process.env.PORTA;

app.listen(PORTA, () => {
    console.log(`server running on port ${PORTA}`);
});
