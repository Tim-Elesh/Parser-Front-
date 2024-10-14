import axios from 'axios';

export type RawData = {
  [model: string]: Array<{
    date: string;
    [provider: string]: string; // Значение - строка в формате "input/output"
  }>;
};

export type TableData = {
  model: string;
  provider: string;
  input: string;
  output: string;
};

export const transformData = (data: RawData): TableData[] => {
  const result: TableData[] = [];

  for (const model in data) {
    data[model].forEach((entry) => {
      for (const provider in entry) {
        if (provider !== "date") {
          const value = entry[provider];
          if (value) {
            const [input, output] = value.split("/");
            result.push({
              model,
              provider,
              input,
              output,
            });
          }
        }
      }
    });
  }

  return result;
};


export const transformBenchData = () =>{
  return null;
}


function useDataFetcher() {

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;


  const firstUrl = `https://tivi.aitomaton.online/date/${formattedDate}`;
  const secondUrl = `https://tivi.aitomaton.online/bench/${formattedDate}`;

  axios.all([
    axios.get(firstUrl, { responseType: 'json' }),
    axios.get(secondUrl,{ responseType: 'json' })
  ])
  .then(axios.spread((response1, response2) => {
    const dataFromFirstURL = transformData(response1.data);
    const dataFromSecondURL = transformBenchData(response2.data);

    console.log('Data from first URL:', dataFromFirstURL);
    console.log('Data from second URL:', dataFromSecondURL);

   
  }))
  .catch(function(error){
    console.log(error);
  })



 /* axios({
    method: 'get',
    url: `https://tivi.aitomaton.online/date/${formattedDate}`,
    responseType: 'json',
    transformResponse: [function (data) {

      for (const model in data) {

        if(Array.isArray(data[model])){
          console.log('yes')
          console.log(data);
        } else{
          console.log('no')
        }

      }
      
      return transformData(data);
      
    }],  
  })
    .then(function (response) {
      console.log(response);
    })
    .catch(function(error){
      console.log(error);
    })
} */
}

export default useDataFetcher;


//axios.get(`https://tivi.aitomaton.online/date/${formattedDate}`),
//axios.get(`https://tivi.aitomaton.online/bench/${formattedDate}`)