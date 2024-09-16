import { useEffect } from "react";
import { toast } from "react-toastify";
import { useRecoilState, useSetRecoilState } from "recoil";
import { authState, selectContactAtom, userAtom } from "../store/store";
import { isLoggedIn } from "../utils/auth";
import { jwtDecode } from "jwt-decode";

export function useAuth() {
  const [auth, setAuth] = useRecoilState(authState);
  const [user, setUser] = useRecoilState(userAtom);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const res = isLoggedIn(token)
        .then(() => {
          setAuth(true);
          const decoded = jwtDecode(token);
          setUser(decoded);
        })
        .catch((e) => {
          console.log(e);
        });

      toast.promise(res, {
        pending: "Authenticating......",
        success: "Welcome Back 🎉",
        error: "Register/Login to continue",
      });
    }
  }, []);

  return auth;
}
