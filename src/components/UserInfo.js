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

  setUserInfo(name, activity) {
    this._profileName.textContent = name;
    this._profileActivity.textContent = activity;
  };
};