<template>
  <div
    class="bg-[#4070f4] h-screen w-full flex flex-col items-center justify-center"
  >
    <div
      class="h-max w-max bg-white flex flex-col items-center justify-center p-16 rounded-md"
    >
      <h1
        class="flex justify-start w-full underline decoration-2 decoration-[#4070f4] underline-offset-4 mb-3"
      >
        Registration
      </h1>
      <div class="flex flex-col gap-5">
        <input
          type="text"
          placeholder="Enter your name"
          v-model="userData.name"
          class="border-2 shadow-md p-2"
        />

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
        <input
          type="password"
          placeholder="Confirm your password"
          v-model="userData.conformPassword"
          class="border-2 shadow-md p-2"
        />
      </div>
      <div class="flex items-center justify-center gap-2 mt-3">
        <input
          type="checkbox"
          v-model="userData.isChecked"
          class="border-none"
        />

        <p class="text-[14px]">I accept all terms & conditions</p>
      </div>
      <div
        v-if="emailExists"
        class="fixed top-0 transition text-red-600 shadow-sm h-fit w-fit bg-white p-2 rounded-md"
      >
        <p>Email already exist</p>
      </div>
      <button
        class="h-fit w-fit bg-[#4070f4] text-white p-2 m-3"
        @click="store()"
      >
        Register Now
      </button>

      <div class="flex items-center justify-center">
        <p>Already have an accout?</p>
        <NuxtLink to="/login" class="text-blue-500"> <p>login</p></NuxtLink>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      emailExists: false,
      userData: {
        name: "",
        email: "",
        password: "",
        conformPassword: "",
        isChecked: false,
      },
    };
  },
  methods: {
    store() {
      if (
        this.userData.name != "" &&
        this.userData.email != "" &&
        this.userData.password != "" &&
        this.userData.conformPassword != "" &&
        this.userData.isChecked != false
      ) {
        //  = 1;
        if (
          this.userData.password == this.userData.conformPassword &&
          this.userData != " "
        ) {
          this.$http
            .$post("/auth/register", {
              body: {
                ...this.userData,
              },
            })
            .then((res) => {
              console.log(res);
              if (res.success) {
                this.$router.push("/login");
              } else {
                this.userData.email = " ";
                this.emailExists = true;
              }
            });
        } else {
          alert("Password mismatch");
        }
      } else {
        alert("Please Enter a Information ");
      }
    },
  },
};
</script>
