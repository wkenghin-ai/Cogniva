import React from 'react';
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  Award,
  BarChart2,
  BatteryCharging,
  Bell,
  BookOpen,
  Bot,
  Calendar,
  CheckCircle2,
  Clock,
  Coffee,
  Compass,
  Cpu,
  DollarSign,
  FileText,
  Frown,
  Gamepad2,
  Gauge,
  Grid,
  Heart,
  HeartHandshake,
  Home,
  Image,
  Layers,
  Lightbulb,
  ListOrdered,
  Lock,
  MessageCircle,
  Mic,
  Play,
  Search,
  ShieldCheck,
  ShoppingBag,
  Slash,
  Sliders,
  Smartphone,
  Smile,
  Sparkles,
  Sun,
  TrendingUp,
  Upload,
  UserX,
  Users,
  Volume2
} from 'lucide-react';

interface HotspotIconProps {
  name: string;
  className?: string;
  style?: React.CSSProperties;
}

export const HotspotIcon: React.FC<HotspotIconProps> = ({
  name,
  className = 'w-6 h-6',
  style
}) => {
  switch (name) {
    case 'trending-up':
      return <TrendingUp className={className} style={style} />;
    case 'battery-charging':
      return <BatteryCharging className={className} style={style} />;
    case 'smartphone':
      return <Smartphone className={className} style={style} />;
    case 'heart-handshake':
      return <HeartHandshake className={className} style={style} />;
    case 'frown':
      return <Frown className={className} style={style} />;
    case 'alert-circle':
      return <AlertCircle className={className} style={style} />;
    case 'user-x':
      return <UserX className={className} style={style} />;
    case 'slash':
      return <Slash className={className} style={style} />;
    case 'gamepad-2':
      return <Gamepad2 className={className} style={style} />;
    case 'bot':
      return <Bot className={className} style={style} />;
    case 'sliders':
      return <Sliders className={className} style={style} />;
    case 'users':
      return <Users className={className} style={style} />;
    case 'shield-check':
      return <ShieldCheck className={className} style={style} />;
    case 'message-circle':
      return <MessageCircle className={className} style={style} />;
    case 'mic':
      return <Mic className={className} style={style} />;
    case 'gauge':
      return <Gauge className={className} style={style} />;
    case 'sparkles':
      return <Sparkles className={className} style={style} />;
    case 'bar-chart-2':
      return <BarChart2 className={className} style={style} />;
    case 'search':
      return <Search className={className} style={style} />;
    case 'image':
      return <Image className={className} style={style} />;
    case 'grid':
      return <Grid className={className} style={style} />;
    case 'volume-2':
      return <Volume2 className={className} style={style} />;
    case 'book-open':
      return <BookOpen className={className} style={style} />;
    case 'shopping-bag':
      return <ShoppingBag className={className} style={style} />;
    case 'list-ordered':
      return <ListOrdered className={className} style={style} />;
    case 'coffee':
      return <Coffee className={className} style={style} />;
    case 'sun':
      return <Sun className={className} style={style} />;
    case 'home':
      return <Home className={className} style={style} />;
    case 'play':
      return <Play className={className} style={style} />;
    case 'smile':
      return <Smile className={className} style={style} />;
    case 'award':
      return <Award className={className} style={style} />;
    case 'bell':
      return <Bell className={className} style={style} />;
    case 'upload':
      return <Upload className={className} style={style} />;
    case 'calendar':
      return <Calendar className={className} style={style} />;
    case 'activity':
      return <Activity className={className} style={style} />;
    case 'cpu':
      return <Cpu className={className} style={style} />;
    case 'lock':
      return <Lock className={className} style={style} />;
    case 'dollar-sign':
      return <DollarSign className={className} style={style} />;
    case 'file-text':
      return <FileText className={className} style={style} />;
    case 'heart':
      return <Heart className={className} style={style} />;
    case 'check-circle':
      return <CheckCircle2 className={className} style={style} />;
    case 'clock':
      return <Clock className={className} style={style} />;
    case 'layers':
      return <Layers className={className} style={style} />;
    case 'lightbulb':
      return <Lightbulb className={className} style={style} />;
    case 'alert-triangle':
      return <AlertTriangle className={className} style={style} />;
    case 'compass':
      return <Compass className={className} style={style} />;
    default:
      return <Sparkles className={className} style={style} />;
  }
};
