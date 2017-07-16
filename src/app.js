const sub = require('./subtitles.js');
const chokidar = require('chokidar');
const config = require('./config');

// Video file formats https://en.wikipedia.org/wiki/Video_file_format
const videoExtensions = "(yuv|wmv|webm|vob|svi|roq|rmvb|rm|ogv|ogg|nsv|mxf|mpg|mpeg|m2v|mpg|mp2|mpeg|mpe|mpv|mp4|m4p|m4v|mov|qt|mng|mkv|m4v|gifv|gif|flv|f4v|f4p|f4a|f4bflv|drc|avi|asf|amv|3gp|3g2)";

let dir = process.argv[2] || config.watch.dir;
let dirHumanName = (dir === '.' ? 'current folder' : dir);
console.log('Watching files in '+dirHumanName+'...');

chokidar.watch(`${dir}/**/*.${videoExtensions}`).on('all', handleEvent);

function handleEvent(event, path){
    if (event === 'add')
        sub.downloadSub(path);
}