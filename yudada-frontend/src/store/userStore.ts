import { defineStore } from "pinia";
import { ref } from "vue";
import { getLoginUserUsingGet } from "@/api/userController";
import ACCESS_ENUM from "@/access/accessEnum";

export const useLoginUserStore = defineStore("loginUser", () => {
  const loginUser = ref<API.LoginUserVO>({
    userName: "未登录",
  });

  function saveLoginUserToLocalStorage() {
    localStorage.setItem("loginUser", JSON.stringify(loginUser.value));
  }

  function getLoginUserFromLocalStorage(): API.LoginUserVO | undefined {
    const userStr = localStorage.getItem("loginUser");
    return userStr ? JSON.parse(userStr) : undefined;
  }

  async function fetchLoginUser() {
    const res = await getLoginUserUsingGet();
    if (res.data.code === 0 && res.data.data) {
      loginUser.value = res.data.data;
    } else {
      loginUser.value = { userRole: ACCESS_ENUM.NOT_LOGIN };
    }
    saveLoginUserToLocalStorage();
  }

  function setLoginUser(newLoginUser: API.LoginUserVO) {
    loginUser.value = newLoginUser;
    saveLoginUserToLocalStorage();
  }

  // 在页面加载时尝试从本地存储中获取登录用户信息
  const storedLoginUser = getLoginUserFromLocalStorage();
  if (storedLoginUser) {
    loginUser.value = storedLoginUser;
  }

  return { loginUser, setLoginUser, fetchLoginUser };
});
