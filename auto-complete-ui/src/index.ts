import {createAutoComplete} from '../../auto-complete/index';
import {array} from "./cities";

const body = document.querySelector("body") as HTMLBodyElement;
const input = document.createElement("input") as HTMLInputElement;
input.placeholder = "Enter the word to search";
body.append(input);
const container = document.createElement("ul") as HTMLUListElement;
body.append(container);

const autocomplete = createAutoComplete(array);
const wordsOnPage = 10;

const load = dataWrapper(wordsOnPage);

function displayHtml(array:(string)[]) {
  for (let i = 0; i < array.length; i++) {
    const li = document.createElement("li") as HTMLLIElement;
    li.textContent = array[i];
    container.append(li);
  }
}

function firstLoad():void {
  let array = [...autocomplete(input.value)];
  container.innerHTML = '';
  load.updateData(array);
  displayHtml(load.next());
  if(!input.value) {
    container.innerHTML = '';
  }
}

function dataWrapper(wordsOnPage: number) {
    let arr: Array<string> = [];
    let startIndex = 0;
    return {
        updateData: function(data: Array<string>): void {
            startIndex = 0;
            arr = data;
        },
        next: function(): Array<string> {
            let result = arr.slice(startIndex, startIndex + wordsOnPage);
            startIndex += wordsOnPage;
            return result;
        } 
    }
}

input.addEventListener("input", firstLoad);

container.addEventListener('scroll', function() {
    if (container.scrollTop + container.clientHeight + 100 >= container.scrollHeight) {
        displayHtml(load.next());
    }
});
