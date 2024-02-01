<template>
  <div
    class="bg-[#4070f4] h-screen w-full flex flex-col items-center justify-center"
  >
    <div class="mb-5 text-white text-2xl">
      <h1>TaskManagement</h1>
    </div>
    <div
      class="h-40 bg-white flex gap-5 rounded-md shadow-lg shadow-orange-200 items-center justify-center p-5 w-[400px]"
    >
      <NuxtLink to="/login"
        ><button class="bg-blue-500 p-3 text-white rounded-md w-[100px]">
          Login
        </button></NuxtLink
      >
      <NuxtLink to="/register">
        <button class="bg-blue-500 p-3 text-white rounded-md w-[100px]">
          SignUp
        </button>
      </NuxtLink>
    </div>
  </div>
</template>
