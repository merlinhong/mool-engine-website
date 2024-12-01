<template>
    <div>
      <section class="w-full h-[250px] bg-blue-50 flex justify-evenly">
        <h2 class="flex justify-center items-center text-4xl">
          <!-- {{ list[type] }} -->
        </h2>
        <svg>
          <use xlink:href="#icon-banner" />
        </svg>
      </section>
      <!--我的插件-->
      <div class="p-4">
        <h3>我的插件</h3>
        <!--插件列表-->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 ">
          <div class="bg-white rounded-lg shadow-md flex flex-col pt-10 px-4  hover:shadow-xl  ">
            <div class="flex items-start h-[70%] ">
              <svg class="h-[80%]  w-[60%] flex-1">
                <use xlink:href="#icon-section1" />
              </svg>
              <div class="flex-1 text-left py-1 font-bold text-lg">全屏预览</div>
            </div>
            <el-divider class="!my-0 w-full" border-style="dashed"></el-divider>
            <div class="text-right flex-1">查看</div>
          </div>
          <div class="bg-white rounded-lg shadow-md flex flex-col pt-10 px-4  hover:shadow-xl  ">
            <div class="flex items-start h-[70%] ">
              <svg class="h-[80%]  w-[60%] flex-1">
                <use xlink:href="#icon-section1" />
              </svg>
              <div class="flex-1 text-left py-1 font-bold text-lg">多语言</div>
            </div>
            <el-divider class="!my-0 w-full" border-style="dashed"></el-divider>
            <div class="text-right flex-1">查看</div>
          </div>
          <div class="bg-white rounded-lg shadow-md flex flex-col pt-10 px-4  hover:shadow-xl  ">
            <div class="flex items-start h-[70%] ">
              <svg class="h-[80%]  w-[60%] flex-1">
                <use xlink:href="#icon-section1" />
              </svg>
              <div class="text-left py-1 font-bold text-lg w-fit">生成vue代码</div>
            </div>
            <el-divider class="!my-0 w-full" border-style="dashed"></el-divider>
            <div class="text-right flex-1">查看</div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts"></script>
  
  <style></style>
  