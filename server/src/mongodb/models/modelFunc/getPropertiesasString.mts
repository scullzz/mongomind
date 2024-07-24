function getPropertiesAsString(arrayStr:string[]):string {
    arrayStr.pop();
    const propertiesString = arrayStr.join(' ');

    return propertiesString;
}


export default getPropertiesAsString;