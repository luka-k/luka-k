class Forms {
      static getDiv(params) {
        const div = document.createElement("div");

        div.innerText = params.text ?? "";

        for (let i in params.classList) {
            const className = params.classList[i];

            div.classList.add(className);
        }

        return div;
    }   
    
    static getInput(params) {
        const input = document.createElement("input");

        input.classList.add("form-input");

        for (let i in params.classList) {
            const className = params.classList[i];

            input.classList.add(className);
        }

        return input;
    }

    static getBtn(params) {
        const btn = document.createElement("div");

        btn.classList.add("btn");

        for (let i in params.classList) {
            const className = params.classList[i];

            btn.classList.add(className);
        }

        btn.innerText = params.text ?? "Button";

        return btn;
    }

    static getImage(params) {
        const img = document.createElement("img");

        img.src = params.src ?? "";

        return img;
    }
}