import {atom} from 'recoil'

export const authState = atom({
    key: 'authState',
    default: false
})

export const userAtom = atom({
    key: 'userAtom',
    default: {}
})

export const selectContactAtom = atom({
    key:'selectContactAtom',
    default: {
        username: 'Name',
        digitalNumber: '12345'
    }
})

export const contactsAtom = atom({
    key:'contactsAtom',
    default: []
})

export const messagesAtom = atom({
    key: 'messagesAtom',
    default: []
})

export const filterContactAtom = atom({
    key: 'filterContactAtom',
    default: []
})