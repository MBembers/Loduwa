import * as consts from "./consts";
import Magnet from "./Magnet";

export class Fridge {
  magnets: Magnet[] = [];
  count: number = 0;
  current: number;
  name: string;
  label: HTMLDivElement = document.querySelector("#f-name");
  addButton: HTMLDivElement = document.querySelector("#add-btn");
  counters: HTMLDivElement[] = [
    document.querySelector("#counter"),
    document.querySelector("#current"),
  ];
  constructor(name: string) {
    this.name = name;
    this.label.innerText = this.name;
    consts.root.style.setProperty("--overlay-display", "none");
    this.addButton.addEventListener("click", () => {
      this.count++;
      let magnet = new Magnet(this.count);
      magnet.onDelete(() => this.deleteMagnet(magnet.id));
      this.magnets.push(magnet);
      console.log(magnet);
      magnet.element.addEventListener("mousedown", (event: MouseEvent) => {
        let div = <HTMLDivElement>event.target;
        console.log(div);
        magnet.zIndex = Math.max(...this.magnets.map((m) => m.zIndex)) + 1;
        magnet.render();
      });
      this.current = this.magnets.length;
      this.render();
    });

    this.current = this.magnets.length;
  }
  deleteMagnet(id: number) {
    this.magnets = this.magnets.filter((m) => m.id !== id);
    this.current = this.magnets.length;
    this.render();
  }
  render() {
    this.counters[0].innerText = String(this.count);
    this.counters[1].innerText = String(this.current);
  }
}
