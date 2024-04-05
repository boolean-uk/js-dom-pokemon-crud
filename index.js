//HTML ELEMENTS
const form = document.querySelector("#poke-form");
const nameInput = form.querySelector("#name-input");
const imageInput = form.querySelector("#image-input");
const submitBtn = form.querySelector("input[type=submit]");
const list = document.querySelector("ul.cards");
//
//FETCHING
async function baseFetch(method, endpoint = "", data) {
	return (
		await fetch(
			`https://boolean-api-server.fly.dev/rafa-lopes-pt/pokemon${endpoint}`,
			{
				headers: {
					"accept": " application/json",
					"Content-Type": "application/json",
				},
				method,
				body: JSON.stringify(data),
			}
		)
	).json();
}
//===ENDPOINTS
//POST
async function add(data) {
	return baseFetch("POST", "", data);
}
//GET
async function getAll() {
	return baseFetch("GET");
}
async function get(data) {
	return baseFetch("GET", "/" + data);
}
//DEL
async function delAll() {
	return baseFetch("DELETE");
}
async function del(data) {
	return baseFetch("DELETE", "/" + data);
}
//PUT
async function update(data, id) {
	return baseFetch("PUT", "/" + id, data);
}
//===
//COMPONENTS
//TODO ITEM
const TodoElement = (data = { name: "", id: 0, image: "", liked: false }) => {
	const li = document.createElement("li");
	li.innerHTML = `
    <li class="card">
    <h2 class="card--title">${data.name}</h2>
    <img
        width="256"
        class="card--img"
        src="${data.image}"
    />
</li>
    `;

	return li;
};

//FORM REQUESTS (EVENT HANDLERS)

async function addTodoHandler(data = { title: "" }) {
	await add(data);
	render();
}
async function updateTodoHandler(
	data = { title: "", id: 0, completed: false }
) {
	await update(data);
	render();
}

form.addEventListener("submit", (e) => {
	e.preventDefault();
	//Add logic to find out if is updating or creating
	//call appropriate handler

	addTodoHandler({
		name: nameInput.value,
		image: imageInput.value,
		liked: true,
	});
	nameInput.value = "";
	imageInput.value = "";
});

//RENDERERS
async function renderTodoList() {
	const data = await getAll();
	list.replaceChildren(...data.map((el) => TodoElement(el)));
}

async function render() {
	renderTodoList();
}

render();
