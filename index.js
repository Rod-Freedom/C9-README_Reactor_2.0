import fs from 'fs';
import inquirer from 'inquirer';
import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';
import nanospinner from 'nanospinner';
import colors from 'colors';

const startInquirer = () => {
    const sloganMsg = chalk.italic('\nCreate an atomic README; now more radioactive than ever.');
    console.log(sloganMsg);
}

const startUpFunc = () => {
    let startMsg = chalk.bold('\xa0README Reactor');
    const startFx = chalkAnimation.glitch(startMsg);
    
    setTimeout(() => {
        startMsg = chalk.bold('\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa02.0');
        startFx.replace(startMsg);
    }, 2000);
    
    setTimeout(() => {
        startMsg = chalk.bold('\xa0README Reactor 2.0');
        startFx.replace(startMsg);
    }, 3000);
    
    setTimeout(() => {
        startFx.stop();
        process.stdout.moveCursor(0, -1);
        process.stdout.clearScreenDown(() => console.log(startMsg));
    }, 5000);
    
    setTimeout(() => startInquirer(), 6000);
};

const readyFunc = () => {
    startUpFunc();
};

readyFunc();