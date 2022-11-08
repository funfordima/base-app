export enum PhoneValidatorsEnum {
  // Note: all possible turkish cell phone numbers
  // (050|066|063|093|068|098|097|099|095)
  // (530-539)(561)(540 - 549)(500 - 509)(550 - 559)
  // 212 216 222 224 226 228 232 236 242 246 248 252 256 258 262 264 266 272 274 276 282 284 286 288
  // 312 318 322 324 326 328 332 338 342 344 346 348 352 354 356 358 362 364 366 368 370 372 374 376 378 380 382 384 386 388 392
  // 412 414 416 422 424 426 428 432 434 436 438 442 446 452 454 456 458 462 464 466 472 474 476 478 482 484 486 488 000
  // RegEx for phone inputs with country code. Use this if requirements will change:
  // D2CPhonePattern = '((90)(2|3|4|0)([0-9]){1}(2|4|6|8|0)([0-9]){7})|((90)(5)(0|3|4|5|6)([0-9]){8})|((380)(5|6|9)(0|3|5|6|7|8|9)([0-9]){7})',
  // RegEx without country code:
  D2CPhonePattern = '((2|3|4|0)([0-9]){1}(2|4|6|8|0)([0-9]){7})|((5)(0|3|4|5|6)([0-9]){8})|((0|3|5|6|7|8|9)([0-9]){7})',
}
