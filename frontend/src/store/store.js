import { atom, selector, useRecoilValueLoadable } from "recoil";

export const authState = atom({
  key: "authState",
  default: false,
});

export const userAtom = atom({
  key: "userAtom",
  default: {},
});

export const selectContactAtom = atom({
  key: "selectContactAtom",
  default: {
    username: "Name",
    digitalNumber: "12345",
  },
});

export const contactsAtom = atom({
  key: "contactsAtom",
  default: selector({
    key: "contactsDefaultSelector",
    get: ({ get }) => {
      const username = get(userAtom).username;
      let localContacts = JSON.parse(localStorage.getItem("contacts"));

      if (!localContacts) {
        localContacts = {};
      }

      if (!localContacts[username]) {
        localContacts[username] = [];
      }

      if (username)
        localStorage.setItem("contacts", JSON.stringify(localContacts));

      return localContacts[username];
    },
  }),
});

export const messagesAtom = atom({
  key: "messagesAtom",
  default: [],
});

export const filterContactAtom = atom({
  key: "filterContactAtom",
  default: [],
});

export const groupChatAtom = atom({
  key: "groupChatAtom",
  default: false,
});

export const messagesLoadingAtom = atom({
  key: "messagesLoadingAtom",
  default: false,
});

export const unReadMessagesAtom = atom({
  key: "unReadMessagesAtom",
  default: {},
});
