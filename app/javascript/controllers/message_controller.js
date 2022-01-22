import {Controller} from "@hotwired/stimulus"
import {createConsumer} from "@rails/actioncable"

export default class extends Controller {
    static targets = ["content", "room"]

    connect() {
        this.subscribe(this.room);
    }

    get messageList() {
        return document.getElementById("message-list")
    }


    clearMessages() {
        this.messageList.innerHTML = "";
    }

    addMessage(data) {
        let messageWrapper = document.createElement('li')
        let messageItem = document.createElement('p')
        messageWrapper.append(messageItem);
        messageItem.append(`sent by: ${data.sent_by} ${data.text}`);

        this.messageList.append(messageItem);
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
        if(!this.contentTarget.value.trim()) return;

        this.chat.perform('send_message', {text: this.contentTarget.value})
        this.contentTarget.value = '';
    }
}
