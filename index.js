var Promise = require('bluebird');
require('./lib/pdf.js');
require('./lib/compatibility.js');

function PDFtoText(input) {
    return new Promise(function (resolve, reject) {
        PDFJS.getDocument(input).then((pdfDocument) => {
            for (let pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {
                pdfDocument.getPage(pageNum).then((page) => {
                    page.getTextContent().then((textContent) => {
                        let pageText = [];
                        textContent.items.forEach((textItem) => {
                            pageText.push(textItem.str);
                        });
                        pageText.join(' ');

                        docText[pageNum] = pageText;
                        if (Object.keys(docText).length === pdfDocument.numPages) {
                            // we are done
                            let docArr = [];
                            for (pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {
                                docArr.push(docText[pageNum]);
                            }
                            let text = docArr.join('\n\n');
                            resolve(text);
                        }
                    });
                });
            }
        });
    });
};

module.exports = PDFtoText;
