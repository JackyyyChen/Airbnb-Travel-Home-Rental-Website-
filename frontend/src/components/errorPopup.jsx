function errorPop (error) {
  const errorPopupWindow = document.getElementById('errorPopupWindow');
  const errorContent = document.getElementById('errorContent');
  errorPopupWindow.style.display = 'block';
  errorContent.innerHTML = error;
  const closePopupWindow = document.getElementById('closePopupWindow');
  closePopupWindow.addEventListener('click', () => {
    errorPopupWindow.style.display = 'none';
  });
}

window.errorPop = errorPop
export default errorPop
