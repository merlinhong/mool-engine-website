# openmool
开源mool产品
# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).


import {useStore,useLoading,useRefs,useEffect,useStorage,useRoute,useRouter,useService,createWebHashHistory,createWebHistory,createSearchParams,useSearchParams
,type IConfig, IRootKeys, IUrlConfig, createServiceWithModules
} from 'mool'
南京/苏州麦林科技有限公司
import {Components,Service,Vue,VueJsx,AutoImport,Eslint,} '@mool/plugin-base'
import {ElementPlusResolver,AntDesignResolver,Icons,IconsResolver} from '@mool/plugin-resolver'
import{Svgo,Federation,Seo,} from "@mool/plugin-max"

export default{
 tailwind:{},
 proxy:{
 },
 routes:[],
 mock:true,
// 默认配置自动导入
 autoImport:{
      imports:[
    	'vue',
	'vue-router',
          	{
                 "@/service/index": ["service"]
	}
      ],
      resolvers: [ElementPlusResolver()],
      components:{
        resolvers: [ElementPlusResolver()]
      },
      // 按需导入
      optimize:true
 },
 plugin:[],
 css:{},
 alias:{},
 rollupOptions:{},
 define:{},
 devtool:true,
 warmup:{
     clientFiles:['src/components/**/*.vue','src/pages/pushTaskManager/components/**/*.vue']
 },
 optimizeDeps:{},
 svgo:{},
 seo:{},
 federation:{},
 minify:'',
 outDir:'',
 terserOptions:'',
 lintOnSave:true,
}
// eslintrc.js
extend:['@mool/eslint']

路由，vite配置，eslint、微前端、请求库、测试、图表、国际化，权限、loading
