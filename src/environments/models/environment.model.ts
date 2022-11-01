import { EnvironmentsNameEnum } from "../constants/environments-name.enum";

export class EnvironmentModel {
  constructor(
    opt: Partial<EnvironmentModel> = {},
    public name: EnvironmentsNameEnum = opt.name ?? EnvironmentsNameEnum.Dev,
    public version: string = opt.version ?? '',
  ) { }
}
