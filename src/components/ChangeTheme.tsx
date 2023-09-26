import {useState} from "react";

export function ChangeTheme() {
    const [theme, setTheme] = useState<"light" | "dark">('light')

    const onChangeTheme = () => {
        const documentElement = document.documentElement;
        const isDark = documentElement.classList.contains("dark");
        if (isDark) {
            documentElement.classList.add("light");
            documentElement.classList.remove("dark");
            setTheme("light")
        } else {
            documentElement.classList.add("dark");
            documentElement.classList.remove("light");
            setTheme("dark")
        }
    }

    const getText = () => theme === "light" ? "Light Mode" : "Dark Mode"

    return (
        <div onClick={onChangeTheme}
             className={"position:absolute top:15 left:20 color:white@dark flex flex:row items-align:center gap:0.5rem"}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-circle-half"
                 viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"/>
            </svg>
            <span className="font:semibold opacity:0.7">{getText()}</span>
        </div>
    )
}