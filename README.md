# subtitles-watcher
A node command line tool to recursively watch folders and automatically download subtitles for movies
## Getting started
Clone the repository and install
```
git clone https://github.com/Sheikz/subtitles-watcher.git [Installation folder]
cd [Installation folder]
npm install
```
Watch the current folder
```
npm start
```
Watch a target folder
```
npm start [Target folder]
```

## Configuration
config/config.json contains the configuration parameters:

### subtitles
* `maxFiles`: Maximum of subtitles files to download
* `language`: Language ids in which to download the subtitles. Can be an array of languages (example: 'eng,dut,cze')
* `replace`: Replace subtitles destination files if existing?
### watch
* `dir`: The folder in which to watch if no folder is specified by command line
* `recursive`: Watch in subfolders or not
