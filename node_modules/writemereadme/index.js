// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const generateMarkdown = require('./generateMarkdown');
const writeFileAsync = util.promisify(fs.writeFile);
const path = require('path');

fs.mkdir(path.join(process.cwd(), 'writeme'), (err) => {
    if (err) {
        console.log(err.message);
    }
    console.log('Directory created successfully!');
    init();
});

//Prompt the user questions to populate the README.md
function promptUser() {
    return inquirer.prompt([{
            type: 'input',
            message: 'What is the name of the project?',
            name: 'Title'
        },
        {
            type: 'input',
            message: "Describe the project, please.",
            name: 'Summary'

        },
        {
            type: "input",
            message: "Describe the installation process if any: ",
            name: "installation",
        },
        {
            type: "input",
            message: "What is this project usage for?",
            name: "usage"
        },
        {
            type: "list",
            message: "Chose the appropriate license for this project: ",
            choices: [
                "Apache_v2",
                "AFL_v3",
                "GPL_v2",
                "GPL_v3",
                "ISC",
                "MIT",
                "MPL_v2",
                "BSD_2_Clause",
                "BSD_3_Clause",
                "Open"
            ],
            name: "license",
        },
        {
            type: "input",
            message: "Who are the contributors of this projects?",
            name: "contributing"
        },
        {
            type: "input",
            message: "Please add relative path  or URL to a screenshot of the project. (1/3) \n (i.e ./directory/image.png) or (https://urlToTheImage.com):",
            name: "screenshot1",
        },
        {
            type: "input",
            message: "Please provide 'alt' info for that screenshot.",
            name: "screenshot1Alt"
        },
        {
            type: "input",
            message: "What is this picture of (ie. Desktop Res., Login Screen, etc.)?",
            name: "screenshot1Title"
        },
        {
            type: "input",
            message: "Please add relative path or URL to a screenshot of the project.(2/3)\n (i.e ./directory/image.png) or (https://urlToTheImage.com):",
            name: "screenshot2",
        },
        {
            type: "input",
            message: "Please provide 'alt' info for that screenshot.",
            name: "screenshot2Alt"
        },
        {
            type: "input",
            message: "What is this picture of (ie. Desktop Res., Login Screen, etc.)?",
            name: "screenshot2Title"
        },
        {
            type: "input",
            message: "Please add relative path or URL to a screenshot of the project.(3/3) \n (i.e ./directory/image.png) or (https://urlToTheImage.com):",
            name: "screenshot3",
        },
        {
            type: "input",
            message: "Please provide 'alt' info for that screenshot.",
            name: "screenshot3Alt"
        },
        {
            type: "input",
            message: "What is this picture of (ie. Mobile Res., Login Screen, etc.)?",
            name: "screenshot3Title"
        },
        {
            type: "input",
            message: 'How should issues be addressed? (i.e "email dev@email.com")',
            name: "issues"
        }, {
            type: 'input',
            message: "Describe the project, please.",
            name: 'Summary'

        },
        {
            type: "input",
            message: "Describe the installation process if any: ",
            name: "installation",
        },
        {
            type: "input",
            message: "What is this project usage for?",
            name: "usage"
        },
        {
            type: "list",
            message: "Chose the appropriate license for this project: ",
            choices: [
                "Apache_v2",
                "AFL_v3",
                "GPL_v2",
                "GPL_v3",
                "ISC",
                "MIT",
                "MPL_v2",
                "BSD_2_Clause",
                "BSD_3_Clause",
                "Open"
            ],
            name: "license",
        },
        {
            type: "input",
            message: "Who are the contributors of this projects?",
            name: "contributing"
        },
        {
            type: "input",
            message: "Please add relative path  or URL to a screenshot of the project. (1/3) \n example 1 \n RELATIVE PATH to appropriate repo directory \n./directory/image.png \n or URL (https://urlToTheImage.com/image.png):",
            name: "screenshot1",
        },
        {
            type: "input",
            message: "Please provide 'alt' info for that screenshot.",
            name: "screenshot1Alt"
        },
        {
            type: "input",
            message: "What is this picture of (ie. Desktop Res., Login Screen, etc.)?",
            name: "screenshot1Title"
        },
        {
            type: "input",
            message: "Please add relative path or URL to a screenshot of the project.(2/3)\n (i.e ./directory/image.png) or (https://urlToTheImage.com):",
            name: "screenshot2",
        },
        {
            type: "input",
            message: "Please provide 'alt' info for that screenshot.",
            name: "screenshot2Alt"
        },
        {
            type: "input",
            message: "What is this picture of (ie. Desktop Res., Login Screen, etc.)?",
            name: "screenshot2Title"
        },
        {
            type: "input",
            message: "Please add relative path or URL to a screenshot of the project.(3/3) \n (i.e ./directory/image.png) or (https://urlToTheImage.com):",
            name: "screenshot3",
        },
        {
            type: "input",
            message: "Please provide 'alt' info for that screenshot.",
            name: "screenshot3Alt"
        },
        {
            type: "input",
            message: "What is this picture of (ie. Mobile Res., Login Screen, etc.)?",
            name: "screenshot3Title"
        },
        {
            type: "input",
            message: 'How should issues be addressed? (i.e "email dev@email.com")',
            name: "issues"
        },
        {
            type: "input",
            message: "Please enter your GitHub username: ",
            name: "username"
        },
        {
            type: "input",
            message: "Please enter your email: ",
            name: "email"
        },
        {
            type: "input",
            message: "Please enter the full path where you'd like to write the readme \n (i.e /path/to/local/repo/dir) \n Alternatively, you can just write ./writeme and copy and paste the file where it needs to go.):",
            name: "dir"
        }
    ])
}

//A function to initialize app
async function init() {
    try {
        // Ask user questions and generate responses
        const answers = await promptUser();
        const generateContent = generateMarkdown(answers);
        // Write new README.md to dist directory
        await writeFileAsync(`${answers.dir}/README.md`, generateContent);
        console.log('🎊  Successfully wrote to README.md  🎊');
    } catch (err) {
        console.log(err);
    }
}
// export for external use
module.exports = { init, promptUser, generateMarkdown }