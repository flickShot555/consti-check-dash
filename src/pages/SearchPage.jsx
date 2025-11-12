import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  Filter,
  FileText,
  Calendar,
  User
} from 'lucide-react';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);

  // Mock search results - will connect to PostgreSQL later
  const [results, setResults] = useState([
    {
      id: 1,
      title: 'Annual Financial Report 2024',
      content: 'Comprehensive financial analysis and projections for fiscal year...',
      author: 'John Doe',
      date: '2024-01-15',
      category: 'Finance'
    },
    {
      id: 2,
      title: 'Q4 Performance Review',
      content: 'Detailed performance metrics and key achievements for the fourth quarter...',
      author: 'Jane Smith',
      date: '2024-01-10',
      category: 'Reports'
    },
    {
      id: 3,
      title: 'Strategic Planning Document',
      content: 'Long-term strategic goals and implementation roadmap...',
      author: 'Mike Johnson',
      date: '2024-01-05',
      category: 'Strategy'
    },
  ]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setSearching(true);
    
    // Simulate database search - replace with actual PostgreSQL query
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSearching(false);
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Document Search</h1>
        <p className="text-muted-foreground">Search through your PostgreSQL database</p>
      </div>

      {/* Search Bar */}
      <Card className="p-6 bg-card border-border animate-scale-in">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search documents, records, and more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background border-border h-12"
              />
            </div>
            <Button 
              type="submit" 
              className="bg-gradient-primary hover:opacity-90 px-8"
              disabled={searching}
            >
              {searching ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                  Searching...
                </div>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </>
              )}
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="border-border">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <div className="text-sm text-muted-foreground">
              Database: PostgreSQL on 192.168.1.100
            </div>
          </div>
        </form>
      </Card>

      {/* Search Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">
            {results.length} Results Found
          </h2>
        </div>

        {results.map((result, index) => (
          <Card
            key={result.id}
            className="p-6 bg-card border-border hover:border-primary/50 transition-all cursor-pointer animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0">
                <FileText className="h-6 w-6 text-white" />
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-2 hover:text-primary transition-colors">
                  {result.title}
                </h3>
                <p className="text-muted-foreground mb-3">
                  {result.content}
                </p>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {result.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {result.date}
                  </div>
                  <span className="px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium">
                    {result.category}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
