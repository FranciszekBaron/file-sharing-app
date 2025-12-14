import { FileService } from "./FileService";
import type { IFileService } from "./IFileService";
import { MockFilesService } from "./MockFileService";

import { AuthService } from ".//authService.ts";
import type { IAuthService } from "./IAuthService";
import { MockAuthService } from "./MockAuthService";

const USE_MOCK = true;
const USE_MOCK_AUTH = true;

export const filesService: IFileService = USE_MOCK ?
new MockFilesService() : new FileService();


export const authService: IAuthService = USE_MOCK_AUTH ?
new MockAuthService() : new AuthService();



export type {IFileService};