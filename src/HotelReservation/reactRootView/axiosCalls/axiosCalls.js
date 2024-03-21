import axios from "axios";
const baseUrl = 'http://192.168.1.200:5000/api';

// Passing configuration object to axios
// axios({
//   method: 'get',
//   url: `${baseUrl}/`,
// }).then((response, req) => {
//     console.log("response,  req: ", response, req);
// });

// // Invoking get method to perform a GET request
// axios.get(`${baseUrl}/Auth/Test`).then((response, request) => {
//     console.log("response,  req: ", response, request);
// //   console.log(response.data);
// });

// const instance = axios.create({
//     baseURL: 'http://192.168.1.200:5000/api',
//     headers: {
//         'content-type':'application/json',
//     },
// });

export default {
    baseUrl: 'http://192.168.1.200:5000/api',
    headers: {
        'content-type':'application/json',
    },
    getTestData: () =>
    (
        axios({
            method: 'get',
            url: `${baseUrl}/Auth/Test`,
          }).then((response) => {
            console.log("response: ", response.data)
          })
    ),
    getData: () =>
    instance({
        'method':'GET',
        'url':'/Auth/Test',
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Credentials': 'true'
          },
        transformResponse: [function (data) {
            // Do whatever you want to transform the data
            console.log('Transforming data...')
            const json = JSON.parse(data);
            // list of nested object keys
            //const dates = Object.keys(json['nested object'])
            
            console.log(json);
            return data;
        }],
    })
}
