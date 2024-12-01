import type { IApiConfig } from "./"
export default{
    codeItem:{
        url:'/api',
        root:'VITE_APP_BASE_API_BASE',
        data:{}as {id:string}
    }
} satisfies IApiConfig