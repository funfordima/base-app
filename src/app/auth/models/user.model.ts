export class UserModel {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpDate: Date | null,
  ) { }

  get token(): string | null {
    const currentDate = new Date();
    const tokenExpDate = this._tokenExpDate ? new Date(this._tokenExpDate) : new Date();
    const isTokenExpired = currentDate.getTime() > tokenExpDate.getTime();

    if (!this._tokenExpDate || isTokenExpired) {
      return null;
    }

    return this._token;
  }
}
