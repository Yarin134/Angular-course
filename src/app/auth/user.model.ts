
export class User {

    constructor( 
           public email: string  ,
           public id : string ,
           private _token:string ,
           private _tokenExpired:Date) {}

            public get token() {
                if(!this._tokenExpired || new Date > this._tokenExpired) {
                    return null;
                }
                return this._token
            }

            public set token(token:string) {
                this._token = token;
            }
        }

        // for the response coming back from the server