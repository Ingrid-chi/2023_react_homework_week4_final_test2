export const getCookieValue = (param) => {
  const cookieValue = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${param}=`))
    ?.split('=')[1];

  return cookieValue;
};

export const clearCookieValue = () => {
  const currentDate = new Date();

  // 將過期日期設定為過去的時間（比如一天前）
  currentDate.setHours(currentDate.getHours() - 24); // 這裡減去了 24 小時

  // 將 cookie 的過期日期設定為過去的日期，同時保留其他 cookie（如果有的話）
  document.cookie = `token=; expires=${currentDate.toUTCString()}; path=/; Secure`;
};
