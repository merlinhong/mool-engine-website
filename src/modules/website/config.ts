
export default {
  pages: [
    
    {
      path: "/photo",
      component: () => import("./photo/photographyStudioHomePage.vue"),
    },
    {
      path: "/code1",
      component: () => import("./demo/code1.vue"),
    },
    {
      path: "/ball",
      component: () => import("./ball/ball")
    }
  ],
};