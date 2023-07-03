const sharp = require('sharp');

class VMImage{
  constructor(){
    this.hasData = false;

    this.default = null;
    this.selected = null;
    this.transparent = null;
  }

  editor( type ){
    let buff = null;

    if(type == 'default')
      buff = this.default;
    else if(type == 'selected')
      buff = this.selected;
    else if(type == 'transparent')
      buff = this.transparent;
    else
      throw new Error('Unknown type');

    buff = Buffer.from(buff, 'base64');
    return sharp(buff);
  }

  getRawBitmap( type ){
    let buff = null;

    if(type == 'default')
      buff = this.default;
    else if(type == 'selected')
      buff = this.selected;
    else if(type == 'transparent')
      buff = this.transparent;
    else
      throw new Error('Unknown type');

    buff = Buffer.from(buff, 'base64');
    return buff;
  }
}

module.exports = VMImage;