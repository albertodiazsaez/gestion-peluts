export class MessageErrors {

    static getMessageError(errorCode: number): string {
        let result: string = '';
        switch (errorCode) {
            case 409:
                result = 'Este elemento ya existe'
                break;
            
            default:
                break;
        }

        return result;
        
    }
}