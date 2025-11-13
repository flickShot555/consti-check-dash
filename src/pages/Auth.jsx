import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { Lock, Mail, CheckCircle2 } from 'lucide-react';
import './Auth.css'; // Adjust the path based on your project structure

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup, login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const validateInput = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return false;
    }
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return false;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return false;
    }
    return true;
  };

  const handleAuth = async () => {
    if (!validateInput()) return;

    setLoading(true);
    try {
      if (isLogin) {
        await login(email, password);
        toast.success('Welcome back!', {
          icon: <CheckCircle2 className="h-4 w-4" />,
        });
      } else {
        await signup(email, password);
        toast.success('Account created successfully!', {
          icon: <CheckCircle2 className="h-4 w-4" />,
        });
      }
      navigate('/');
    } catch (error) {
      console.error('Auth error:', error);
      let errorMessage = 'An error occurred. Please try again.';
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'This email is already registered. Please login instead.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address.';
          break;
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          errorMessage = 'Invalid email or password.';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password is too weak.';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many attempts. Please try again later.';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Please check your connection.';
          break;
        default:
          errorMessage = 'An unexpected error occurred. Please try again.';
      }
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAuth();
  };

  return (
    <div className="auth-container">
      <div className="background-overlay gradient-br"></div>
      <div className="background-overlay radial"></div>
      
      <Card className="auth-card">
        <div className="text-center card-header">
          <h1 className="title">ConstituCheck</h1>
          <p className="subtitle">
            {isLogin ? 'Welcome back to your admin portal' : 'Create your admin account'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label className="label">
              <Mail className="icon" />
              Email
            </label>
            <Input
              type="email"
              placeholder="admin@constitucheck.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label className="label">
              <Lock className="icon" />
              Password
            </label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <div className="loading">
                <div className="spinner"></div>
                Processing...
              </div>
            ) : (
              isLogin ? 'Sign In' : 'Create Account'
            )}
          </Button>
        </form>

        <div className="toggle-link">
          <button
            onClick={() => setIsLogin(!isLogin)}
            disabled={loading}
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </button>
        </div>
      </Card>
    </div>
  );
};

export default Auth;