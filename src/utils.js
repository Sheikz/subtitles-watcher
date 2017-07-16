const extensionRegex = /(?:\.([^.]+))?$/;

function getExtension(file){
    return extensionRegex.exec(file)[1];
}

function replaceExtension(filename, language, number){
    return filename.replace(extensionRegex, `.${language}.${number}.srt`);
}

function getFilename(path){
    return /([^\\]+$)/.exec(path)[0];
}

module.exports = {
    getExtension: getExtension,
    replaceExtension: replaceExtension,
    getFilename: getFilename
}