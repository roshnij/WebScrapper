const puppeteer = require('puppeteer');
const export_csv = require('export-csv');


const dataScrape = async () => {
    // Actual Scraping goes Here...
    const browser = await puppeteer.launch({headless: false});
    let linkresponse = null;
    try {
        const page = await browser.newPage();
        await page.setViewport({width: 1000, height: 500});
        await page.goto('https://google.com');
        await page.keyboard.type('datatables', {delay: 100}); // Types slower, like a user
        await page.keyboard.press('Enter');
        await page.waitForSelector('#rso');
    
        linkresponse = await page.evaluate((page) => {
            const links = Array.from(document.querySelectorAll('#rso > div > div > div > div > div > h3 > a'));
            const linkshref = (links.map((link) => link.getAttribute('href')));
            const tableLink = linkshref.find((h) => h == 'https://datatables.net/');
            return tableLink;
            
        });
    } finally {
        await browser.close();
    }
    return linkresponse;
};

const dataTableScrape = async (tlink) => {
    // Table Scraping goes Here...
    const browser = await puppeteer.launch({headless: false});
    let response = null;
    try {
        const page = await browser.newPage();
        await page.setViewport({width: 1000, height: 500});
        await page.goto(tlink);
        await page.waitForSelector('#example');
        
        response  = await page.evaluate(() => {
            const rowHead = Array.from(document.querySelectorAll('#example > thead > tr > th'))
            const header = (rowHead.map((cellHead) => cellHead.innerHTML));
            const rows = Array.from(document.querySelectorAll('#example > tbody > tr')); // #example > tbody > tr:nth-child(2)
            const tdata = [];
            return rows.map((row) => {
                const columns = Array.from(row.querySelectorAll('td'));
                return columns.map((column) => column.innerHTML);
            });
        });
    } finally {
        await browser.close();
    }
    return response;
    
};

const exportToCSV = (tableInfo) => {
    export_csv(tableInfo, 'table_information.csv')
};
  
dataScrape().then((link) => {
    console.log(link); 
    dataTableScrape(link).then((tableData) => {
        console.log(tableData); 
        exportToCSV(tableData);
    }, (err) => {
        console.log("Error: " + err); // Error:
    });
}, (err) => {
    console.log("Error: " + err); // Error:
});