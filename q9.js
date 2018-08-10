const Nightmare = require('nightmare');
const nightmare = Nightmare({show: true}); // to see automation visually
nightmare
    .goto('https://www.google.com')
    .insert('#lst-ib', 'W3Schools')
    .click('#tsf > div.tsf-p > div.jsb > center > input[type="submit"]:nth-child(1)')
    .wait('#rso')
    .evaluate(() => {
        const linklist = Array.from(document.querySelectorAll('#rso > div > div > div > div > div > h3 > a'));
        return linklist.map((eachLink) => eachLink.innerText);
    })
    .end()
    .then((response) => {
        //here in the output, no link has title only 'W3Schools'.
        console.log(response); // output: [ 'W3Schools Online Web Tutorials', 'W3Schools - Wikipedia', 'w3schools.com - YouTube', 'About W3Schools', 'Get W3schools(offline Version) - Microsoft Store en-CA', 'W3Schools | Crunchbase', 'Urban Dictionary: w3schools' ]
    })
    .catch((err) => {
        console.log(err);
    });
