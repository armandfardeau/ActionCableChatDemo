import {Controller} from "@hotwired/stimulus"
import {createConsumer} from "@rails/actioncable"

export default class extends Controller {
    static targets = ["content", "room", "user"]

    connect() {
        this.subscribe(this.room);
        this.user = this.userTarget.textContent
    }

    get messageList() {
        return document.getElementById("message-list")
    }

    get template(){
        return document.getElementById("message-template")
    }

    clearMessages() {
        this.messageList.innerHTML = "";
    }

    addMessage(data) {
        let clone = this.template.content.cloneNode(true);
        let message = clone.querySelectorAll("p")[0];
        let author = clone.querySelectorAll("span")[0];
        let listElement = clone.querySelectorAll("li")[0];

        message.innerText = data.text;
        author.innerText = data.sent_by;
        listElement.classList.add(data.sent_by == this.user ? listElement.dataset.sentBySelf : listElement.dataset.sentByOther);

        this.messageList.appendChild(clone);
    }

    beforeSubscriptionChange() {
        if (!this.chat) return;

        this.chat.unsubscribe();
        this.clearMessages();
    }

    afterSubscriptionChange() {
        window.history.replaceState(null, null, `?room_id=${this.room}`);
        this.roomTarget.textContent = `Room ${this.room}`;
        this.chat.received = this.addMessage.bind(this);
    }

    subscribe(room = "0") {
        this.beforeSubscriptionChange();

        this.room = room;
        this.chat = createConsumer().subscriptions.create({channel: "ChatChannel", room});

        this.afterSubscriptionChange();
    }

    drowdownChange(element) {
        this.subscribe(element.target.value);
    }

    send() {
        if (!this.contentTarget.value.trim()) return;

        this.chat.perform('send_message', {text: this.contentTarget.value})
        this.contentTarget.value = '';
    }
}
