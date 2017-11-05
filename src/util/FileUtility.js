/**
 * Utility function for dealing with files
 */
class FileUtility {
    /**
     * Function to filter files out of an array of file / folder names
     * @param files An array of file / folder names
     * @returns {Array} An array of folder names
     */
    filterOutFiles(files) {
        let filteredFiles = [];
        for(let i = 0; i < files.length; i++) {
            const fileName = files[i];
            if(fileName.lastIndexOf('.') === -1)
                filteredFiles.push(fileName);
        }
        return filteredFiles;
    }
    /**
     * Function to filter non image files out of an array of file and folder name
     * @param files
     * @returns {Array}
     */
    filterOutNonImages(files) {
        let filteredFiles = [];
        for(let i = 0; i < files.length; i++) {
            const fileName = files[i];
            const ext = fileName.substr(fileName.lastIndexOf('.') + 1).toLowerCase();
            switch (ext) {
                case 'jpg':
                case 'jpeg':
                case 'gif':
                case 'png':
                case 'svg':
                    filteredFiles.push(fileName);
            }
        }
        return filteredFiles;
    }
}
// Create an instance to export
const fileUtility = new FileUtility();
// Export the instance
module.exports = fileUtility;
