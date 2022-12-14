import { defineStore } from "pinia";
import * as d3 from "d3";

export const useAppleTreeStore = defineStore("appleTree", {
  state: () => ({
    shacking: false,
    playing: false,
    appleIsGround: false,
    appleSize: { width: 40, height: 40 },
    xPosValue: [],
    yPosValue: [],
    svg: [],
    basketSvg: [],
  }),
  getters: {
    shackingStatus: (state) => state.shacking,
    playingStatus: (state) => state.playing,
    appleIsGroundStatus: (state) => state.appleIsGround,
    svgData: (state) => state.svg,
    basketSvgData: (state) => state.basketSvg,
  },
  actions: {
    setPlayingStatus(status) {
      this.playing = status;
      sessionStorage.setItem("playing", status);
    },
    setShackingStatus(status) {
      this.shacking = status;
      sessionStorage.setItem("shacking", status);
    },
    setAppleIsGroundStatus(status) {
      this.appleIsGround = status;
      sessionStorage.setItem("appleIsGround", status);
    },
    randomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    // xPos for basket
    xPos(i) {
      const minBasketX = 22; 
      const offset = 25;
      if (i < 5) {
        return minBasketX + i * offset;
      }  
      if (i < 10) {
        return minBasketX + (i - 5) * offset;
      }
      return minBasketX + (i - 5) * offset;
    },
    // yPos for basket
    yPos(i) {
      const basketFirstLine = 52;
      const basketSecondLine = 30;
      if (i < 5) {
        return basketFirstLine;
      } else if (i < 10) {
        return basketSecondLine;
      } 
      return (basketFirstLine + basketSecondLine) / 2;
    },

    // Tree Random Seed xPos
    treeXPos(i) {
      if (this.yPosValue[i] < 40) {
        return this.randomInt(920, 950);
      }
      if (this.yPosValue[i] < 90) {
        return this.randomInt(750, 1050);
      }
      if (this.yPosValue[i] < 130) {
        return this.randomInt(690, 1200);
      }
      if (this.yPosValue[i] < 190) {
        return this.randomInt(650, 1230);
      }
      if (this.yPosValue[i] < 285) {
        return this.randomInt(650, 1250);
      } 
      if(this.yPosValue[i] < 340) {
        return this.randomInt(750, 1150);
      }
      return this.randomInt(750, 1150);
    },
    // Tree Random Seed yPos
    treeYPos(i) {
      const max = 340;
      const min = 30;
      this.yPosValue.push(this.randomInt(min, max));
      return this.yPosValue[i];
    },
    treeApple() {
      const imgUrl = new URL("../assets/simple-apple.svg", import.meta.url)
        .href;
      for (let i = 0; i < 15; i++) {
        const tree_apple = d3
          .select("#apples")
          .append("svg:image")
          .attr("xlink:href", imgUrl)
          .attr("width", this.appleSize.width)
          .attr("height", this.appleSize.height)
          .attr("y", this.treeYPos(i))
          .attr("x", this.treeXPos(i));
        this.svg.push(tree_apple);
      }
    },
    basketApple() {
      const imgUrl = new URL("../assets/simple-apple.svg", import.meta.url)
        .href;
      for (let i = 0; i < 10; i++) {
        const basket_apple = d3
          .select("#basket_apples")
          .append("svg:image")
          .attr("xlink:href", imgUrl)
          .attr("width", this.appleSize.width)
          .attr("height", this.appleSize.height)
          .attr("x", this.xPos(i))
          .attr("y", this.yPos(i));
        this.basketSvg.push(basket_apple);
      }
    },
    dropDownApples() {
      for (let i = 0; i < this.svg.length; i++) {
        this.svg[i]
          .transition()
          .attr("y", 850)
          .duration(1000)
          .delay(d3.randomInt(1000, 2000));
      }
      setTimeout(() => {
        this.setAppleIsGroundStatus(true);
      }, 3000);
    },
  },
});
