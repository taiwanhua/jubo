// import type { ClassConstructor } from "class-transformer";
// import { plainToInstance } from "class-transformer";
// import type { ValidationError } from "class-validator";
// import { validateOrReject } from "class-validator";
// import type { NextFunction, Request, Response } from "express";
// import { HttpException } from "@exceptions/httpException";

// /**
//  * validationMiddleware
//  * @remarks - Allows use of decorator and non-decorator based validation
//  * @param type - dto
//  * @param skipMissingProperties - When skipping missing properties
//  * @param  whitelist - Even if your object is an instance of a validation class it can contain additional properties that are not defined
//  * @param forbidNonWhitelisted - If you would rather to have an error thrown when any non-whitelisted properties are present
//  */
// export const validationMiddleware = <Dto>(
//   type: Dto,
//   skipMissingProperties = false,
//   whitelist = false,
//   forbidNonWhitelisted = false,
// ) => {
//   return (req: Request, _res: Response, next: NextFunction) => {
//     const dto = plainToInstance(type as ClassConstructor<Dto>, req.body);
//     validateOrReject(dto as ClassConstructor<Dto>, {
//       skipMissingProperties,
//       whitelist,
//       forbidNonWhitelisted,
//     })
//       .then(() => {
//         req.body = dto;
//         next();
//       })
//       .catch((errors: ValidationError[]) => {
//         const message = errors
//           .map((error: ValidationError) =>
//             Object.values(error.constraints ?? {}),
//           )
//           .join(", ");
//         next(new HttpException(400, message));
//       });
//   };
// };
