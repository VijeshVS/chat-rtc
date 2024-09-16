import { useEffect } from "react";
import { toast } from "sonner";
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
        loading: "Authenticating......",
        success: "Welcome Back 🎉",
        error: "Register or Login to continue",
        classNames: {
          error: "bg-red-400",
          success: "text-green-900 bg-slate-100",
          warning: "text-yellow-400",
          info: "bg-blue-400",
        },
      });
    }
  }, []);

  return auth;
}
