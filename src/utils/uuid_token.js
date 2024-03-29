import { v4 as uuidv4 } from 'uuid';

export const getUuid = () => {
    let uuid_token = localStorage.getItem('UUIDTOKEN');
    // 判断本地是否有游客信息
    if (!uuid_token) {
        uuid_token = uuidv4();
        localStorage.setItem('UUIDTOKEN', uuid_token);
    }
    return uuid_token
}