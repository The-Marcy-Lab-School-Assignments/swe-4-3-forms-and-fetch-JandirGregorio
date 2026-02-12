# Short Response Questions

## Question 1: Promise Chaining

The following code logs `undefined` in the second `.then()`. Identify the bug and fix it.

```js
fetch('https://pokeapi.co/api/v2/pokemon/pikachu')
  .then((response) => {
    if (!response.ok) throw Error(`Fetch failed.`);
    const readingPromise = response.json();
  })
  .then((data) => {
    console.log(data); // undefined!
  })
  .catch((error) => console.error(error.message));
```

**Your Answer:** 

The problem is that the first `.then()` is not returning the `readingPromise` Promise. Without it, the second `.then()` receives `undefined`. To get the expected result, the first `.then()` must return `readingPromise` for the second `.then()` to reference.

```js
fetch('https://pokeapi.co/api/v2/pokemon/pikachu')
  .then((response) => {
    if (!response.ok) throw Error(`Fetch failed.`);
    const readingPromise = response.json();
    return readingPromise;
  })
  .then((data) => {
    console.log(data); // undefined!
  })
  .catch((error) => console.error(error.message));
```

By making this change, we ensure that the second `.then()` receives a Promise to resolve or reject.

## Question 2: Development Servers and CORS

A student opens their `index.html` file directly in the browser (using the `file://` protocol). Their `<script type="module">` tag and `fetch()` call both fail. Explain why, and what they should do instead.

**Your Answer:** 

The `file://` protocol does not allow resources to load from a different origin due to the browser's **CORS** (Cross-Origin Resource Sharing) restrictions. This behavior prevents the browser from:

- Reading ES modules such as `import` and `export` because they are not from the same origin as the served file.
- Retrieving third-party API data. `.fetch()` is blocked as well because it performs CRUD operations from another origin.

To solve this, use a **development server** like **Vite** that allows programmers to use the `http://` protocol, which allows these features to work properly.

## Question 3: The `fetch` Response Object

When we use `fetch()`, why do we check `response.ok` before reading the response body? What kinds of errors does this catch that `.catch()` alone would miss if we skipped this step as shown in the code below:

```js
const response = await fetch(url);
const data = await response.json();
```

**Your Answer:** 

`fetch()` only rejects for network errors (e.g. no internet connection). **HTTP** errors like _404_ or _500_ are considered **successful** (resolved). By checking `response.ok`, we're ensuring that the **HTTP** status is **successful** (2xx). Without this check, we'd try to parse error responses, resulting in unexpected behavior or errors when calling `response.json()`.

## Question 4: Async/Await Conversion

Rewrite the following `.then()`-based code using `async`/`await` with `try`/`catch`:

```js
const getJoke = () => {
  return fetch('https://v2.jokeapi.dev/joke/Programming?type=twopart')
    .then((response) => {
      if (!response.ok) throw Error(`Fetch failed. ${response.status}`);
      return response.json();
    })
    .then((data) => {
      return { data, error: null };
    })
    .catch((error) => {
      return { data: null, error };
    });
};
```

**Your Answer:**

```js
const getJoke = async() => {
  try {
    const response = await fetch('https://v2.jokeapi.dev/joke/Programming?type=twopart');
    if (!response.ok) throw Error(`Fetch failed. ${response.status}`);
    const data = await response.json();
    return { data, error: null };
  }
  catch (error) {
    return {data: null, error};
  }
};
```

## Question 5: `event.preventDefault()` and Form Handling

A student writes a form handler but the data never displays. Their code:

```js
form.addEventListener('submit', (event) => {
  const name = form.elements.name.value;
  document.querySelector('#output').textContent = name;
});
```

What is wrong? What happens when they click submit, and how do they fix it?

**Your Answer:** 

The issue is that HTML forms have a default behavior: when submitted, they refresh the page or redirect to a given URL. This happens instantly when the user clicks the button and before the DOM update occurs. This prevents `#output` from displaying the name to the user.

To fix this, add `event.preventDefault()` at the start of the event handler to prevent the page refresh, allowing the DOM to update `#output` properly.

## Question 6: Putting It All Together

The steps below describe how to build a form that fetches Pokemon data from `https://pokeapi.co/api/v2/pokemon/{name}` based on the name entered in the form and displays the pokemon's data on the page. The steps are listed in a **random order**. Rearrange them into the correct sequence.

- A. Parse the response body with `await response.json()`
- B. Call `event.preventDefault()` to stop the page from reloading
- C. Check `response.ok` and throw an error if the response failed
- D. Update the DOM with the Pokemon's data
- E. Add a `'submit'` event listener to the form
- F. Handle errors in the `catch` block (display an error message)
- G. Extract the Pokemon name from the form input
- H. Send a GET request with `fetch()` using the Pokemon name in the URL
- I. Reset the form with `form.reset()`
- J. Create the HTML form with a name input and output elements for displaying results

**Your Answer:**
- J. Create the HTML form with a name input and output elements for displaying results
- E. Add a `'submit'` event listener to the form
- B. Call `event.preventDefault()` to stop the page from reloading
- G. Extract the Pokemon name from the form input
- H. Send a GET request with `fetch()` using the Pokemon name in the URL
- C. Check `response.ok` and throw an error if the response failed
- A. Parse the response body with `await response.json()`
- D. Update the DOM with the Pokemon's data
- F. Handle errors in the `catch` block (display an error message)
- I. Reset the form with `form.reset()`
