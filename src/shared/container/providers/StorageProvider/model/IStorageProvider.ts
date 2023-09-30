export interface IStorageProviderDto {
    saveFile(file: string): Promise<string>;
    deleteFile(file: string): Promise<void>;
}