const encoding = (str)=>{
    const alpha = "abcdefghijklmnopqrstuvwxyz";
    let n = str.length, a;
    for(let i = 0; i< n;i++){
      a = alpha.indexOf(str[i]);
      if (a >= 0) str =str.replace(str[i],alpha[25-a]);
    }
    return str;
  }
  console.log(encoding ("acpf#$#"))