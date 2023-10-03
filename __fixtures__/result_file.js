const result1 = `{
 + another: extra line
   extra: line
 - follow: false
 + follow: true
   host: gotta be same
 - proxy: 123.234.53.22
   timeout: 50
}`;

const result2 = `{
 - another: extra line
 - extra: line
 - follow: true
 - host: gotta be same
 - timeout: 50
}`;

const result3 = `{

}`;

export { result1, result2, result3 };
