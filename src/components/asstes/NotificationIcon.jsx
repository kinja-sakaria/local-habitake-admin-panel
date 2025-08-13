const NotificationIcon = ({ ...otherProps }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" { ...otherProps }>
            <g clip-path="url(#clip0_1_39096)">
                <path d="M12 0C9.795 0 7.95 0.78 6.48 2.34C3.48 5.52 3.03 11.13 2.985 13.725C0.825 14.4 0 16.5 0 18C0 18.825 0.675 19.5 1.5 19.5H22.5C23.325 19.5 24 18.825 24 18C24 16.5 23.175 14.4 21.015 13.725C20.97 11.13 20.52 5.52 17.52 2.34C16.05 0.78 14.205 0 12 0ZM12 24C13.65 24 15 22.65 15 21H9C9 22.65 10.35 24 12 24Z" fill="currentColor" />
            </g>
            <defs>
                <clipPath id="clip0_1_39096">
                    <rect width="24" height="24" fill="white" />
                </clipPath>
            </defs>
        </svg>
    )
}
export default NotificationIcon;