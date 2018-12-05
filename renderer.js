'use strict';

const fetch = require('node-fetch');
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('1c5e9d9385734e9f9a3146d00f800fd2')

var ind_result = document.getElementById("indart");
var results = document.getElementById("results");
var topic = document.getElementById("topic");
var topic_submit = document.getElementById("topic_submit");
var articles = [];

var run = function() {
  var url = `https://newsapi.org/v2/everything?q=${topic.value}&apiKey=1c5e9d9385734e9f9a3146d00f800fd2`;
  console.log(url);
  console.log(topic.value);
  fetch(url)
      .then(response => {
        console.log(response);
        console.log(response.size);
      })
      // .then(body => {
      //   console.log(body);
      // })
}

var go = function() {
  newsapi.v2.everything({
  q: `${topic.value}`,
  from: '2018-08-28',
  to: '2018-09-18',
  language: 'en',
  sortBy: 'relevancy',
  page: 2
}).then(response => {
  var arts = response.articles.splice(0, 10);
  arts.forEach(article => {
    articles.push(article.title);
    console.log(article.title);
  })
  /*
    {
      status: "ok",
      articles: [...]
    }
  */
  });
  // results.innerText = "";
  articles.forEach(article => {
    var res = results.innerHTML += article.link("other.html") + "<br> <br>";
  })
}

topic_submit.onclick = function() {go()};
