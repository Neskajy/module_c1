import Header from "./components/header"
import Footer from "./components/footer"
import { Outlet } from "react-router-dom"

export default function Layout_page() {
    return (
        <>
            <Header />
            <main>
                <div className="container">
                    <Outlet />
                </div>
            </main>
            <Footer />
        </>
    )
}