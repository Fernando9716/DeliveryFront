import {Rol} from  './Rol';

export interface User{
        id?:                 string;
        name:               string;
        lastname:           string;
        email:              string;
        phone:              string;
        password:           string;
        confirmPassword:    string;
        accessToken?:       string;
        refreshToken?:      string;
        roles?:             Rol[];
}