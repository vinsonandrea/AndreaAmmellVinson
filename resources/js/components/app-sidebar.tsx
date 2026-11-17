import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { ClipboardList, LayoutGrid, Network, Ticket, Users, UsersRound } from 'lucide-react';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Fiber Cabinets',
        url: '/fiber-cabinets',
        icon: Network,
    },
    {
        title: 'Repair Tickets',
        url: '/repair-tickets',
        icon: Ticket,
    },
    {
        title: 'Repair Logs',
        url: '/repair-logs',
        icon: ClipboardList,
    },
    {
        title: 'Subscribers',
        url: '/subscribers',
        icon: Users,
    },
    {
        title: 'Technician Teams',
        url: '/technician-teams',
        icon: UsersRound,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
