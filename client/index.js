const ws = new WebSocket('ws://localhost:8080');

const form = document.querySelector('#formWs')
const chatContainer = document.querySelector('#chatContainer')


form.addEventListener('submit', onFormSubmit)

function onFormSubmit(e) {
    e.preventDefault()
    const messageData = getMessage()
    if (!isDataValid(messageData)) {
        showError('Поле не должно быть пустым')
        return
    }

    ws.send(JSON.stringify(messageData))
    form.reset()

}

ws.onmessage = (event) => {
    try {
        const data = JSON.parse(event.data)
        const html = getTemplateHtml(data)
        chatContainer.insertAdjacentHTML('beforeend', html)
    } catch (e) {
        console.info('Can not parse data')
    }


}


ws.onopen = () => {
    console.log('Соеденение установлено')
}

ws.onclose = () => {
    console.log('Соеденение прервано')
}

ws.onerror = (error) => {
    console.log('Connection was interrupted: ', error.message)
}

function getTemplateHtml(data) {
    const {name, message} = data
    return `
        <tr>
            <td >${name}</td>
            td>${message}</td>
        </tr>
        `
}

function getMessage() {
    return {
        name: form.name.value,
        message: form.message.value,
    }
}


function isDataValid(data) {
    return data.name !== '' && data.message !== ''
}

function showError(error) {
    alert(error)
}