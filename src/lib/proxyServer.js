
export const getProxyServer = () => {
    //테스트서버  211.201.31.134
    //레미안에스티지서버   211.36.9.36

    let result = window.proxyServer === undefined ? '211.201.31.134' : window.proxyServer;
    return result;
}

export const getVerNumber = () => {
    let result = window.verNumber === undefined ? '1.0' : window.verNumber;
    return result;
}

export const getUpdateDate = () => {
        let result = window.updateDate === undefined ? '2018.01.04' : window.updateDate;
        return result;

}