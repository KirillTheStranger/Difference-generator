const jsonResult1 = `{
 + another: extra line
   extra: line
 - follow: false
 + follow: true
   host: gotta be same
 - proxy: 123.234.53.22
   timeout: 50
}`;

const jsonResult2 = `{
 - another: extra line
 - extra: line
 - follow: true
 - host: gotta be same
 - timeout: 50
}`;

const jsonResult3 = `{

}`;

const yamlResult4 = `{
 + another: extra line
   extra: line
 - follow: false
 + follow: true
   host: gotta be same
   proxy: 123.234.53.22
 - timeout: 80
 + timeout: 50
}`;

const yamlResult5 = `{
 - another: extra line
 - extra: line
 - follow: true
 - host: gotta be same
 - proxy: 123.234.53.22
 - timeout: 50
}`;

const yamlResult6 = `{

}`;

export {
  jsonResult1, jsonResult2, jsonResult3, yamlResult4, yamlResult5, yamlResult6,
};
