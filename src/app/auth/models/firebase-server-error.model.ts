import { AuthErrorCodeEnum } from "../constants/auth-error-code.enum";

export class FirebaseServerErrorModel {
  constructor(
    opt: Partial<FirebaseServerErrorModel> = {},
    public domain: string = opt.domain ?? 'global',
    public message: AuthErrorCodeEnum = opt.message ?? AuthErrorCodeEnum.SOMETHING_WENT_WRONG,
    public reason: string = opt.reason ?? 'invalid',
  ) { }
}
