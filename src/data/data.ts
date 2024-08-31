import { useState, useEffect } from 'react';

const [data, setData] = useState([]);

useEffect(() => {
      fetch('http://145.249.249.29:3006/avg')
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Error fetching data:', error));
}, []);

export default data;


/*const data = [
      { date: '28.08.2024',input: '2.029861111111112',output: '4.872368055555553'},
      { date: '28.08.2024',input: '1.029861111111112',output: '6.872368055555553'},
      { date: '28.08.2024',input: '4.029861111111112',output: '3.872368055555553'},
      { date: '28.08.2024',input: '3.029861111111112',output: '5.872368055555553'},
]*/