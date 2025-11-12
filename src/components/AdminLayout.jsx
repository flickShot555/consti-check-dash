import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  LayoutDashboard,
  FileText,
  Search,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: FileText, label: 'Documents', path: '/documents' },
    { icon: Search, label: 'Search', path: '/search' },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/auth');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar - Desktop */}
      <aside
        className={cn(
          'hidden md:flex flex-col bg-card border-r border-border transition-all duration-300',
          collapsed ? 'w-20' : 'w-64'
        )}
      >
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          {!collapsed && (
            <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              ConstituCheck
            </h1>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="hover:bg-secondary"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Button
              key={item.path}
              variant={isActive(item.path) ? 'default' : 'ghost'}
              className={cn(
                'w-full justify-start transition-all',
                isActive(item.path) && 'bg-primary text-primary-foreground shadow-glow',
                collapsed && 'justify-center'
              )}
              onClick={() => navigate(item.path)}
            >
              <item.icon className={cn('h-5 w-5', !collapsed && 'mr-3')} />
              {!collapsed && <span>{item.label}</span>}
            </Button>
          ))}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-border">
          <Button
            variant="ghost"
            className={cn(
              'w-full justify-start hover:bg-destructive hover:text-destructive-foreground transition-all',
              collapsed && 'justify-center'
            )}
            onClick={handleLogout}
          >
            <LogOut className={cn('h-5 w-5', !collapsed && 'mr-3')} />
            {!collapsed && <span>Logout</span>}
          </Button>
          {!collapsed && (
            <p className="text-xs text-muted-foreground mt-2 truncate">
              {user?.email}
            </p>
          )}
        </div>
      </aside>

      {/* Sidebar - Mobile */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-card border-r border-border animate-slide-in">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                ConstituCheck
              </h1>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <nav className="p-4 space-y-2">
              {menuItems.map((item) => (
                <Button
                  key={item.path}
                  variant={isActive(item.path) ? 'default' : 'ghost'}
                  className={cn(
                    'w-full justify-start transition-all',
                    isActive(item.path) && 'bg-primary text-primary-foreground'
                  )}
                  onClick={() => {
                    navigate(item.path);
                    setMobileOpen(false);
                  }}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  <span>{item.label}</span>
                </Button>
              ))}
            </nav>

            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
              <Button
                variant="ghost"
                className="w-full justify-start hover:bg-destructive hover:text-destructive-foreground"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5 mr-3" />
                <span>Logout</span>
              </Button>
              <p className="text-xs text-muted-foreground mt-2 truncate">
                {user?.email}
              </p>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <header className="md:hidden p-4 border-b border-border bg-card flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
            ConstituCheck
          </h1>
          <div className="w-10" />
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
