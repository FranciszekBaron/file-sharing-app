import { FileService } from "./FileService";
import type { IFileService } from "./IFileService";
import { MockFilesService } from "./MockFileService";

const USE_MOCK = true;

export const filesService: IFileService = USE_MOCK ?
new MockFilesService() : new FileService();

export type {IFileService};