export default function mdReactor (inputObj) {
    const { name, slogan, desc, urlRepo, resrc, usage, demo, start, credits } = inputObj;
    const mdContent = `
# ${name}
${slogan}

## **ABOUT THE PROJECT**
**Overview**

${desc}

Find the repo [here](${urlRepo}).

## Table of Contents
- [Resources](#resources)
- [Usage](#usage)
- [Get Started](#get-started)
- [License](#license)
- [Credits](#credits)

## Resources
${resrc}

## Usage
${usage}
${demo}

## Get Started
${start}

## License
![GitHub](https://img.shields.io/github/license/Rod-Freedom/C4-The_Hall_of_Ideas?style=for-the-badge)<br>
See the [license](https://github.com/Rod-Freedom/C4-The_Hall_of_Ideas/blob/main/LICENSE) for more details.

## Credits
${credits}
`;

return mdContent;
};