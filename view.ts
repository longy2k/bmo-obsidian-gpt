import { ItemView, WorkspaceLeaf } from "obsidian";

export const VIEW_TYPE_EXAMPLE = "example-view";

export class BMOView extends ItemView {
    private messageEl: HTMLElement;

    constructor(leaf: WorkspaceLeaf) {
        super(leaf);
    }

    getViewType() {
        return VIEW_TYPE_EXAMPLE;
    }

    getDisplayText() {
        return "BMO";
    }

    async onOpen() {
        const container = this.containerEl.children[1];
        container.empty();
        const bmoContainer = container.createEl("div", {
            attr: {
            id: "bmoContainer",
            }
        });

    bmoContainer.createEl("h1", { 
        text: "BMO",
        attr: {
          id: "bmoHeading"
        }
    });

    bmoContainer.createEl("p", {
        text: "Model: GPT-3.5-Turbo",
        attr: {
            id: "modelName"
          }
    });

    bmoContainer.createEl("p", {
        text: "",
        attr: {
            id: "userMessage"
          }
    });

    bmoContainer.createEl("p", {
        text: "",
        attr: {
            id: "bmoMessage"
          }
    });

    const chatbox = bmoContainer.createEl("textarea", {
        attr: {
          id: "chatbox",
          placeholder: "Start typing...",
        }
    });

    const chatboxElement = chatbox as HTMLTextAreaElement;

    chatboxElement.addEventListener("input", (event) => {
        chatboxElement.style.height = "36px";
        chatboxElement.style.height = `${chatboxElement.scrollHeight}px`;
      });

    chatboxElement.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          const input = chatboxElement.value;
          window.postMessage({ type: "input", value: input });
          const userMessage = document.querySelector("#userMessage");
          const bmoMessage = document.querySelector("#bmoMessage");
          if (userMessage) {
            userMessage.textContent = input;
            userMessage.style.display = "inline-block";
          }
          chatboxElement.value = "";
        }
      });
  }

  async onClose() {
    // Nothing to clean up.
  }

  getInputValue(): string {
    const chatboxElement = this.containerEl.querySelector("#chatbox") as HTMLTextAreaElement;
    return chatboxElement.value;
  }

//   setMessageText(text: string) {
//     this.messageEl.setText(text);
//     console.log("Message:" + text);
//   }
}
