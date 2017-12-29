import herobg from "./meteor.jpg";

let s = {
  hero: {
    backgroundImage: `url(${herobg})`,
    backgroundRepeat: "none",
    backgroundSize: "cover",
  },
  title: {
    fontFamily: "Proxima Nova",
    fontWeight: "900",
    textTransform: "uppercase",
    fontSize: "3.7em",
  },
  sub: {
    fontFamily: "Proxima Nova",
    fontWeight: "",
    textTransform: "",
    fontSize: "1.05em",
  },
  btn: {
    backgroundColor: "#C24966",
    fontFamily: "Proxima Nova",
    border: "none",
    padding: "18px",
    color: "white",
    width: "175px",
    borderRadius: "30px",
    cursor: "pointer"
  },
      btnHover: {
        backgroundColor: "red",
      },

  modal: {
    position: "fixed",
    zIndex: "2",
  },

  modalFull: {
    position: "fixed",
    zIndex: "3",
  },

    modalBG: {
      backgroundColor: "rgba(10, 10, 10, 1)",
    },

    modalCard: {
      borderRadius: "5px",
    },

    modalTitle: {
      fontWeight: "900",
    },

    modalInput: {
      height: "55px",
      boxShadow: "none",
    },

    modalBtn: {
      fontFamily: "Proxima Nova",
      width: "100%",
      padding: "20px",
      color: "white",
      backgroundColor: "#C24966",
      border: "none",
      cursor: "pointer",
      borderRadius: "3px",
    },

  beta: {
    position: "absolute",
    zIndex: "3",
    fontFamily: "Proxima Nova",
    fontWeight: "900",
    textTransform: "uppercase",
    color: "red",
    opacity: "0.8",
    paddingLeft: "",
  },
  termsSub: {
    color: "grey",
    fontSize: ".8em",
  },
  noFocus: {
    outline: "none"
  },
  nunito: {
    fontFamily: "nunito",
  }
}

export default s;
