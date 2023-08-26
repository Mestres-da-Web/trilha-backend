export interface IHashProviderDto {
    generateHash(param: string): Promise<string>
    compareHash(param: string, hash: string): Promise<boolean>
}