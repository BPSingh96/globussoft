const app = require("./app");
const port = process.env.PORT || 3000;

//start sever on specfic port
app.listen(port, () => {
    console.log(`Server running at :${port}`);
});

