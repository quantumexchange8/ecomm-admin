import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { ChartColumnStacked, LayoutGrid, ShoppingBag, ShoppingCart, ShoppingBasket } from 'lucide-react';
import AppLogo from './app-logo';
import { MdProductionQuantityLimits } from "react-icons/md";
const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutGrid,
    },
    {
      title: 'Product',
      url: 'product',
      icon: ShoppingBag,
  },
  {
    title: 'Product Listing',
    url: 'product-listing',
    icon: ShoppingCart,
},
  {
    title: 'Category',
    url: '/category',
    icon: ChartColumnStacked,
},
{
  title: 'Order',
  url: '/order',
  icon: ShoppingBasket ,
},
];

// const footerNavItems: NavItem[] = [
//     {
//         title: 'Repository',
//         url: 'https://github.com/laravel/react-starter-kit',
//         icon: Folder,
//     },
//     {
//         title: 'Documentation',
//         url: 'https://laravel.com/docs/starter-kits',
//         icon: BookOpen,
//     },
// ];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            {/* <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader> */}
            <div className="flex justify-start p-5 items-center "><img src="image/current.png" alt="logo" /></div>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            {/* <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter> */}
        </Sidebar>
    );
}
