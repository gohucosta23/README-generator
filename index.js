

const fs = require("fs");
const inquirer = require("inquirer");
const axios = require("axios");
const util = require("util");

// Promissifying fs.writeFile
const writeFileAsync = util.promisify(fs.writeFile);

// Asking the user for the username to make a call to the github api
inquirer
  .prompt({

    message: "Enter your GitHub username:",
    name: "username"

  })
  .then(function({username}) {

    // url for the github api
    const queryUrl = `https://api.github.com/users/${username}`;

    axios.get(queryUrl).then(function(response){
        
        // getting the profile picture and putting into a variable
        const githubPhoto = response.data.avatar_url;        
    
function questions(){

    // Questions that will be populated into the readme file
   return inquirer.prompt([

        {message : "What is the project title? ", name : "title"},
        {message : "What is the project description? ", name : "description"},   
        {message : "Please describe the installation process: ", name : "installation"},
        {message : "Please describe the usage: ", name : "usage", default: "No usage avaible."},
        {message : "Please the license used: ", name : "License", default: "No license avaible."},
        {message : "What was the contribution? ", name : "contribution", default : "No contributors."},
        {message : "Please describe any tests: ", name : "test"},
        {message : "Which Language did you use in your project? ", name : "language"},
        {message : "What is your Github email address? ", name : "email"}
    ]);
}

// function to generate dynamically readme
function generateReadme(answers){
    return `

[![GitHub followers](https://img.shields.io/github/followers/${username}.svg?style=social&label=Follow&maxAge=2592000)](https://github.com/${username}?tab=followers)
[![GitHub forks](https://img.shields.io/github/forks/${username}/StrapDown.js.svg?style=social&label=Fork&maxAge=2592000)](https://GitHub.com/${username})
[![made-with-${answers.language}](https://www.google.com/search?sxsrf=ALeKk03CJev2vEQmChJVHosKhUSdewJBYw%3A1586455822935&source=hp&ei=DmWPXv7LNdaIytMPwKu82Aw&q=${answers.language}&oq=${answers.language}&gs_lcp=CgZwc3ktYWIQAzIECCMQJzIECCMQJzIECCMQJzIFCAAQkQIyBAgAEEMyBQgAEJECMgQIABBDMgQIABBDMgQIABBDMgQIABBDOgcIIxDqAhAnOgUIABCDAToCCABKJwgXEiMwZzExN2c4OGc5NWcxMDFnMTk3ZzIyMGc5OWc3OGc4MWc5M0oZCBgSFTBnMWcxZzFnMWcxZzFnMWcxZzFnMVCAGVjbJmCELmgCcAB4AIABzQGIAYkIkgEFNy4yLjGYAQCgAQGqAQdnd3Mtd2l6sAEK&sclient=psy-ab&ved=0ahUKEwj-ipm--NvoAhVWhHIEHcAVD8sQ4dUDCAk&uact=5)]

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
<p><strong>${answers.License}</strong></p>
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
<a href = "mailto:${answers.email}">${answers.email}</a> `
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
