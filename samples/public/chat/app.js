const OPENAI_KEY = "load key from .env";
const price = 0.0002 / 1000;

const messages = [
    { "role": "system", "content": "You are a comptuer ansering questions in a funny way." },
];
let totalTokens = 0;

async function sendChat() {
    const prompt = document.querySelector("#prompt").value;
    document.querySelector("#prompt").value = "";
    document.querySelector("ul").innerHTML += `<li><b>${prompt}</b></li>`;

    messages.push(
        { "role": "user", "content": prompt }
    );

    const data = {
        "model": "gpt-3.5-turbo",
        "messages": messages
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_KEY}`
        },
        body: JSON.stringify(data)
    })

    const json = await response.json();
    const message = json.choices[0].message.content;
    console.log('message', message);

    messages.push(json.choices[0].message)

    document.querySelector("ul").innerHTML += `<li>${message}</li>`;
    document.querySelector("#prompt").value = "";
    document.querySelector("input").focus();
}