export function ChangeTheme() {
    const onChangeTheme = () => {
        const documentElement = document.documentElement;
        const isDark = documentElement.classList.contains("dark");
        if (isDark) {
            documentElement.classList.add("light");
            documentElement.classList.remove("dark");
        } else {
            documentElement.classList.add("dark");
            documentElement.classList.remove("light");
        }
    }

    return (
        <div onClick={onChangeTheme} className={"position:absolute top:15 left:20 color:white@dark"}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-circle-half"
                 viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"/>
            </svg>
        </div>
    )
}