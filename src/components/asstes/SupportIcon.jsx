const SupportIcon = ({ ...otherProps }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" { ...otherProps }>
            <path d="M2 14.565C2 12.512 4 12 6 12V21C4.93913 21 3.92172 20.5786 3.17157 19.8284C2.42143 19.0783 2 18.0609 2 17V14.565Z" fill="currentColor" />
            <path d="M22 14.565C22 12.512 20 12 18 12V21C19.0609 21 20.0783 20.5786 20.8284 19.8284C21.5786 19.0783 22 18.0609 22 17V14.565Z" fill="currentColor" />
            <path d="M6 20V10C6 8.4087 6.63214 6.88258 7.75736 5.75736C8.88258 4.63214 10.4087 4 12 4C13.5913 4 15.1174 4.63214 16.2426 5.75736C17.3679 6.88258 18 8.4087 18 10V20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    )
}
export default SupportIcon;