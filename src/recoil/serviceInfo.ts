import { atom } from "recoil";

export const ServiceInfo = atom({
  key: "ServiceInfo",
  default: {
    type: "internal",
    internal: {
      serviceId: "G30T8KSY0J8J",
      serviceSecret: "G30T8KSY0J8JRUEG:yeGuF62C81FcV3xU",
      endpoint: "",
    },
    external: {
      serviceId: "",
      token: "",
      endpoint: "",
    },
  },
});
