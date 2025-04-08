import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { useForm } from '@inertiajs/react';
import { ChartColumnStacked, LayoutGrid, ShoppingBag, ShoppingCart, ShoppingBasket, UserRound } from 'lucide-react';
import AppLogo from './app-logo';

interface AppSidebarProps {
    product?: { id: number }; // Optional product prop
}

const AppSidebar = ({ product }: AppSidebarProps) => {
    const { post } = useForm();

    const handleLogout = () => {
        post('/logout'); // Sends a POST request to the logout route
    };

    const mainNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            url: '/dashboard',
            icon: LayoutGrid,
        },
        {
            title: 'Member Listing',
            url: '/member',
            icon: UserRound,
        },
        {
            title: 'Product',
            url: 'create-product',
            icon: ShoppingBag,
        },
        {
            title: 'Product Listing',
            url: 'product-listing',
            icon: ShoppingCart,
        },
        product && {
            title: 'Product Edit',
            url: `/product/edit/${product.id}`,  // Dynamically assign the product ID
            icon: UserRound,
        },
        {
            title: 'Category',
            url: '/category',
            icon: ChartColumnStacked,
        },
        {
            title: 'Order',
            url: '/order',
            icon: ShoppingBasket,
        },
    ].filter(Boolean) as NavItem[];  // Filter out undefined values in the array

    return (
        <Sidebar collapsible="icon" variant="inset">
            <div className="flex justify-start p-5 items-center "><img src="image/current.png" alt="logo" /></div>
            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
};

export default AppSidebar;
