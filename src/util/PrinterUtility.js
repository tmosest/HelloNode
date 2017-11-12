const DirectoryUtility = require('./DirectoryUtility');
const configuration = require('../config/DirectoryConfiguration');
/**
 * Printer Utility class.
 */
class PrinterUtility {
    /**
     * Function to get the path the Public directory.
     */
    getPublicDirectory() {
        return configuration.PUBLIC;
    }
    /**
     * Function to get the path to the Printed Directory.
     */
    getPrintedDirectory() {
        return configuration.PRINTED;
    }
    /**
     * Function to get the path to the Printing Directory.
     */
    getPrintingDirectory() {
        return configuration.PRINTING;
    }
    /**
     * Function to determine what the name for the next queued up file should be.
     * Example Q7.
     */
    getNextQFileName() {
        let printingFiles = DirectoryUtility.readAll(this.getPrintingDirectory());
        console.log(printingFiles);
        // If we only have one or less files then we know that we can just enqueue the next one as Q1.
        if(printingFiles.length <= 1)
            return 'Q1.png';
        // File names should be sorted so we skip the first in progress one.
        let highest = 1;
        for(let i = 1; i < printingFiles.length; i++) {
            // Get the number
            let pngIndex = printingFiles[i].lastIndexOf('.png');
            // We start at 1 to remove Q and end at pngIndex to remove .png
            let number = printingFiles[i].substr(1, pngIndex);
            // Now we type cast to an Integer and increment by one.
            number = parseInt(number) + 1;
            // Now we try to set highest to number
            highest = (number > highest) ? number : highest;
        }
        return 'Q' + highest + '.png';
    }
}

const printerUtility = new PrinterUtility();

module.exports = printerUtility;