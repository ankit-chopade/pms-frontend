
export class StorageService {

    

    public static setSessionDetails(res: string): void {

        let token = res.split(":")[0]
        let userId = res.split(":")[1]
        let roleId = res.split(":")[2]
        sessionStorage.setItem('token', token.trim())
        sessionStorage.setItem('userId', userId.trim())
        sessionStorage.setItem('roleId', roleId.trim())

       
    }

    
}