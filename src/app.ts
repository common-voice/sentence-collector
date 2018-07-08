import Kinto from './vendor/kinto.min.js';
const username = 'admin';
const password = 'password';
const kinto = new Kinto({
  remote: 'http://kinto.mozvoice.org/v1'
  headers: {
    Authorization: "Basic " + btoa(`${username}:${password}`),
  },
  bucket: 'new',
});

const articles = kinto.collection("articles");

articles.create({title: "foo"})
  .then(console.log.bind(console))
  .catch(console.error.bind(console));
