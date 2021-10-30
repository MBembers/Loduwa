import * as consts from "./consts";
import { Fridge } from "./Fridge";
import * as tinymce from "tinymce";

var F: Fridge;
document.querySelector("#start").addEventListener(
  "click",
  () => {
    let name = (<HTMLInputElement>document.querySelector("#fridge-inp")).value;
    F = new Fridge(name);
  },
  { once: true }
);
console.log("halo ee aa");
tinymce.init({
  selector: "#tinymce",
});
