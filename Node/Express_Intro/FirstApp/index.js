const express = require("express");
const app = express();

// console.dir(app);

// app.use((req, res) => {
//     console.log("We got a new request!");
//     res.send('<h1>This is my webpage!</h1>');
// })

app.get('/', (req, res) => {
    res.send("<h1>This is the home page</h1>");
})

app.get('/r/:subreddit', (req, res) => {
    const {subreddit} = req.params;
    res.send(`<h1>Browsing the ${subreddit} subreddit</h1>`);
})

app.get('/r/:subreddit/:postID', (req, res) => {
    const {subreddit, postID} = req.params;
    res.send(`<h1>Viewing Post ID : ${postID} on Subreddit ${subreddit}`);
})

app.get('/cats', (req, res) => {
    res.send("Meow!");
})

app.post('/dogs', (req, res) => {
    res.send("Post request. This is different from the get method.")
})

app.get('/dogs', (req, res) => {
    res.send("Woof!");
})

app.get('/search', (req, res) => {
    const {q} = req.query;
    if(!q){
        res.send("Nothing found if nothing searched.");
    }
    res.send(`<h1>Search result for ${q}</h1>`);
})

app.get('*', (req, res) => {
    res.send("I don't know this page.");
})


app.listen(3000, () => {
    console.log("Listening on port 3000!");
})