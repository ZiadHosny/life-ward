import { useLazyCreateGuestUserQuery } from "./gestUserApi";

export default function useGuestUserToken() {
  const [getGuestUser] = useLazyCreateGuestUserQuery();
  const calledGetGuestUser = (state) => {
    if(state){

      getGuestUser().then(({ data }) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
        }
      });
    }
  };
  return calledGetGuestUser;
}
