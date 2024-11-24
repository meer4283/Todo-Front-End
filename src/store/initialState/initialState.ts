
const initialState = {
  global: {
    isAlignmentRight: false,
    rightHandLanguges: [
      {
        key: "arabic",
        value: "arabic",
        code: "ar",
      },
      {
        key: "hebrwe",
        value: "hebrwe",
        code: "hb",
      },
      {
        key: "urdu",
        value: "urdu",
        code: "ur",
      },
    ],
    languages: [
      {
        key: 1,
        language: "English",
        type: "english",
      },
      {
        key: 2,
        language: "Urdu",
        type: "urdu",
      },
      {
        key: 3,
        language: "Hindi",
        type: "hindi",
      },
      {
        key: 4,
        language: "Arabic",
        type: "arabic",
      },
      {
        key: 5,
        language: "French",
        type: "french",
      },
      {
        key: 5,
        language: "Italian",
        type: "italian",
      },
      {
        key: 5,
        language: "Spanish",
        type: "spanish",
      },
    ],
    selectedLangugae: "english",
    toastId: null,
    showToast: false,
    toastMessage: null,
    toastDetail: null,
    toastType: "success",
    toastLife: 3000,
    // closable:true,
    sticky: false,
    //Chunk File Size Globally
    chunkFileSize: 50000,
  },

};
export default initialState;















