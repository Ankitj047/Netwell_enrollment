import axios from "axios";
import configurations from "../../configurations";
import { isEdge, isSafari, isChrome, isFirefox, isIE, isOpera } from 'react-device-detect'
const publicIp = require('public-ip');


export const passwordCheck = {

    chechForNumbers: (string) => {
        var matches = string.match(/\d+/g);
        let value = matches != null ? true : false;
        return value;

    },

    checkForUpperCase: (string) => {
        var matches = string.match(/[A-Z]/);
        let value = matches != null ? true : false;
        return value;

    },

    checkForLowerCase: (string) => {
        var matches = string.match(/[a-z]/);
        let value = matches != null ? true : false;
        return value;
    },

    checkForSymbols: (string) => {
        var symbols = new RegExp(/[^A-Za-z0-9]/);
        let value = symbols.test(string) ? true : false
        return value;
    },

    checkPwdLength: (string) => {
        let value = string.length > 7 ? true : false;
        return value;
    }
}

export const getQueryParams = () => {
    let url = window.location.href;
    let queryObj = {}
    let userCred = JSON.parse(sessionStorage.getItem('USER_CRED'));
    if (url.split('login?').length > 1) {
        let queryString = url.split('login?')[1];
        let queryParams = new URLSearchParams(queryString)
        if (queryParams.has('u') && queryParams.has('p')) {
            let userName = decodeURI(queryParams.get('u'));
            let password = decodeURI(queryParams.get('p'));
            queryObj = { u: userName, p: password }
        } else if (queryParams.has('username') && queryParams.has('password')) {
            let userName = decodeURI(queryParams.get('username'));
            let password = decodeURI(queryParams.get('password'));
            queryObj = { u: userName, p: password }
        }
    } else if (userCred && userCred.u && userCred.p) {
        queryObj = { u: userCred.u, p: userCred.p }
    }
    return queryObj;
}

export const getPublicIP = async () => {
    let ipv4 = await publicIp.v4();
    sessionStorage.setItem('PUBLIC-IP', ipv4);
}

export const getBrowser = () => {
    //const currDate = "Current Date= "+date;
    var browser;

    console.log(isEdge);
    console.log(isSafari);

    if (isEdge) {
        browser = "Edge";
    } else if (isSafari) {
        browser = "Safari";
    } else if (isChrome) {
        browser = "Google Chrome"
    } else if (isFirefox) {
        browser = "Mozilla Firefox"
    } else if (isOpera) {
        browser = "Opera"
    } else if (isIE) {
        browser = "Internet Exploder"
    }

    /*if (navigator.userAgent.indexOf("Chrome") != -1) {
        browser = "Google Chrome";
    }
    // FIREFOX
    else if (navigator.userAgent.indexOf("Firefox") != -1) {
        browser = "Mozilla Firefox";
    }
    // INTERNET EXPLORER
    else if (navigator.userAgent.indexOf("MSIE") != -1) {
        browser = "Internet Exploder";
    }
    // EDGE
    else if (navigator.userAgent.indexOf("Edg") != -1) {
        browser = "Edge";
    }
    // SAFARI
    else if (navigator.userAgent.indexOf("Safari") != -1) {
        browser = "Safari";
    }
    // OPERA
    else if (navigator.userAgent.indexOf("Opera") != -1) {
        browser = "Opera";
    }
    // YANDEX BROWSER
    else if (navigator.userAgent.indexOf("Opera") != -1) {
        browser = "YaBrowser";
    }*/
    // OTHERS
    else {
        browser = "Others";
    }
    return browser
}
export const getDeviceType = () => {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        // some code..
        return "mobile";
    }
    else {
        return "computer";
    }
}

export const getOs = () => {
    var userAgent = window.navigator.userAgent,
        platform = window.navigator.platform,
        macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
        windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
        iosPlatforms = ['iPhone', 'iPad', 'iPod'],
        os = null;

    if (macosPlatforms.indexOf(platform) !== -1) {
        os = 'Mac OS';
    } else if (iosPlatforms.indexOf(platform) !== -1) {
        os = 'iOS';
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
        os = 'Windows';
    } else if (/Android/.test(userAgent)) {
        os = 'Android';
    } else if (!os && /Linux/.test(platform)) {
        os = 'Linux';
    }
    return (os);

}

export const getDateTime = () => {
    var tempDate = new Date();
    var year = tempDate.getFullYear();
    var month = "" + (tempDate.getMonth() + 1);
    var day = "" + tempDate.getDate();
    var hour = "" + tempDate.getHours();
    var minute = "" + tempDate.getMinutes();
    var seconds = "" + tempDate.getSeconds();
    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    if (hour.length < 2)
        hour = '0' + hour;
    if (minute.length < 2)
        minute = '0' + minute;
    if (seconds.length < 2)
        seconds = '0' + seconds;
    let timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    var dateTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + seconds;
    return ({ dateTime: dateTime, timeZone: timeZone });
}

export const saveLogin = (email, screen) => {
    let os = getOs();
    let device = getDeviceType();
    let browser = getBrowser();
    let time = getDateTime();

    console.log('===================== login Details ==========================');

    let obj = {
        email: email,
        ipAddress: sessionStorage.getItem('PUBLIC-IP'),
        os: os,
        device: device,
        browser: browser,
        timestamp: time.dateTime,
        timezone: time.timeZone,
        subId: screen
    }
    console.log(obj);

    axios.post(configurations.baseUrl + '/enrollment/saveLoginDetails', obj)
        .then(response => {
        })
}


export const getTokenForAuthentication = () => {
    let request = {
        "username": "admin",
        "password": "testpass"
    }
    if (configurations.isProd) {
        request.password = "x1TXVUtXL6PaBWam"
    }
    return axios.post(configurations.authenticationURL + "v1/login", request, true)
    // let token = response['headers'].authorization || '';

    // return 'sdf'
}