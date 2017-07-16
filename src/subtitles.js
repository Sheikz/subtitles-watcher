const OS = require('opensubtitles-api');
const _ = require('lodash');
const http = require('http');
const fs = require('fs');
const zlib = require('zlib');
const utils = require('./utils.js');
const config = require('./config');

const OpenSubtitles = new OS({
    useragent: 'test'
});

let token;

async function getToken(){
    if (token)
        return token;

    let login = await OpenSubtitles.login();
    token = login.token;
    return token;
}

async function downloadSub(path, language = config.subtitles.language){
    
    let filename = utils.getFilename(path);
    console.log("Searching subtitles for "+filename+"...");
    let search = await OpenSubtitles.api.SearchSubtitles(await getToken(), [{tag: utils.getFilename(path), sublanguageid: language}]);
    let i = 1;
    _.forEach(search.data, result => {
        if (i > config.subtitles.maxFiles)
            return;
        let link = result.SubDownloadLink;
        downloadFile(link, utils.replaceExtension(path, language, i++));
    })
}

function downloadFile(url, target){

    if (!config.subtitles.replace && fs.existsSync(target)){
        console.log(`File ${target} already exists. Stop`);
        return;
    }

    let extension = utils.getExtension(url);
    http.get(url, res => {
        let gunzip = zlib.createGunzip();
        let buffer = [];
        res.pipe(gunzip);

        gunzip.on('data', data => buffer.push(data.toString()));
        gunzip.on('end', () => {
            console.log('writing file', target);
            fs.writeFileSync(target, buffer.join(""))
        });
    })
}

module.exports = {
    downloadSub : downloadSub
}