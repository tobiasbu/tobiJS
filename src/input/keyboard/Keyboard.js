
import DataMap from '../../structures/Map'
import DataList from '../../structures/List';
import Key from './Key'
import KeyCode from './KeyCode'
import KeyEvent from './KeyEvent'
import ProcessKeyPress from './components/ProcessKeyPress';
import ProcessKeyRelease from './components/ProcessKeyRelease';

export default class Keyboard {
  
  constructor(game) {

    this.game = game;
    this._enabled = true;
    this.eventTarget = null;
    this.eventHandler = null;
    this._eventQueue = new DataList();
    this._keyMapping = new DataMap();
    //this._keyWatch = new DataMap();
    //this._keyGarbage = [];
    this.lastKey = null;

  }

  get enabled() {return this._enabled;}
  set enabled(value) {
      value = !!value;

      if (value !== this._enabled)
      {
          if (!value)
              this.reset();

          this._enabled = value;
      }
  }

  reset() {

    this._keyMapping.clear();
    for (var prop in KeyCode){

      if (KeyCode.hasOwnProperty(prop)) {
        var value = KeyCode[prop];
        this._keyMapping.set(value, new Key(value, this.game));
      }
    }

  }

  init() {

    this.reset();

    // window;
    this.eventTarget = document; //this.game.system.render.canvas;

    var self = this;

    // key event handler
    let handler = function(event) {

      if (event.defaultPrevented) {
          return;
      }

      self._eventQueue.push(event);

      //event.preventDefault();

    }

    this.eventHandler = handler;

    this.eventTarget.addEventListener('keydown', handler, false);
    this.eventTarget.addEventListener('keyup', handler, false);
  }

  stop() {

    this.eventTarget.removeEventListener('keydown', this.eventHandler);
    this.eventTarget.removeEventListener('keyup', this.eventHandler);
    this._onKeyDown = null;
    this._onKeyUp = null;
    this._onKeyPress = null;

    this._keyMapping.clear();
  }

  update() {

    let eventSize = this._eventQueue.size;

    if (!this._enabled || eventSize === 0)
      return;

    // clear and copy queue
    let queue = this._eventQueue.splice(0,eventSize);

    // process key events
    for (let i = 0; i < eventSize; i++) {
      var event = queue[i];
      var keycode = event.keyCode;

      // check if is valid scintilla key
      let key = this._keyMapping.get(keycode)

      if (key !== undefined || key !== null) {

        if (event.type === 'keydown') {

          // /*&& (this._keyMapping.at(keycode) === undefined || this._keyMapping[keycode].press === false)*/
          ProcessKeyPress(event, key);

        } else { // if (event.type === 'keyup') {
          ProcessKeyRelease(event, key);
        }

      }
    }
  }

  pressed(keycode) {
    return this._keyMapping.get(keycode).isPressed();
  }

  release(keycode) {
    return this._keyMapping.get(keycode).isReleased();
  }

  press(keycode) {
    return this._keyMapping.get(keycode).status;
  }
}

 

   /* this._keyWatch.each(function (key, value) {
        //var value = this._keyWatch.get(key);
        value.update();

        //console.log(value);

        if (value.event == KeyEvent.IDLE)
        {
            self._keyGarbage.push(key);
        }
    });

      if (this._keyGarbage.length > 0)
      {
        this._keyWatch.deleteByIndexedArray(this._keyGarbage);
        this._keyGarbage.splice(0, this._keyGarbage.length)
      }*/