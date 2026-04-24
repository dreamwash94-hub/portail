
const DW_PASSWORD = "931314";
function checkLogin() {
  const pwd = document.getElementById('login-pwd').value;
  if (pwd === DW_PASSWORD) {
    localStorage.setItem('dw_auth', btoa(DW_PASSWORD + '_' + new Date().toDateString()));
    document.getElementById('login-screen').style.display = 'none';
  } else {
    document.getElementById('login-error').style.display = 'block';
    document.getElementById('login-pwd').value = '';
    document.getElementById('login-pwd').focus();
  }
}
const auth = localStorage.getItem('dw_auth');
const expected = btoa(DW_PASSWORD + '_' + new Date().toDateString());
if (auth === expected) document.getElementById('login-screen').style.display = 'none';
document.getElementById('login-pwd').focus();
