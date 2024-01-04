// import theme style scss file
import 'styles/theme.scss';
import { Providers } from "./redux/provider";
export const metadata = {
    title: 'Sayma UI - Next.Js Admin Dashboard Template',
    description: 'Sayma UI - Next JS admin dashboard template is free and available on GitHub. Create your stunning web apps with our Free Next js template. An open-source admin dashboard built using the new router, server components, and everything new in Next.js 13.',
    keywords: 'Sayma UI, Next.js 13, Admin dashboard, admin template, web apps, bootstrap 5, admin theme'
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className='bg-light'>
                <Providers>
                {children}
                </Providers>
            
            </body>
        </html>
    )
}
