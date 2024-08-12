import styles from "./Footer.module.css"


function Footer() {
    return (
       <footer className={styles.footer}>
        <ul>
            <li><a href="https://github.com/jonborges" target="_blank" rel="noopener noreferrer"><img src="/images/github.png" alt="logotipo do github, link clicável"/></a></li>
            <p>Desenvolvido por Jon.B 06/08/2024</p>
            <li><a href="https://www.linkedin.com/in/jonathan-borges-andrade/" target="_blank" rel="noopener noreferrer"><img src="/images/linkedin.png" alt="logotipo do linkedin, link clicável"/></a></li>
        </ul>
       </footer>
    )
}

export default Footer;