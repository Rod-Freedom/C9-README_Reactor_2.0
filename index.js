import fs from 'fs';
import inquirer from 'inquirer';
import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';
import { createSpinner } from 'nanospinner';
import ReadmeObj, { mdReactor } from './utils/mdreactor.js';

const feedReactor = (readmeObj) => {
    const runReactor = (obj) => {
        const READMEprod = mdReactor(obj);
        fs.writeFile('./Atomic_README/README.md', READMEprod, err => {
            const logo = `
                                                       
                        987             398            
                         907           839             
                          767         785              
                           466       453               
                            56734975723                
                                ___                    
                               A6 6A                   
              3894902823973   43   78   3894902823973  
                        732    45567    837            
                         732           897             
                           329       653               
                         232           432             
                       234               234           
                     578                   675         
                                                       
            `;
            const thanks = `
            ......Thanks for using README Reactor......
            `;
            const inst = 'Find your atomic README inside the folder with the same name. Careful! It\'s highly radioactive!';
            
            if (err) console.log(chalk.redBright('Sorry, an error has been found, please start over.'), err)
            else {
                console.log(chalk.cyanBright.italic(inst));
                console.log(chalk.magentaBright(thanks));
                const glitchedLogo = chalkAnimation.glitch(logo);
                setTimeout(() => glitchedLogo.stop(), 5000);
            }
        })
    };

    const getDemo = () => {
        inquirer
            .prompt({
                message: 'Save your demo into the "Atomic_README/assets" folder; it can be a .GIF, .png or .jpg...\nPress ENTER when you\'re done.\n',
                name: 'continue'
            })
            .then(() => {
                const filesTesting = fs.readdirSync('./Atomic_README/assets');
                if (filesTesting.length > 0) {
                    readmeObj.demo = `> ![Demo](./assets/${filesTesting[0]})`;
                    runReactor(readmeObj);
                }
                else throw new Error('no assets')
            })
            .catch(err => {
                console.log(chalk.redBright('There\'s no asset inside the folder.\nRemember, you need to save your demo inside "Atomic_README/assets" directory.\n'));
                getDemo();
            })
    };
    
    if (readmeObj.demo) getDemo()
    else {
        readmeObj.demo = '';
        runReactor(readmeObj);
    }
}

const getContentFunc = (user, repo, license, nick) => {
    console.log(chalk.cyan.italic('\'Found your repo!'));
    if (!license) console.log(chalk.yellow('Your project doesn\'t have a license! Consider adding one.'))

    const questionsFunc = () => {
        inquirer
            .prompt([
                {
                    type: 'input',
                    message: 'What\'s your project\'s name?\n',
                    name: 'title',
                },
                {
                    type: 'input',
                    message: 'Now, write a great slogan!\n',
                    name: 'slogan',
                },
                {
                    type: 'input',
                    message: 'You\'ll need a description about your project.\n',
                    name: 'desc',
                },
                {
                    type: 'checkbox',
                    message: 'Which resources does your project rely on?\n',
                    choices: ['JavaScript', 'Node.js', 'npm packages', 'CSS', 'HTML', 'Python'],
                    name: 'resrc',
                },
                {
                    type: 'input',
                    message: 'You should tell people how to get started/install your product.\n',
                    name: 'start',
                },
                {
                    type: 'input',
                    message: 'Now, explain how to use your product in the best way.\n',
                    name: 'usage',
                },
                {
                    type: 'input',
                    message: 'Lastly, credit, where credit is due. Besides you, who would you like to acknowledge in the credits?\n',
                    name: 'credits',
                },
                {
                    type: 'list',
                    message: 'Would you like to include a demo as an image or GIF?\n',
                    choices: ['yes', 'no'],
                    name: 'demo',
                },
            ])
            .then(inputObj => {
                if (license) license = true
                const readmeObj = new ReadmeObj(user, repo, license, nick, inputObj);
                feedReactor(readmeObj);
            })
    };

    questionsFunc();
};

const getProfileName = (url) => { return new Promise((res, rej) => {
    fetch(url)
        .then(string => string.json())
        .then(obj => res(obj.name))
        .catch(() => console.log(chalk.redBright('Sorry, an error has been found, please start over.')))
})};

const startInquirer = () => {
    const sloganMsg = chalk.bgBlack.italic.cyanBright('\nCreate an atomic README; now more radioactive than ever.');
    console.log(sloganMsg);

    const fetchRepo = (inputObj) => {
        const { user , repo } = inputObj;
        const urlRepo = `https://api.github.com/repos/${user}/${repo}`;
        const spinner = createSpinner('Looking for your repo...').start();

        fetch(urlRepo)
            .then(res => {
                spinner.success();
                process.stdout.moveCursor(0, -1);
                process.stdout.clearScreenDown();
                if (res.statusText === 'Not Found') throw new Error (res.statusText)
                else return res.json()
            })
            .then(obj => {
                const { owner: { login: userGH, url: urlUserApi }, name: repoName, license } = obj;
                getProfileName(urlUserApi)
                    .then(nick => getContentFunc(userGH, repoName, license, nick))
            })
            .catch(err => {
                if (err.message === 'Not Found') {
                    process.stdout.moveCursor(0, -2);
                    process.stdout.clearScreenDown(() => console.log(chalk.redBright(`Sorry, that repo doesn\'t exist.\nPlease verify your user and repo:\n\nUser – ${user}\nRepo – ${repo}`)));
                    setTimeout(askRepoFunc, 2000);
                }
            })
    };

    const askRepoFunc = () => {
        inquirer
            .prompt([
                {
                    type: 'input',
                    message: 'Let\'s get started with your GitHub username:\n',
                    name: 'user',
                },
                {
                    type: 'input',
                    message: 'Now your repo\'s name:\n',
                    name: 'repo',
                }
            ])
            .then(res => fetchRepo(res))
    };

    const triggerFunc = () => {
        inquirer
            .prompt(
                {
                    message: chalk.cyan('Press ENTER to begin...'),
                    name: 'enterKey'
                }
            )
            .then(() => {
                process.stdout.moveCursor(0, -2);
                process.stdout.clearScreenDown(askRepoFunc);
            })
    };

    triggerFunc();
}

const startUpFunc = () => {
    let startMsg = chalk.bold.dim('\xa0README Reactor');
    const startFx = chalkAnimation.glitch(startMsg);
    let startFxTwo;
    let startFxThree;
    
    setTimeout(() => {
        startMsg = chalk.bold.dim('\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa02.0');
        startFx.stop();
        process.stdout.moveCursor(0, -1);
        process.stdout.clearScreenDown(() => {
            startFxTwo = chalkAnimation.glitch(startMsg);
        });
    }, 2000);
    
    setTimeout(() => {
        startMsg = chalk.bold.dim('\xa0README Reactor 2.0');
        startFxTwo.stop();
        process.stdout.moveCursor(0, -1);
        process.stdout.clearScreenDown(() => {
            startFxThree = chalkAnimation.glitch(startMsg);
        });
    }, 3000);
    
    setTimeout(() => {
        startFxThree.stop();
        process.stdout.moveCursor(0, -1);
        process.stdout.clearScreenDown(() => console.log(startMsg));
    }, 5000);
    
    setTimeout(() => startInquirer(), 6000);
};

const readyFunc = () => {
    startUpFunc();
};

readyFunc();