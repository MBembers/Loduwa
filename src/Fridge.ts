import * as consts from "./consts";
import Magnet from "./Magnet";

export class Fridge {
  id: number = -1;
  magnets: Magnet[] = [];
  count: number;
  current: number;
  name: string;
  label: HTMLDivElement = document.querySelector("#f-name");
  addButton: HTMLDivElement = document.querySelector("#add-btn");
  counters: HTMLDivElement[] = [
    document.querySelector("#counter"),
    document.querySelector("#current"),
  ];
  constructor(name: string) {
    fetch("../server/getFridge.php?name=" + name)
      .then((res) => res.json())
      .then((data) => {
        console.log("FRIDGE DATA", data);
        if (data !== "podejrzus") {
          const fd = data[0];
          const md = data[1];
          this.id = parseInt(fd.id);
          this.name = fd.name;
          this.count = parseInt(fd.count);
          this.current = parseInt(fd.current);
          for (let magnet of md) {
            const mag = new Magnet(
              this.name,
              this.count,
              () => this.saveToDatabase(),
              magnet
            );
            mag.element.addEventListener("mousedown", (event: MouseEvent) => {
              let div = <HTMLDivElement>event.target;
              console.log(div);
              mag.zIndex = Math.max(...this.magnets.map((m) => m.zIndex)) + 1;
              mag.render();
            });
            this.magnets.push(mag);
          }
        } else {
          this.name = name;
          this.count = 0;
          this.current = 0;
        }
        this.label.innerText = this.name;
        consts.root.style.setProperty("--overlay-display", "none");

        this.addButton.addEventListener("click", () => {
          this.count++;
          let magnet = new Magnet(this.name, this.count, () =>
            this.saveToDatabase()
          );
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
          this.saveToDatabase();
          this.render();
        });

        this.current = this.magnets.length;
        const parent = document.getElementsByClassName(
          "tox-statusbar__text-container"
        )[0] as HTMLDivElement;
        console.log(parent);
        const saveButton = document.createElement("button");
        saveButton.id = "save-tiny";
        const cancelButton = document.createElement("button");
        cancelButton.id = "cancel-tiny";
        cancelButton.addEventListener("click", () => {
          consts.root.style.setProperty("--tinymce-display", "none");
        });
        parent.appendChild(saveButton);
        parent.appendChild(cancelButton);
        this.render();
        // this.saveToDatabase();
      });
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
  saveToDatabase() {
    const dataToSend = this;
    console.log("DATA TO SEND:", dataToSend);
    fetch("../server/saveFridge.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    });
  }
}
