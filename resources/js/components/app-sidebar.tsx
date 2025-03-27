import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { useForm } from '@inertiajs/react';
import { ChartColumnStacked, LayoutGrid, ShoppingBag, ShoppingCart, ShoppingBasket, UserRound  } from 'lucide-react';
import AppLogo from './app-logo';
const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Member Listing',
        url: '/member',
        icon: UserRound ,
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
title: ' Product Edit',
    url: '/edit',
    icon: UserRound ,
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



export function AppSidebar() {
    const { post } = useForm();

    const handleLogout = () => {
        post('/logout'); // Sends a POST request to the logout route
    };
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

            {/* <SidebarFooter className="border-t border-gray-200 p-4">
                <button 
                    onClick={handleLogout} 
                    className="flex items-center gap-2 w-full text-red-600 hover:text-red-800 transition"
                >
                    <LogOut className="w-5 h-5" />
                    Logout
                </button>
                <NavUser />
            </SidebarFooter> */}

            <SidebarFooter>
               
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
