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

        {message : "What is the project title? ", name : "title"},
        {message : "What is the project description? ", name : "description"},
        {message : "What are the table of contents? ", name : "table"},
        {message : "Please describe the installation process: ", name : "installation"},
        {message : "Please describe the usage", name : "usage", default: "No usage avaible."},
        {message : "Please list any licenses: ", name : "License", default: "No license avaible."},
        {message : "What was the contribution? ", name : "contribution", default : "No contributors."},
        {message : "Please describe any tests: ", name : "test"},
        {message : "Which Language did you use in your project? ", name : "language"}
    
    ]);
}

function generateReadme(answers){
    return `
[![GitHub followers](https://img.shields.io/github/followers/${username}.svg?style=social&label=Follow&maxAge=2592000)](https://github.com/${username}?tab=followers)
[![GitHub forks](https://img.shields.io/github/forks/${username}/StrapDown.js.svg?style=social&label=Fork&maxAge=2592000)](https://GitHub.com/${username})
[![made-with-${answers.language}](https://img.shields.io/badge/Made%20with-${answers.language}-1f425f.svg)]
[![Awesome Badges](https://img.shields.io/badge/badges-awesome-green.svg)](https://shields.io/)

# ${answers.title}
<br>

## Description
<br>
<p> ${answers.description}</p>
<br>


## Table of Contents
<ul>
<li><strong>Installation</strong></li>
<li><strong>Usage</strong></li>
<li><strong>License</strong></li>
<li><strong>Tests</strong></li>
<li><strong>Contributing</strong></li>
<li><strong>Questions</strong></li>
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

## Tests
<br>
<p>${answers.test}</p>
<br>

## Contributing
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
