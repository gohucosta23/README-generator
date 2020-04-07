const fs = require("fs");
const inquirer = require("inquirer");
const axios = require("axios");
const dotenv = require("dotenv");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

inquirer
  .prompt({
    message: "Enter your GitHub username:",
    name: "username"
  })
  .then(function({username}) {
    const queryUrl = `https://api.github.com/users/${username}`;

    axios.get(queryUrl).then(function(response){

        const githubPhoto = response.data.avatar_url;
        const githubEmail = response.data.email;        
  
function questions(){

   return inquirer.prompt([

        {message : "What is the project title?", name : "title"},
        {message : "What is the project description?", name : "description"},
        {message : "What are the table of contents?", name : "table"},
        {message : "Please describe the installation process", name : "installation"},
        {message : "Please describe the usage", name : "usage", default: "No usage avaible."},
        {message : "What is the license for the process?", name : "License", default: "No license avaible."},
        {message : "What was the contribution?", name : "contribution", default : "No contributors."},
        {message : "Please describe the test", name : "test"},
        {message : "Please describe any frequesntly asked questions", name : "questions", default: "No questions avaible."}
    
    ]);
}

function generateReadme(answers){
    return `
# ${answers.title}
<br>

## Description
<br>
<p> ${answers.description}</p>
<br>
<img src ="https://img.shields.io/badge/Created%20by-Hugo%20Costa-orange">

## Table of Contents
<ul>
<li>${answers.installation}</li>
<li>${answers.usage}</li>
<li>${answers.License}</li>
<li>${answers.contribution}</li>
<li>${answers.test}</li>
<li>${answers.questions}</li>
</ul>
<br>

## Installation
<br>
<p>${answers.installation}</p>
<br>

## Usage
<br>
<p>${answers.usage}</p>
<br>

## License
<br>
<p><strong>${answers.license}</strong></p>
<br>

## Contributors
<br>
<p>${answers.contribution}</p>
<br>

## Questions
<br>
<img src ="${githubPhoto}" alt = "Github profile picture">
<a href = "mailto:${githubEmail}">${githubEmail}</a> `
}

questions()

.then(function(answers){

    const readme = generateReadme(answers);

    return writeFileAsync(`README.md`, readme);

})
})
}).then(function(){

    console.log("success");

}).catch(function(err){

    console.log(err);
})
