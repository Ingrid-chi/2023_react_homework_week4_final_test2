export const getCookieValue = (param) => {
  const cookieValue = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${param}=`))
    ?.split('=')[1];

  return cookieValue;
};

export const clearCookieValue = () => {
  // 將 cookie 的過期日期設定為過去的日期，同時保留其他 cookie（如果有的話）
  document.cookie =
    'token=; expires=Fri, 31 Dec 1970 23:59:59 GMT; SameSite=None; Secure';
};
