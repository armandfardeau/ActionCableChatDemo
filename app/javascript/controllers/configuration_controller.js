import {Controller} from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ["dark", "light", "icon"]

    connect() {
        this.iconTargets.forEach(iconTarget => {
            iconTarget.classList.remove("cursor-not-allowed")
        })
        this.setDefaultScheme();
    }

    setIcon() {
        if (this.currentScheme === "dark") {
            this.lightTarget.classList.remove('hidden');
        } else {
            this.lightTarget.classList.remove('hidden');
        }

    }

    toggleIcons() {
        this.darkTarget.classList.toggle('hidden');
        this.lightTarget.classList.toggle('hidden');
    }

    get currentScheme() {
        return localStorage.getItem('color-theme')
    }

    set currentScheme(scheme) {
        localStorage.setItem('color-theme', scheme)
    }

    setDefaultScheme() {
        if (this.currentScheme === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark')
        }
    }

    setToLight() {
        document.documentElement.classList.remove('dark');
    }

    setToDark() {
        document.documentElement.classList.add('dark');
    }

    setColorScheme(){
        if (this.currentScheme === 'light') {
            this.setToDark();
            this.currentScheme = 'dark';
        } else {
            this.setToLight();
            this.currentScheme = 'light';
        }
        this.toggleIcons();
    }

    toggle() {
        this.setColorScheme();
    }
};