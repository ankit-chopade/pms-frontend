
export class StorageService {



    public static setSessionDetails(res: any): void {
        sessionStorage.setItem('token', res.token)
        sessionStorage.setItem('userId', res.userDetails.userId)
        sessionStorage.setItem('roleId', res.userDetails.roleId)
        sessionStorage.setItem('emailId', res.userDetails.emailId)
        sessionStorage.setItem('firstName', res.userDetails.firstName)
        sessionStorage.setItem('lastName', res.userDetails.lastName)
        sessionStorage.setItem('title', res.userDetails.title)
        
    }


}