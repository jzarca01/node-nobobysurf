# node-nobodysurf

API Wrapper for NobodySurf

## Installation

```shell
yarn add https://github.com/jzarca01/node-nobobysurf
```

## Usage

```javascript
const NobodySurf = require('node-nobodysurf');
const surf = new NobodySurf()
```

## Methods

### Get playlists

```javascript
surf.getPlaylists()
```

### Get playlist by Id

```javascript
surf.getPlaylistById(playlistId)
```

### Get video details

```javascript
surf.getVideoDetails(videoId)
```

### Get video URL

```javascript
surf.getVideoUrl(videoId)
```

### Get trending

```javascript
surf.getTrending()
```

### Search for a term or tags

```javascript
surf.search(searchTerm, tags = [])
```
