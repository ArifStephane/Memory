<template>
  <!-- Modal -->
  <div
    class="modal"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    style="display: none"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content modale">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Partie terminée</h5>
        </div>
        <div class="modal-body">Nombre de tentative: {{ nbrTentatives }}</div>
        <div class="modal-footer">
          <button type="button" @click="fermer" class="btn btn-success">
            OK
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="fluider content-card">
    <!-- <div
      class="
        d-flex
        flex-row flex-wrap
        justify-content-center
        text-lg-start
        p-1
        mx-auto
      "
    > -->
    <div class="grid__container">
      <div
        class="carde"
        v-for="(el, index) in pairesImages"
        :key="index"
        :data-id="el.id"
        @click.self="rotate"
      >
        <div class="h-100 card_front">
          <img class="img-thumbnail" :src="el.img" alt="Photo" />
        </div>
      </div>
    </div>

    <div class="p-1 mt-3 text-center">
      <span
        class="border border-dark d-inline-block border-1 p-2 rounded me-2 mb-2"
        >Tentatives : {{ nbrTentatives }}
      </span>
      <span
        class="border border-dark d-inline-block border-1 p-2 rounded me-2 mb-2"
        >Paires trouvées : {{ pairesTrouver }} / {{ pairesTotal }}
      </span>
      <button
        @click="recommencer"
        disabled
        class="btn btn-danger ms-1 p-2 d-inline-block"
        id="recommencer"
      >
        <i class="bx bx-loader-alt p-2"></i>
      </button>
    </div>
    <div class="my__link">
      Copyright &#169;
      <a
        class="link__twitter"
        href="https://www.twitter.com/arifstephane"
        target="_blank"
        rel="noopener noreferrer"
      >
        Arif Stephane</a
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        require("@/assets/img/memory/img1.jpg"),
        require("@/assets/img/memory/img4.jpg"),
        require("@/assets/img/memory/img6.jpg"),
        require("@/assets/img/memory/img7.jpg"),
        // require("@/assets/img/memory/img9.jpg"),
        // require("@/assets/img/memory/img5.jpg"),
      ],
      pairesTotal: 4,
      pairesImages: [],
      nbrTentatives: 0,
      paires: [],
      pairesTrouver: 0,
      timestamp: 0,
      timer: null,
      startTimer: false,
    };
  },
  methods: {
    // changeMode() {
    //   // Si on check l'input on ajoute dark mode sinon on supprime
    //   const body = document.querySelector("body");
    //   if (document.querySelector("input[type=checkbox]").checked === true) {
    //     //mise a jour du local storage
    //     localStorage.setItem("dark-mode", true);
    //     body.classList.toggle("dark-mode");
    //   } else {
    //     // Supprime le localStorage de dark-mode
    //     localStorage.removeItem("dark-mode");
    //     body.classList.remove("dark-mode");
    //   }
    // },
    melange() {
      let createPaires = [];
      for (let i = 0; i < this.images.length; i++) {
        createPaires.push(
          { id: i, img: this.images[i] },
          { id: i, img: this.images[i] }
        );
      }
      this.pairesImages = createPaires.sort(() => 0.5 - Math.random());
    },
    rotate(e) {
      this.startTimer = true;
      // Retourner une carte quand on clique
      document.querySelector("#recommencer").removeAttribute("disabled");
      if (this.paires.length < 2) {
        e.target.classList.toggle("rotate");
        this.paires.push(e.target);
        // Si on tourne deux fois une carte le nombre de tentative augmente
        if (this.paires.length === 2) {
          this.nbrTentatives++;
          // this.paires[0].dataset.iderifier si les deux cartes ouvertes sont les même
          if (this.paires[0].dataset.id === this.paires[1].dataset.id) {
            this.pairesTrouver++;
            this.paires = [];
          } else {
            setTimeout(() => {
              this.paires[0].classList.remove("rotate");
              this.paires[1].classList.remove("rotate");
              this.paires = [];
            }, 600);
          }
        }
      }
      if (this.pairesTrouver === this.pairesTotal) {
        clearInterval(this.timer);
        document.querySelector("#recommencer").innerHTML =
          '<i class="bx bx-loader-alt p-2"></i>';
        document.querySelector("#exampleModal").style.display = "block";
      }
    },
    recommencer(e) {
      (this.nbrTentatives = 0), (this.pairesTrouver = 0);
      this.timestamp = 0;
      e.target.setAttribute("disabled", "");
      clearInterval(this.timer);
      this.reset();
      this.melange();
    },
    reset() {
      Array.from(document.querySelectorAll(".carde")).forEach((card) => {
        card.classList.remove("rotate");
      });
    },
    fermer() {
      document.querySelector("#exampleModal").style.display = "none";
      document.querySelector("#recommencer").click();
    },
  },
  mounted() {
    this.melange();
    //  verifie si le localStorage dark-mode existe pour garder le mode sombre ou non
    // if (localStorage.getItem("dark-mode")) {
    //   document.querySelector("body").classList.toggle("dark-mode");
    //   document.querySelector("input[type=checkbox]").checked = true;
    // }
  },
};
</script>

<style scoped>
.content-card {
  height: 100vh !important;
}

.my__link {
  text-align: center;
  margin-top: 1.5rem;
}
.rotate {
  transform: rotateY(180deg);
}

.grid__container {
  max-width: 860px;
  width: 99%;
  height: auto;
  margin: 0.25rem auto;
  display: grid;
  grid-template-columns: repeat(2, 110px);
  justify-content: center;
  gap: 5px;
}

.carde {
  width: 110px;
  height: 110px;
  background-color: rgb(26, 14, 49);
  border: 1px solid rgb(26, 14, 49) !important;
  cursor: pointer;
  border-radius: 0.25rem;
  padding: 0;
  transform-style: preserve-3d;
  transition: 0.3s all ease-in-out;
}

.card_front {
  backface-visibility: hidden;
  cursor: default;
  transform: rotateY(180deg);
}

.img-thumbnail {
  border: none !important;
  background-color: rgb(26, 14, 49);
  width: 110px;
  height: 110px;
  object-fit: cover;
}

/* @media (max-width: 550px) {
  .grid__container {
    grid-template-columns: repeat(2, 110px);
  }

  .img-thumbnail {
    width: 110px;
    height: 110px;
  }

  .carde {
    width: 110px;
    height: 110px;
  }
} */

@media (min-width: 860px) {
  .grid__container {
    grid-template-columns: repeat(4, 210px);
  }

  .img-thumbnail {
    width: 210px;
    height: 210px;
  }

  .carde {
    width: 210px;
    height: 210px;
  }
}

@media (max-width: 860px) {
  
  .grid__container{
      grid-template-columns: repeat(2, 135px);
  }

  .img-thumbnail{
  width: 135px;
  height: 135px;
  }

  .carde {
  width: 135px;
  height: 135px;
  }
  
}
</style>