export default function Footer() {
    return (
        <footer>
            <div className="container">
                <div className="footer-content">
                    <a href="#" className="footer-logo">
                        <i className="fas fa-pen-nib"></i>
                        <span>БлогПлатформа</span>
                    </a>
                    <ul className="footer-links">
                        <li><a href="#">О нас</a></li>
                        <li><a href="#">Правила</a></li>
                        <li><a href="#">Контакты</a></li>
                        <li><a href="#">Помощь</a></li>
                    </ul>
                    <p className="copyright">© 2023 БлогПлатформа. Все права защищены.</p>
                </div>
            </div>
        </footer>
    )
}