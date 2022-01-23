import {Controller} from "@hotwired/stimulus"
import {createConsumer} from "@rails/actioncable"

export default class extends Controller {
    static targets = ["content", "room", "user", "send"]

    connect() {
        this.subscribe(this.room);
        this.user = this.userTarget.textContent
        this.scrollToBottom("auto");
    }

    get messageList() {
        return document.getElementById("message-list")
    }

    get template() {
        return document.getElementById("message-template")
    }

    get messageEmpty() {
        return !this.contentTarget.value.trim();
    }

    toggleButton() {
        this.sendTarget.disabled = this.messageEmpty;
    }

    scrollToBottom(behavior = "smooth") {
        this.messageList.scrollIntoView({behavior, block: "end"});
    }

    addToClassFromDataSet(element, dataset_name) {
        element.dataset[dataset_name].split(" ").forEach((item) => {
                element.classList.add(item)
            }
        )
    }

    clearMessages() {
        this.messageList.innerHTML = "";
    }

    addMessage(data) {
        let clone = this.template.content.cloneNode(true);
        let message = clone.querySelectorAll("p")[0];
        let author = clone.querySelectorAll("span")[0];
        let listElement = clone.querySelectorAll("li")[0];
        let containerElement = clone.querySelectorAll("div")[0];

        message.innerText = data.text;
        author.innerText = data.sent_by;

        if (data.sent_by === this.user) {
            this.addToClassFromDataSet(listElement, "sentBySelf")
            this.addToClassFromDataSet(containerElement, "sentBySelf")
        } else {
            this.addToClassFromDataSet(listElement, "sentByOther")
            this.addToClassFromDataSet(containerElement, "sentByOther")
        }

        this.messageList.appendChild(clone);
        this.scrollToBottom();
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

    write() {
        this.toggleButton();
    }

    send() {
        if(this.messageEmpty) return;

        this.chat.perform('send_message', {text: this.contentTarget.value})
        this.contentTarget.value = '';
        this.toggleButton();
    }
}
