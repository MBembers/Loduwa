import * as consts from "./consts";
export default class Magnet {
  id: number;
  x: number;
  y: number;
  xOffset: number;
  yOffset: number;
  xresize: number;
  yresize: number;
  isDragged: boolean;
  isResized: boolean;
  height: number;
  width: number;
  zIndex: number;
  text: string;
  element: HTMLDivElement;
  deleteButton: HTMLDivElement;
  resizeButton: HTMLDivElement;
  textSpan: HTMLSpanElement;
  handler: Function;
  constructor(id: number, options?: consts.MagnetOpt) {
    if (options) {
      this.id = id;
      this.x = options.x;
      this.y = options.y;
      this.height = options.height;
      this.width = options.width;
      this.zIndex = options.zIndex;
      this.text = options.text;
    } else {
      this.id = id;
      this.x = 150;
      this.y = 200;
      this.width = 250;
      this.height = 250;
      this.zIndex = id;
      this.text = "essa";
    }
    this.element = document.createElement("div");
    this.element.className = "magnet";
    this.element.style.top = this.y + "px";
    this.element.style.left = this.x + "px";
    this.element.style.width = this.width + "px";
    this.element.style.height = this.height + "px";
    this.deleteButton = document.createElement("div");
    this.deleteButton.className = "del-btn";
    this.resizeButton = document.createElement("div");
    this.resizeButton.className = "res-btn";
    this.textSpan = document.createElement("span");
    this.textSpan.className = "text-span";

    document.querySelector(".main").appendChild(this.element);
    this.element.appendChild(this.textSpan);
    this.element.appendChild(this.deleteButton);
    this.element.appendChild(this.resizeButton);

    this.render();
    this.addListeners();
  }
  onDelete(listener: Function) {
    this.handler = listener;
  }
  addListeners() {
    this.element.addEventListener("mousedown", (event: MouseEvent) => {
      // event.preventDefault();
      this.element.style.backgroundColor = "lightyellow";
      this.xOffset = event.clientX - this.x;
      this.yOffset = event.clientY - this.y;
      if (!this.isResized) this.isDragged = true;

      console.log("DOWN");
    });
    document.addEventListener("mouseup", (event: MouseEvent) => {
      this.isDragged = false;
      this.isResized = false;
      this.element.style.backgroundColor = "white";
      console.log("UP");
    });
    document.addEventListener("mousemove", (event: MouseEvent) => {
      event.preventDefault();
      // console.log(event);
      if (this.isDragged) {
        this.x = event.clientX - this.xOffset;
        this.y = event.clientY - this.yOffset;

        if (this.x < 10) this.x = 10;
        if (this.y < 10) this.y = 10;
        if (this.x > window.innerWidth - this.width - 10)
          this.x = window.innerWidth - this.width - 10;
        if (this.y > window.innerHeight - this.height - 10)
          this.y = window.innerHeight - this.height - 10;
      }
      if (this.isResized) {
        this.width = event.clientX - this.xresize + 3;
        this.height = event.clientY - this.yresize + 3;
      }
      this.render();
    });

    this.resizeButton.addEventListener("mousedown", (event: MouseEvent) => {
      this.isResized = true;
      this.xresize = this.x;
      this.yresize = this.y;
      this.render();
    });
    this.deleteButton.addEventListener("click", () => {
      console.log(this.handler);
      if (this.handler) {
        console.log("DELETE");
        this.element.remove();
        this.handler();
      }
    });
  }
  render() {
    if (this.element) {
      this.element.style.top = this.y + "px";
      this.element.style.left = this.x + "px";
      this.element.style.width = this.width + "px";
      this.element.style.height = this.height + "px";
      this.element.style.zIndex = String(this.zIndex);
      this.textSpan.innerHTML = this.text;
    }
  }
}
