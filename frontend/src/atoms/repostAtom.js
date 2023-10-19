import { atom } from 'recoil'

const repostsAtom = atom({
  key: 'repostsAtom',
  default: [],
})

export default repostsAtom
