import { AlertType } from '../enums/AlertType.enum';

export interface Alert {
    type: AlertType;
    message: string;
}
