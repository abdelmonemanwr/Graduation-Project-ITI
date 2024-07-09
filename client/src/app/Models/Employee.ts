export interface Employee {
    id:string
    fullName : String
    userName : String | null
    email : String 
    phone : String
    password : String
    branchId : number | null
    branchName : string | null
    roles : string[] | null
    status : boolean
    isDeleted : boolean

}