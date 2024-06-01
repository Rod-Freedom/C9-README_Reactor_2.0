export default class ReadmeObj {
    constructor(user, repo, license, nick, { title, slogan, desc, resrc, usage, demo, start, credits }) {
        this.repo = repo
        this.user = user
        this.nick = nick
        this.license = license
        this.urlRepo = `https://github.com/${this.user}/${this.repo}`
        this.urlUser = `https://github.com/${this.user}`
        this.urlLicense = license ? `https://github.com/${this.user}/${this.repo}/blob/main/LICENSE` : ''
        this.licenseText = license ? `See the [license](${this.urlLicense}) for more details.` : ''
        this.title = title
        this.slogan = slogan
        this.desc = desc
        this.resrc = resrc
        this.usage = usage
        this.demo = demo === 'yes' ? true : false
        this.start = start
        this.credits = credits
        this.userCredit = `Developed by [${nick}.](${this.urlUser})`
    }
}

export function mdReactor ({ user, repo, title, slogan, desc, urlRepo, urlLicense, licenseText, resrc, usage, demo, start, credits, userCredit }) {
    let resrcString = '';
    resrc.forEach((res, index) => {
        if (index > 0) resrcString+=`\n* ${res}`
        else resrcString+=`* ${res}`
    });
    
    const mdContent = `
<h3 align="center">${title}</h3>

<p align="center"><i>${slogan}</i></p>

<p align="center">
<a href="${urlLicense}"><img src="https://img.shields.io/github/license/${user}/${repo}?style=for-the-badge" alt="License"></a>
</p>

<br>
<br>

## **ABOUT THE PROJECT**
**Overview**

${desc}

Find the repo [here](${urlRepo}).
<br>
<br>

## Table of Contents
- [Resources](#resources)
- [Get Started](#get-started)
- [Usage](#usage)
- [License](#license)
- [Credits](#credits)

<br>

[(Back to the Top)](#about-the-project)

## Resources
${resrcString}

<br>

[(Back to the Top)](#about-the-project)

## Get Started
${start}

<br>

[(Back to the Top)](#about-the-project)

## Usage
${usage}
${demo}

<br>

[(Back to the Top)](#about-the-project)

## License
![GitHub](https://img.shields.io/github/license/${user}/${repo}?style=for-the-badge)<br>
${licenseText}

<br>

[(Back to the Top)](#about-the-project)

## Credits
${userCredit}<br>
${credits}

<br>

[(Back to the Top)](#about-the-project)

<br>
<br>
<br>

____

Markdown generated with **[README Reactor 2.0](https://github.com/Rod-Freedom/C9-README_Reactor_2.0)**
`;

return mdContent;
};