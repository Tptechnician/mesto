export class UserInfo {
  constructor({name, activity, avatar}){
    this._profileName = name;
    this._profileActivity = activity;
    this._avatar = avatar;
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

  setUserAvatar(avatarLink) {
    this._avatar.src = avatarLink;
  };
};