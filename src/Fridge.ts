import Magnet from "./Magnet";
import consts from "./consts";

export class Fridge {
  Magnets: Magnet;
  count: number;
  current: number;
  name: string;
  label: HTMLDivElement = document.querySelector("#f-name");
  constructor(name: string) {
    this.name = name;
    this.label.innerText = this.name;
    consts.root.style.setProperty("--overlay-display", "none");
  }
}
