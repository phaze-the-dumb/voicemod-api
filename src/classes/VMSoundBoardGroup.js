const VMSoundBoard = require('./VMSoundBoard');
 
class VMSoundBoardGroup extends Array{
  constructor(){ super(); }

  async init( api ){
    let { soundboards } = await api.getAllSoundboard();

    soundboards.forEach(board => {
      this.push(new VMSoundBoard(board, api));
    })

    api.on('getAllSoundboard', ( msg ) => {
      this.forEach(board => {
        let b = msg.soundboards.find(x => x.id === board.id);

        if(!b)
          this.removeInternal(board.id);
      })

      msg.soundboards.forEach(board => {
        let b = this.find(x => x.id === board.id);

        if(!b)
          return this.push(new VMSoundBoard(board, api));

        b.updateInternal(board);
      })
    })
  }

  get( i ){
    return this[i];
  }

  removeInternal( id ){
    let elementToRemove = this.indexOf(this.find(x => x.id === id));

    for(let i = elementToRemove; i < this.length; i++)
      this[i] = this[i + 1];

    this.length = this.length - 1;
  }
}

module.exports = VMSoundBoardGroup;