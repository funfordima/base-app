export class SuccessDialogModel {
  constructor(
    opt: Partial<SuccessDialogModel> = {},
    public message: string = opt.message ?? '',
    public description: string = opt.description ?? '',
    public iconSrc: string = opt.iconSrc ?? '',
    public iconAlt: string = opt.iconAlt ?? '',
    public successButtonTitle: string = opt.successButtonTitle ?? '',
    public displayHeader: boolean = opt.displayHeader ?? true,
    public dynamicComponent: unknown = opt.dynamicComponent ?? null,
  ) {}
}
