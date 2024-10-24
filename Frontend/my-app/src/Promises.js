
const axios = require('axios')

function sum(a, b) {
    console.log('Adding', a, 'and', b)
    return a + b
}

function minus(a, b) {
    console.log('Sub', a, 'and', b)
    return a - b
}

const raining = false

// promises
// 
// const arr = []
const friendsPromise = new Promise((resolve, reject) => {
    if(!raining) resolve(0.3)
    else reject()
}).then((result) => {
    // throw new Error('error happened')
    console.log("We will go to play.")
    // return 0.7
    return 0.7
}).then((result) => {
    // if(result > 0.5) throw Error('heavy rain')
    return [result, 'heavy rain']
}).then((result) => {
    // console.log(result);
    return [...result, 10]
}).then((result) => {
    console.log(result)
})
// function getDataFromAPI (a, b) {
//    return a + b
// }

// blocking, non-blocking code function

function shouldResolveReject(todo, i) {
    return Promise((resolve, reject) => {
        if(todo === true) {
            console.log('resolved ' + i)
            resolve()
        }
        console.log('rejected')
        return reject(new Error("error happened" + i))
    })
}

async function work () {
    console.log("We will go to play.")
    try {
        await shouldResolveReject(true, 1)
        shouldResolveReject(false, 2)
        await shouldResolveReject(true, 3)
    } catch (e) {
        console.log("error", e)
    }
}

work()

const getDataFromAPI = (a, b) => {
    // https://httpbin.org/json
    axios.get("https://httpbin.org/json1")
    .then((result1) => {
        return axios.get("https://httpbin.org/json2" + result1)
    }).then((result2) => {
        return axios.get("https://httpbin.org/json3" + result2)
    }).then(() => {
        
    })
    return a + b
}


// sum()
// minus()