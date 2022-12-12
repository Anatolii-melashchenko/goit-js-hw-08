import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const STORAGE_KEY = 'videoplayer-current-time';

const onPlay = function (data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data.seconds));
  // data is an object containing properties specific to that event
};
player.on('timeupdate', throttle(onPlay, 1000));

const saveTime = localStorage.getItem(STORAGE_KEY);
if (saveTime) player.setCurrentTime(saveTime).then(function (seconds) {});
