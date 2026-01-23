import * as runtime from "@prisma/client/runtime/client";
import * as $Class from "./internal/class.js";
import * as Prisma from "./internal/prismaNamespace.js";
export * as $Enums from './enums.js';
export * from "./enums.js";
/**
 * ## Prisma Client
 *
 * Type-safe database client for TypeScript
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export declare const PrismaClient: $Class.PrismaClientConstructor;
export type PrismaClient<LogOpts extends Prisma.LogLevel = never, OmitOpts extends Prisma.PrismaClientOptions["omit"] = Prisma.PrismaClientOptions["omit"], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = $Class.PrismaClient<LogOpts, OmitOpts, ExtArgs>;
export { Prisma };
/**
 * Model User
 *
 */
export type User = Prisma.UserModel;
/**
 * Model Ward
 *
 */
export type Ward = Prisma.WardModel;
/**
 * Model Route
 *
 */
export type Route = Prisma.RouteModel;
/**
 * Model RouteAssignment
 *
 */
export type RouteAssignment = Prisma.RouteAssignmentModel;
/**
 * Model SurveySession
 *
 */
export type SurveySession = Prisma.SurveySessionModel;
/**
 * Model Issue
 *
 */
export type Issue = Prisma.IssueModel;
/**
 * Model IssueAssignment
 *
 */
export type IssueAssignment = Prisma.IssueAssignmentModel;
/**
 * Model IssueResolution
 *
 */
export type IssueResolution = Prisma.IssueResolutionModel;
//# sourceMappingURL=client.d.ts.map