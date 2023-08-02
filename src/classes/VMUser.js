class VMUser{
  constructor(){
    this.id = null;
    this.accountType = null;
  }

  async processInternal( api ){
    this.id = (await api.getUser()).userId;
    this.accountType = (await api.getUserLicense()).licenseType;
  }
}

module.exports = VMUser;