/**
 * Created by jiachenpan on 16/11/18.
 */

// export function isvalidUsername(str) {
//   const valid_map = ['admin', 'editor']
//   return valid_map.indexOf(str.trim()) >= 0
// }

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}


/**
 * 判断是否为整数
 */
export function validateInt(num) {
   let regName = /[^\d]/g;
    if (!regName.test(num)) {
      return false;
    }

  return true;
}
/**
 * 判断是否为小数
 */
export function validateDouble(num) {
  let regName = /[^\d.]/g;
  if (!regName.test(num)) {
    return false;
  }
  return true;
}

/**
 * 判断是否为空
 */
export function validateNull(val) {
  if (val instanceof Array) {
    if (val.length == 0) return true;
  } else if (val instanceof Object) {
    if (JSON.stringify(val) === '{}') return true;
  } else {
    if (val == 'null' || val == null || val == 'undefined' || val == undefined || val == '') return true;
    return false;
  }
  return false;

}


export function createRules(item) {
    let rules = [];
    if(item.required){
      rules.push({ required: true, message: '该输入项为必填项!', trigger: 'blur' });
    }
    if(item.min){
      rules.push({ min:1,max:item.maxLength, message: '最多输入'+item.maxLength+'个字符!', trigger: 'blur' })
    }
    if(item.min&&item.max){
      rules.push({ min:item.min,max:item.max, message: '字符长度在'+item.min+'至'+item.max+'之间!', trigger: 'blur' })
    }
    if(item.type){
      let type = item.type;
      switch(type) {
        // case 'email':
        //   rules.push({ type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change'  });
        //   break;
        // case 'qq':
        //   rules.push( { validator: isvalidateQQ, trigger: 'blur,change' });
        //   break;
        // case 'mobile':
        //   rules.push( { validator: isvalidateMobile, trigger: 'blur,change' });
        //   break;
        // case 'regexn':
        //   rules.push( { validator: isvalidateRegexn, trigger: 'blur,change' });
        //   break;
        case 'integer':
          rules.push({ type:'integer', message: '必须是整数',trigger: 'blur' });
          break;
        default:
          rules.push({});
          break;
      }
    }
    return rules;
}



