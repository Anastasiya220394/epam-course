"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var index_1 = require("../../auto-complete/index");
var cities_1 = require("./cities");
var body = document.querySelector("body");
var input = document.createElement("input");
input.placeholder = "Enter the word to search";
body.append(input);
var container = document.createElement("ul");
body.append(container);
var autocomplete = (0, index_1.createAutoComplete)(cities_1.array);
var wordsOnPage = 10;
var load = dataWrapper(wordsOnPage);
function displayHtml(array) {
    for (var i = 0; i < array.length; i++) {
        var li = document.createElement("li");
        li.textContent = array[i];
        container.append(li);
    }
}
function firstLoad() {
    var array = __spreadArray([], autocomplete(input.value), true);
    container.innerHTML = '';
    load.updateData(array);
    displayHtml(load.next());
    if (!input.value) {
        container.innerHTML = '';
    }
}
function dataWrapper(wordsOnPage) {
    var arr = [];
    var startIndex = 0;
    return {
        updateData: function (data) {
            startIndex = 0;
            arr = data;
        },
        next: function () {
            var result = arr.slice(startIndex, startIndex + wordsOnPage);
            startIndex += wordsOnPage;
            return result;
        }
    };
}
input.addEventListener("input", firstLoad);
container.addEventListener('scroll', function () {
    if (container.scrollTop + container.clientHeight + 100 >= container.scrollHeight) {
        displayHtml(load.next());
    }
});
