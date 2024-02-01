<template>
  <div class="bg-[#4070f4] h-screen w-full flex items-center justify-center">
    <div
      class="h-max w-max bg-white flex flex-col items-center justify-center p-16 rounded-md"
    >
      <h1
        class="flex justify-start w-full underline decoration-2 decoration-[#4070f4] underline-offset-4 mb-3"
      >
        Login
      </h1>
      <div class="flex flex-col gap-5">
        <input
          type="email"
          placeholder="Enter your email"
          v-model="userData.email"
          class="border-2 shadow-md p-2"
        />
        <input
          type="password"
          placeholder="Enter your password"
          v-model="userData.password"
          class="border-2 shadow-md p-2"
        />
      </div>

      <button
        class="h-fit w-fit bg-[#4070f4] text-white p-2 m-3"
        @click="signIn()"
      >
        Sign in
      </button>
      <div class="flex items-center justify-center gap-2">
        <p>Register?</p>
        <NuxtLink to="/register" class="text-blue-500"><p>signUp</p></NuxtLink>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userData: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    signIn() {
      if (this.userData.name != "" && this.userData.password != "") {
        this.$http
          .$post("/auth/login", {
            body: {
              ...this.userData,
            },
          })
          .then((res) => {
            console.log(res);
            if (res.success) {
              this.$router.push("/");
            }
          });
      } else {
        alert("Please enter a Email or password");
      }
    },
  },
};
</script>
