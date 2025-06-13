export const getTableStyle = () => {
  const ua = window.navigator.userAgent
  if (/android/i.test(ua)) {
    return "320px"
  }
  else if ((/iPad|iPhone|iPod/.test(ua)) || (window.navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) {
    return "345px"
  } else {
    return "160px"
  }
}