const str = window.location.href;
const url = new URL(str);
const id = url.searchParams.get("id");
console.log("Id =", id);