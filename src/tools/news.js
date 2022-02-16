//Require Request
const request = require("request")
//my newsApi Access Key
const newsApi = (callbackFN)=>{
    const newsUrl = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=425978158efc4887837f6096bb68781e'
    request({url:newsUrl, json:true}, (error,response)=>{
        if (error) {
            callbackFN('unable to connect News API', undefined)
        } else if (response.body.status == 'error') {
            callbackFN(response.body.message, undefined)
        } else if (response.body.articles.length == 0) {
            callbackFN('unable to loading news .. try again', undefined)
        } else {
            callbackFN(undefined, response.body.articles)
        }
    })
}
module.exports = newsApi