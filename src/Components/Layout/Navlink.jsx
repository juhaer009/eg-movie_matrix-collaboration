import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const Navlink = ({ href, children }) => {
    const pathname = usePathname();
    return (
        <Link className={`${pathname.startsWith(href) && 'text-primary'} font-medium`} href={href}>
            {children}
        </Link>
    );
};

export default Navlink;