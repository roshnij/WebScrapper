const puppeteer = require('puppeteer');
const export_csv = require('export-csv');


let dataScrape = async () => {
    // Actual Scraping goes Here...
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.setViewport({width: 1000, height: 500})
    await page.goto('https://google.com');
    await page.keyboard.type('datatables', {delay: 100}); // Types slower, like a user
    await page.keyboard.press('Enter');
    await page.waitFor(1000);
    await page.click('#rso > div:nth-child(1) > div > div > div > div > h3 > a'); // to click the first link of the result
    await page.waitFor(1000);
    
    const response  = await page.evaluate(() => {
        const rowHead = Array.from(document.querySelectorAll('#example > thead > tr > th'));
        const header = (rowHead.map((cellHead) => cellHead.innerHTML));
        const rows = Array.from(document.querySelectorAll('#example > tbody > tr')); // #example > tbody > tr:nth-child(2)
        const tdata = [];
        rows.forEach((row) => {
            const cols = Array.from(row.querySelectorAll('td'));
            const colsData = {};
            for(let i = 0; i < cols.length;i++){
                colsData[header[i]] = cols[i].innerHTML;
            }
            tdata.push(colsData);
        }); 
        return tdata; // return the whole array of objects with col data as object properties
    });
    await browser.close();
    return response;
};

const exportToCSV = (tableInfo) => {
	export_csv(tableInfo, 'table_information.csv') 
};
  
dataScrape().then((tableData) => {
    console.log(tableData); 
    exportToCSV(tableData);
}, function(err) {
    console.log("Error: " + err); // Error:
});