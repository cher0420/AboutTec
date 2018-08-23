/**
 * 用户信息管理
 */
import Cookies from 'universal-cookie';
import URL from '../components/BaseUrl';
import emitter from '../services/events';
import * as CONSTANTS from '../constants/constants';

const cookies = new Cookies();

/**
 * detectPermissions
 */
export const detectPermissions = () => {
    const cookieData = getCookies()
    if (!cookieData) {
        validId()
    } else {
        authToken(cookieData['token'])
        return cookieData;
    }
}

//从cookie获取用户信息
export const getCookies = () => {
    let user = cookies.get(CONSTANTS.HighTalk_Market_User, { path: '/' });
    let token = cookies.get(CONSTANTS.HighTalk_Market_Token, { path: '/' });

    let HighTalk_Market = {
        user: user,
        token: token,
    }
    if (!token && !user) {
        return;
    } else {
        return HighTalk_Market;
    }
};

//验证token
export const authToken = (value) => {
    const token = decodeURIComponent(value);
    if (!token) {
        console.log('没有用户信息')
        return false;
    }
    const data = {
        Token: token,
    };
    const baseData = JSON.stringify(data)
    fetch(URL.SSOServerApi + "/api/Tenant/ValidateToken", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: baseData
    }).then(response => response.json()).then((res) => {
        if (res.Status) {
            fetchUserInfo(token)
            setTokenCookies(value)
            cookies.remove(CONSTANTS.HighTalk_Market_Sid, { path: '/' })
        } else {
            // 清除cookies
            clearCookies()
            const stateObject = {};
            const title = "index";
            const newUrl = "/";
            window.history.pushState(stateObject, title, newUrl);
            return null;
        }
    }).catch((error) => {
        return null;
        alert("网络或者服务器发生错误！");
    });
};

/**
 * fetchUserInfo
 * @param token
 * @return String
 */
export const fetchUserInfo = (token = null) => {
    fetch(URL.SSOServerApi + "/api/Tenant/GetUserInfo", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Access-Token": token,
        },
        body: null
    }).then(response => response.json()).then((res) => {
        setUserInfo(res)
    }).catch((error) => {
        console.log('请求失败', error)
        return null;
    });
}

/**
 * Set setUserInfo
 * @param value
 * @returns {*}
 */
export const setUserInfo = (value) => {
    const HighTalk_Market_User = value.UserInfo || {}
    cookies.set(CONSTANTS.HighTalk_Market_User, HighTalk_Market_User, { path: '/', maxAge: 2 * 60 * 60 })
    emitter.emit('setUser', HighTalk_Market_User);
    emitter.emit('isLogin', true)
    return HighTalk_Market_User
}

/**
 * validToken
 * @returns {string|*}
 */
export const validToken = () => {
    let str = window.location.search;
    const matchStr = str.match(/token=(\S*)&rk=/)
    str = matchStr ? matchStr[1] : null;
    if (str) {
        authToken(str)
    } else {
        clearCookies()
        return str
    }
}

/**
 * validId
 * @returns {string|*}
 */
export const validId = () => {
    let str = window.location.search;
    const matchStr = str.match(/sid=(\S*)?&token=/)
    str = matchStr ? matchStr[1] : null;
    if (str) {
        const Hightalk_Login_Id = cookies.get(CONSTANTS.HighTalk_Market_Sid)
        if (str == Hightalk_Login_Id) {
            validToken();
        } else {
            clearCookies()
            const stateObject = {};
            const title = "index";
            const newUrl = "/";
            window.history.pushState(stateObject, title, newUrl);
        }
    } else {
        return str;
    }
}

//从cookie获取用户信息
export const getUserInfo = (path) => {
    let user = cookies.get(CONSTANTS.HighTalk_Market_User, { path: '/', maxAge: 2 * 60 * 60 });
    let token = cookies.get(CONSTANTS.HighTalk_Market_Token, { path: '/', maxAge: 2 * 60 * 60 });
    if (!user && path) {
        locationChange('/zh-cn/login/index', null, path.path);
        return;
    } else {
        const data = {
            user,
            token
        }
        return data;
    }
};
/**
 *
 * @param key
 * @return String => cookies key
 * @param options
 * @return Object
 */
export const clearCookies = () => {
    cookies.remove(CONSTANTS.HighTalk_Market_User, { path: '/' });
    cookies.remove(CONSTANTS.HighTalk_Market_Token, { path: '/' });
    cookies.remove(CONSTANTS.HighTalk_Market_Sid, { path: '/' });
};

export const setTokenCookies = (value) => {
        cookies.set(CONSTANTS.HighTalk_Market_Token, JSON.stringify(value), { path: '/', maxAge: 2 * 60 * 60 });
    }
    //登出
export const logout = (token) => {
    cookies.remove(CONSTANTS.HighTalk_Market_User, { path: '/' });
    cookies.remove(CONSTANTS.HighTalk_Market_Token, { path: '/' });
    locationChange('/zh-cn/login/logout', token)
};

/**
 * SSO Login
 * @param target
 * @return String => login:'index';logout:'logout';
 * @param token
 * @return String
 */
export function locationChange(target, token = null, path = null) {
    const host = window.location.host
    let random = Math.floor(Math.random() * 1000000)
        const callbackString = path?`https://${host}/${encodeURIComponent(path)}sid=${random}`:`https://${host}/?sid=${random}`
    // const callbackString = path ? `http://localhost:3000/${encodeURIComponent(path)}?sid=${random}` : `http://localhost:3000/?sid=${random}`
    const logoutTips = token ? `&token=${token}` : ''
    const url = `${URL.SSOWebUrl}${target}?redirecturl=${callbackString}${logoutTips}`
    cookies.set(CONSTANTS.HighTalk_Market_Sid, random, { path: '/', maxAge: 2 * 60 * 60 })
    window.location.replace(url);
}
