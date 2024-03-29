export const concatErrors = (err_res: any) => {
  const errs = err_res?.data?.data;
  // //console.log("errs === ",err_res?.data?.message)
  if (errs && Object.keys(errs).length > 0) {
    const err_key = Object.keys(errs);
    // //console.log("errs keys",err_key)
    let err_str = "";
    err_key.forEach((key) => {
      err_str +=
        " - " + key + ":" + errs[key].message;
      ("");
    });
    return err_str;
  }
  if (err_res?.data?.message) {
    return err_res?.data?.message;
  }
  if (err_res.message) return err_res.message;

  return err_res;
};


export const syntheticDelay = (sec:number) => new Promise(res => setTimeout(res, sec * 1000));
