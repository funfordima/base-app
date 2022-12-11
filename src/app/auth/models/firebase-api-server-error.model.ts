import type { FirebaseServerErrorModel } from "./firebase-server-error.model";

export class FirebaseApiServerErrorModel {
  constructor(
    opt: Partial<FirebaseApiServerErrorModel> = {},
    public code: number = opt.code ?? 0,
    public errors: FirebaseServerErrorModel[] = opt.errors ?? [],
  ) { }
}
