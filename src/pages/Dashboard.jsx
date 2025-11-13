import { Card } from '@/components/ui/card';
import { 
  Users, 
  FileText, 
  TrendingUp, 
  Activity,
  ArrowUpRight,
  Database
} from 'lucide-react';

const Dashboard = () => {
  // Mock statistics - will connect to PostgreSQL later
  const stats = [
    {
      title: 'Total Users',
      value: '3',
      change: '+100%',
      icon: Users,
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Documents',
      value: '1,287',
      change: '+8.2%',
      icon: FileText,
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Active Sessions',
      value: '1',
      change: '+100%',
      icon: Activity,
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Database Size',
      value: '400 MB',
      change: '+0%',
      icon: Database,
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  const recentActivity = [
    { user: 'admin@constitucheck.com', action: 'Uploaded document', time: '2 minutes ago' },
    { user: 'abbas1795khan@gmail.com', action: 'Searched database', time: '15 minutes ago' },
    { user: 'staff@constitucheck.com', action: 'Modified record', time: '1 hour ago' },
    { user: 'admin@constitucheck.com', action: 'Generated report', time: '2 hours ago' },
  ];

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your ConstituCheck admin portal</p>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card
            key={stat.title}
            className="p-6 bg-gradient-card border-border hover:border-primary/50 transition-all hover:scale-105 cursor-pointer animate-scale-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-foreground mb-2">{stat.value}</p>
                <div className="flex items-center text-sm text-green-500">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  <span>{stat.change}</span>
                </div>
              </div>
              <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.gradient}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card className="p-6 bg-card border-border animate-fade-in" style={{ animationDelay: '400ms' }}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Recent Activity
          </h2>
        </div>
        
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg hover:bg-secondary transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {activity.user.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-foreground">{activity.user}</p>
                  <p className="text-sm text-muted-foreground">{activity.action}</p>
                </div>
              </div>
              <span className="text-sm text-muted-foreground">{activity.time}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20 animate-fade-in" style={{ animationDelay: '500ms' }}>
          <h3 className="text-lg font-semibold text-foreground mb-4">Database Connection</h3>
          <div className="flex items-center gap-2 mb-2">
            <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
            <span className="text-foreground">PostgreSQL Connected</span>
          </div>
          <p className="text-sm text-muted-foreground">
            VM: 192.168.1.100 • Port: 5432
          </p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-accent/10 to-primary/10 border-accent/20 animate-fade-in" style={{ animationDelay: '600ms' }}>
          <h3 className="text-lg font-semibold text-foreground mb-4">Storage Status</h3>
          <div className="flex items-center gap-2 mb-2">
            <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
            <span className="text-foreground">VM Storage Ready</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Used: 45.2 GB / 100 GB available
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
