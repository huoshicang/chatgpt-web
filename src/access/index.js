import router from "@/router";
import { useUserStore } from '@/stores/counter'


router.beforeEach(async (to, from, next) => {

  if (to.path === '/log') {
    next();
    return
  }

  let userStore = useUserStore();

  if (userStore.userLoinData) {

    const res = await userStore.getLoginUser()

    if (!res){
      next({path: "/log"});
      return
    }
  }

  if (to?.meta?.acccess === 'admin'){
    if (userStore.userLoinData.userRole !== 'admin'){
    next({path: "/404"})
    }
  }

  next();
});

