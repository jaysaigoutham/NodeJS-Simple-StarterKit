const info = (...params) => {
    //console.log(...params)
    console.log("ENV (", process.env.NODE_ENV, ") : ", ...params)
}

const error = (...params) => {
    //console.log(...params)
    console.log("ENV (", process.env.NODE_ENV, ") : ", ...params)
}

module.exports = {info, error}