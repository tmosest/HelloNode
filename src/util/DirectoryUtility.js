const fs = require('fs');
const FileUtility = require('./FileUtility');
/**
 * Class to list folders and files from directories.
 */
class DirectoryUtility {
    /**
     * Function to read all the file / folders in a directory.
     * @param path Folder path as a string.
     * @returns {Promise}  Promise containing ls information.
     */
    readAll(path) {
        console.debug('DirectoryUtility->readFolders called!');
        let files = fs.readdirSync(path);
        console.debug('DirectoryUtility->readFolders files ' + files);
        return files;
    }
    /**
     * Function to read all the folders in a given path.
     * @param path Folder path as a string.
     * @returns {Promise} Promise containing only folders.
     */
    readFolders(path) {
        console.debug('DirectoryUtility->readFolders called!');
        let files = this.readAll(path);
        if(!files) return false;
        files = FileUtility.filterOutFiles(files);
        console.debug('DirectoryUtility->readFolders: files ' + files);
        return files;
    }
}
// Create an instance.
const directoryUtility = new DirectoryUtility();
// Export it.
module.exports = directoryUtility;
