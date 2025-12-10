import styles from "..//MenuHeader/MenuHeader.module.css"

interface Props{
    children:React.ReactNode
}

const MenuDivider = ({children} : Props) => {
    return <div className={styles.header}>{children}</div>
}

export default MenuDivider