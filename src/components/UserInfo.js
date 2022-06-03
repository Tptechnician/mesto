export class UserInfo {
  constructor({name, activity}){
    this._profileName = name;
    this._profileActivity = activity;
  };

  getUserInfo() {
    const data = {
      name: this._profileName.textContent,
      activity: this._profileActivity.textContent
    };
    return data;
  };

  setUserInfo(data) {
    this._profileName.textContent = data.inputname;
    this._profileActivity.textContent = data.inputactivity;
  };
};