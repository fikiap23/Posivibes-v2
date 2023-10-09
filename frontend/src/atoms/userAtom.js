import { atom } from 'recoil'

// Membuat fungsi untuk mendapatkan data pengguna dari localStorage
const getUserDataFromLocalStorage = () => {
  const userPosivibesData = JSON.parse(localStorage.getItem('user-posivibes'))
  return userPosivibesData ? userPosivibesData.data : null
}

// Membuat atom dengan nilai default yang diambil dari localStorage
const userAtom = atom({
  key: 'userAtom',
  default: getUserDataFromLocalStorage(),
})

export default userAtom
