import * as consts from "./consts";
import * as tinymce from "tinymce";
export default class Magnet {
  private fridgeName: string;
  public id: number = -1;
  private x: number;
  private y: number;
  private xOffset: number;
  private yOffset: number;
  private xresize: number;
  private yresize: number;
  private isDragged: boolean;
  private isResized: boolean;
  private height: number;
  private width: number;
  public zIndex: number;
  private text: string;
  public element: HTMLDivElement;
  private deleteButton: HTMLDivElement;
  private resizeButton: HTMLDivElement;
  private editButton: HTMLDivElement;
  private textSpan: HTMLParagraphElement;
  private handler: Function;
  private renderHandler: Function;
  constructor(
    fridgeName: string,
    count: number,
    renderHandler: Function,
    options?: consts.MagnetOpt
  ) {
    if (options) {
      this.id = parseInt(options.id);
      this.x = parseInt(options.x);
      this.y = parseInt(options.y);
      this.height = parseInt(options.height);
      this.width = parseInt(options.width);
      this.zIndex = parseInt(options.zIndex);
      this.text = options.text;
      this.fridgeName = fridgeName;
    } else {
      this.x = 150;
      this.y = 200;
      this.width = 250;
      this.height = 250;
      this.zIndex = count;
      this.text = "aaaaaa";
      this.fridgeName = fridgeName;

      this.addToDatabase();
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
    this.editButton = document.createElement("div");
    this.editButton.className = "edit-btn";
    this.textSpan = document.createElement("p");
    this.textSpan.className = "text-span";
    this.textSpan.id = "text-span" + this.id;

    document.querySelector(".main").appendChild(this.element);
    this.element.appendChild(this.textSpan);
    this.element.appendChild(this.editButton);
    this.element.appendChild(this.deleteButton);
    this.element.appendChild(this.resizeButton);
    this.renderHandler = renderHandler;
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
      if (this.isDragged || this.isResized) this.saveToDatabase();
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
        this.deleteFromDatabase();
        this.element.remove();
        this.handler();
        this.renderHandler();
      }
    });
    this.editButton.addEventListener("click", () => {
      consts.root.style.setProperty("--tinymce-display", "flex");
      tinymce.activeEditor.setContent(this.text, { format: "html" });
      const saveBtn = document.querySelector("#save-tiny") as HTMLDivElement;
      saveBtn.onclick = () => {
        this.text = tinymce.activeEditor.getContent();
        consts.root.style.setProperty("--tinymce-display", "none");
      };
      console.log("EDIT");
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
  saveToDatabase() {
    const dataToSend = this;
    console.log("DATA TO SEND:", dataToSend);
    fetch("../server/saveMagnet.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    });
  }
  addToDatabase() {
    const dataToSend = this;
    console.log("DATA TO SEND:", dataToSend);
    fetch("../server/addMagnet.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => response.json())
      .then((data) => (this.id = parseInt(data[0].id)));
  }
  deleteFromDatabase() {
    const dataToSend = this;
    console.log("DATA TO SEND:", dataToSend);
    fetch("../server/deleteMagnet.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    });
  }
}
